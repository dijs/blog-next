import { readFile } from 'node:fs/promises';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
if (!projectId) throw new Error('Set FIREBASE_PROJECT_ID to the destination project.');
const comments = JSON.parse(await readFile(new URL('../data/legacy-comments.json', import.meta.url), 'utf8'));
const write = process.argv.includes('--write');
if (!write) {
  console.log(`Dry run: ${comments.length} legacy comments for ${projectId}. Run with --write to import.`);
  for (const comment of comments) console.log(`${comment.slug}: ${comment.authorName} (${comment.createdAt})`);
} else {
  initializeApp({ credential: applicationDefault(), projectId });
  const db = getFirestore();
  for (const { id, slug, createdAt, ...comment } of comments) {
    const ref = db.collection('posts').doc(slug).collection('comments').doc(id);
    try {
      await ref.create({ ...comment, createdAt: Timestamp.fromDate(new Date(createdAt)) });
      console.log(`Imported ${slug}/${id}`);
    } catch (error) {
      if (error.code === 6) console.log(`Already imported ${slug}/${id}`);
      else throw error;
    }
  }
}
