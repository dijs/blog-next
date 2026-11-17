import test, { before, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

let env;
const claims = (provider = 'google.com') => ({ name: 'Reader', picture: '', firebase: { sign_in_provider: provider } });
const entry = (authorId = 'reader') => ({ authorId, authorName: 'Reader', photoURL: '', gravatarHash: '', body: 'A comment', createdAt: serverTimestamp() });
before(async () => {
  env = await initializeTestEnvironment({ projectId: 'demo-blog-comments', firestore: { rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8') } });
});
after(async () => { if (env) await env.cleanup(); });

test('public readers can read comments for one post, including imports', async () => {
  await env.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'posts/a/comments/legacy'), { ...entry(null), createdAt: Timestamp.now() });
    await setDoc(doc(context.firestore(), 'posts/b/comments/legacy'), { ...entry(null), createdAt: Timestamp.now() });
  });
  const snapshot = await assertSucceeds(getDocs(collection(env.unauthenticatedContext().firestore(), 'posts/a/comments')));
  if (snapshot.size !== 1) throw new Error('Post comments were mixed.');
});

test('only Google accounts can post; GitHub, anonymous and other providers cannot', async () => {
  await assertSucceeds(setDoc(doc(env.authenticatedContext('reader', claims()).firestore(), 'posts/a/comments/google'), entry()));
  for (const provider of ['github.com', 'anonymous', 'password']) {
    await assertFails(setDoc(doc(env.authenticatedContext('reader', claims(provider)).firestore(), `posts/a/comments/${provider}`), entry()));
  }
  await assertFails(setDoc(doc(env.unauthenticatedContext().firestore(), 'posts/a/comments/anonymous'), entry()));
  await assertFails(setDoc(doc(env.authenticatedContext('reader', claims('anonymous')).firestore(), 'posts/a/comments/wrong-provider'), entry()));
});

test('rejects forged identities, extra fields, empty text, oversized comments, and fake timestamps', async () => {
  const db = env.authenticatedContext('reader', claims()).firestore();
  const invalid = [{ authorId: 'someone-else' }, { authorName: 'Someone else' }, { photoURL: 'https://example.com/track' }, { email: 'private@example.com' }, { body: '' }, { body: ' \n\t' }, { body: 'x'.repeat(5001) }, { createdAt: Timestamp.fromMillis(0) }, { gravatarHash: 'bad' }];
  for (const [index, change] of invalid.entries()) await assertFails(setDoc(doc(db, `posts/a/comments/invalid-${index}`), { ...entry(), ...change }));
});

test('comments cannot be edited or deleted by browser clients', async () => {
  const db = env.authenticatedContext('reader', claims()).firestore();
  const ref = doc(db, 'posts/a/comments/immutable');
  await assertSucceeds(setDoc(ref, entry()));
  await assertSucceeds(getDoc(ref));
  await assertFails(updateDoc(ref, { body: 'Changed' }));
  await assertFails(deleteDoc(ref));
});
