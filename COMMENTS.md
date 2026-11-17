# Comments setup

The comment UI uses Firebase Authentication (Google sign-in) and Firestore.
All posts use the shared component. Comments are publicly readable and fetched
once per post visit. Signed-in readers can submit plain text, up to 5,000 characters.
Moderation is done in the Firebase console; browser clients cannot edit or delete.

## Personal project

Use **richard.vanderdys@gmail.com**, not a work Google account. Create or select a
Firebase project on the no-cost **Spark** plan. Do not link a billing account.

The personal Firebase project is `blog-comments-dijs` ([console](https://console.firebase.google.com/project/blog-comments-dijs/overview)).
Use this existing project for the blog. The earlier `dijs-blog-comments` project
is unused.

Completed: registered the web app, saved its public configuration in `.env.local`,
created the default Firestore database in `us-central1`, deployed `firestore.rules`,
and imported all four old comments. Public reads were verified for both posts.
Billing is disabled.

Google is enabled and is the only supported sign-in provider. Google OAuth
initiation was verified and Google-only comment access rules are deployed.
`localhost` and `blog.richardvanderdys.com` are authorized. No GitHub OAuth app is needed.
Copy the four `NEXT_PUBLIC_FIREBASE_*` values from `.env.local` into the hosting
environment before the production build.

1. Register a Web app in Project settings. Copy `.env.example` to `.env.local` and
   fill in the four public Firebase web configuration values. Add the same values
   to the hosting environment and rebuild for production.
2. Create a Cloud Firestore database in production mode. Choose a region near
   your readers; the region cannot be changed after creation.
3. In Authentication, enable Google and select the personal account as support
   email. Leave other sign-in providers disabled.
4. Under Authentication → Settings → Authorized domains, add `localhost` and
   `blog.richardvanderdys.com` (and any preview domains you actually use).
5. Deploy access rules: `npx firebase-tools deploy --only firestore:rules --project PROJECT_ID`.
   Until rules are deployed, comments may be unavailable. Never enable public writes.

Public Firebase web configuration is not a server credential. Firestore rules
enforce access. Missing configuration shows “Comments are temporarily unavailable”
without breaking posts. Keep the Firebase default account-per-email behavior;
users encountering a provider conflict should contact the site owner.

## Import existing comments

`data/legacy-comments.json` contains four comments from the two existing blog
discussion threads, with original bodies, display names, and timestamps. Bot and
pull-request comments are excluded. Imported records have no provider association,
email address, or provider photo. Original GitHub records are left untouched.

Use personal Google Application Default Credentials locally:

```sh
gcloud auth application-default login richard.vanderdys@gmail.com
FIREBASE_PROJECT_ID=PROJECT_ID node scripts/import-comments.mjs
FIREBASE_PROJECT_ID=PROJECT_ID node scripts/import-comments.mjs --write
```

The first command previews the import. `--write` creates records using stable IDs;
rerunning skips existing records without overwriting them. Do not commit credentials.
After import, verify one comment on Art Generation and three on Cracking the Code.

Avatars use the sign-in provider photo, then a SHA-256 email hash for Gravatar,
then initials. Raw emails are never saved in public comment records. Imported
authors currently have no available public emails, so use initials.

## Checks

```sh
node --test scripts/comments.test.mjs
npx firebase-tools emulators:exec --project demo-blog-comments --only firestore 'node --test scripts/comments-rules.test.mjs'
npm run build
```

The emulator requires Java 21 or newer. Test Google sign-in on
localhost, cancel sign-in to check draft preservation, submit a comment, navigate
to another post, and verify its comments stay separate. Check popup-blocked,
offline/retry, signed-out posting, and failed-image fallback behavior.
