import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { avatarSources, emailHash, initials, authMessage } from '../utils/comments.mjs';

test('avatars prefer the provider photo and fall back to Gravatar then initials', () => {
  const hash = 'a'.repeat(64);
  assert.deepEqual(avatarSources('https://example.com/photo', hash), ['https://example.com/photo', `https://www.gravatar.com/avatar/${hash}?s=80&d=404`]);
  assert.deepEqual(avatarSources('', ''), []);
  assert.deepEqual(avatarSources('', 'not-a-hash'), []);
  assert.equal(initials('Richard van der Dys'), 'RV');
  assert.equal(initials(''), '?');
});

test('Gravatar hashes normalized emails without storing an address', async () => {
  assert.equal(await emailHash(' Person@Example.com '), await emailHash('person@example.com'));
  assert.match(await emailHash('person@example.com'), /^[a-f0-9]{64}$/);
  assert.equal(await emailHash(''), '');
});

test('account conflicts and cancelled popups give actionable messages', () => {
  assert.match(authMessage({ code: 'auth/account-exists-with-different-credential' }), /contact the site owner/);
  assert.match(authMessage({ code: 'auth/popup-closed-by-user' }), /draft is still here/);
});

test('legacy migration contains only the four post comments, without account associations', async () => {
  const comments = JSON.parse(await readFile(new URL('../data/legacy-comments.json', import.meta.url), 'utf8'));
  assert.equal(comments.length, 4);
  assert.equal(new Set(comments.map((comment) => comment.id)).size, 4);
  assert.deepEqual([...new Set(comments.map((comment) => comment.slug))].sort(), ['art-generation', 'cracking-the-code']);
  assert.ok(comments.every((comment) => comment.authorId === null && !('email' in comment) && !comment.photoURL && Number.isFinite(Date.parse(comment.createdAt))));
});
