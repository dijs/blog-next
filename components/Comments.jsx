import { useEffect, useRef, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { addDoc, collection, getDoc, getDocsFromServer, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getFirebase } from '../lib/firebase';
import { authMessage, avatarSources, emailHash, initials, MAX_COMMENT_LENGTH } from '../utils/comments.mjs';
import styles from '../styles/comments.module.css';

function Avatar({ name, photoURL, gravatarHash }) {
  const [failed, setFailed] = useState([]);
  const src = avatarSources(photoURL, gravatarHash).find((url) => !failed.includes(url));
  return src ? <img className={styles.avatar} src={src} alt="" referrerPolicy="no-referrer" onError={() => setFailed((previous) => [...previous, src])} /> : <span className={styles.avatar} aria-hidden="true">{initials(name)}</span>;
}

function Comment({ comment }) {
  const date = comment.createdAt?.toDate ? comment.createdAt.toDate() : new Date(comment.createdAt);
  return <li className={styles.comment}>
    <Avatar name={comment.authorName} photoURL={comment.photoURL} gravatarHash={comment.gravatarHash} />
    <div className={styles.commentContent}>
      <div className={styles.byline}><strong>{comment.authorName}</strong><time dateTime={date.toISOString()}>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time></div>
      <p>{comment.body}</p>
    </div>
  </li>;
}

// Reset drafts and in-flight UI state when navigating between posts.
export default function Comments({ slug }) {
  return <PostComments key={slug} slug={slug} />;
}

function PostComments({ slug }) {
  const [services] = useState(getFirebase);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(Boolean(services));
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const mounted = useRef(false);
  const requestId = useRef(0);

  async function load() {
    const request = ++requestId.current;
    setLoading(true);
    setLoadError('');
    try {
      const snapshot = await getDocsFromServer(query(collection(services.db, 'posts', slug, 'comments'), orderBy('createdAt', 'asc')));
      if (mounted.current && request === requestId.current) setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch {
      if (mounted.current && request === requestId.current) setLoadError('Comments could not be loaded.');
    } finally {
      if (mounted.current && request === requestId.current) setLoading(false);
    }
  }

  useEffect(() => {
    mounted.current = true;
    if (!services) return () => { mounted.current = false; };
    const unsubscribe = onAuthStateChanged(services.auth, (currentUser) => { setUser(currentUser); setAuthReady(true); });
    load();
    return () => { mounted.current = false; requestId.current++; unsubscribe(); };
  }, [services, slug]);

  async function login() {
    setBusy(true);
    setActionError('');
    try {
      await signInWithPopup(services.auth, new GoogleAuthProvider());
    } catch (error) {
      if (mounted.current) setActionError(authMessage(error));
    } finally {
      if (mounted.current) setBusy(false);
    }
  }

  async function logout() {
    setActionError('');
    try { await signOut(services.auth); }
    catch { setActionError('Could not sign out. Please try again.'); }
  }

  async function submit(event) {
    event.preventDefault();
    if (busy || !user || !draft.trim() || draft.trim().length > MAX_COMMENT_LENGTH) return;
    setBusy(true);
    setActionError('');
    setNotice('');
    try {
      const token = await user.getIdTokenResult();
      const entry = {
        authorId: user.uid,
        authorName: token.claims.name || 'Reader',
        photoURL: token.claims.picture || '',
        gravatarHash: await emailHash(user.email),
        body: draft.trim(),
        createdAt: serverTimestamp(),
      };
      const doc = await addDoc(collection(services.db, 'posts', slug, 'comments'), entry);
      // The write succeeded even if reading its resolved timestamp fails.
      let saved = { ...entry, createdAt: new Date().toISOString(), id: doc.id };
      try { const snapshot = await getDoc(doc); saved = { ...snapshot.data(), id: doc.id }; } catch {}
      if (mounted.current) {
        setComments((previous) => [...previous.filter((comment) => comment.id !== saved.id), saved]);
        setDraft('');
        setNotice('Your comment has been posted.');
      }
    } catch {
      if (mounted.current) setActionError('Could not post your comment. Please try again. Your draft is still here.');
    } finally {
      if (mounted.current) setBusy(false);
    }
  }

  return <section className={styles.root} aria-label="Comments">
    <h2>Comments{comments.length > 0 && ` (${comments.length})`}</h2>
    {!services ? <p>Comments are temporarily unavailable.</p> : <>
      {loading && <p role="status">Loading comments…</p>}
      {loadError && <p role="alert">{loadError} <button type="button" onClick={load}>Retry</button></p>}
      {!loading && !loadError && comments.length === 0 && <p>No comments yet. Start the conversation.</p>}
      <ol className={styles.list}>{comments.map((comment) => <Comment key={comment.id} comment={comment} />)}</ol>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor={`comment-${slug}`}>Leave a comment</label>
        <textarea id={`comment-${slug}`} value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={MAX_COMMENT_LENGTH} rows={4} disabled={busy} placeholder="What do you think?" />
        {user ? <div className={styles.actions}><span>Signed in as {user.displayName || 'Reader'}</span><button type="button" className={styles.secondary} onClick={logout} disabled={busy}>Sign out</button><button type="submit" disabled={busy || loading || Boolean(loadError) || !draft.trim()}>{busy ? 'Posting…' : 'Post comment'}</button></div> : <div className={styles.actions}><span>Sign in to post.</span><button type="button" onClick={login} disabled={!authReady || busy}>Continue with Google</button></div>}
        {actionError && <p role="alert">{actionError}</p>}
        <p role="status" className={styles.notice}>{notice}</p>
      </form>
    </>}
  </section>;
}
