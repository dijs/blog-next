export const MAX_COMMENT_LENGTH = 5000;

export function initials(name) {
  return (name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('') || '?').toUpperCase();
}

export function avatarSources(photoURL, gravatarHash) {
  return [photoURL, /^[a-f0-9]{64}$/.test(gravatarHash || '') ? `https://www.gravatar.com/avatar/${gravatarHash}?s=80&d=404` : null].filter(Boolean);
}

export async function emailHash(email) {
  if (!email) return '';
  const bytes = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(email.trim().toLowerCase()));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function authMessage(error) {
  switch (error.code) {
    case 'auth/configuration-not-found': return 'Sign-in is temporarily unavailable. Please try again later.';
    case 'auth/popup-closed-by-user': return 'Sign-in was cancelled. Your draft is still here.';
    case 'auth/cancelled-popup-request': return 'Another sign-in window is already open.';
    case 'auth/popup-blocked': return 'Allow pop-ups for this site, then try signing in again.';
    case 'auth/account-exists-with-different-credential': return 'This email uses another sign-in method. Please contact the site owner.';
    case 'auth/operation-not-allowed': return 'Sign-in is temporarily unavailable. Please try again later.';
    default: return 'Could not sign in. Please try again. Your draft is still here.';
  }
}
