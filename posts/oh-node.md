---
published: true
title: Oh Node...
layout: post
date: 12/10/2020
---

Oh Node...

Maybe that was a pun. I didn't intend it to be, but if it makes you smile, there it is.

I am quite pissed off with NodeJS right now.

### Context

A few minutes ago, I opened a web app project from 2 years ago (according to the git commit). I had a quick look at the project structure. It's a NextJS app. Awesome, go me. I used a fresh modern framework with practically no extras. I mean, I added SASS. Forgive me. What would a sane JS developer do? `npm install` and start a built-in development server? That is what I thought too...

💥 BOOM! 💥

Babel and webpack errors oh my. Grrr... How and why would this be the case? I am using Next for goodness sake. Isn't Next supposed to handle this low-level transpilation and compilation for you?

I don't care if I am using a version of Next that is 5 major versions old. At one point it worked just fine. Why would it magically not work now?

### Frustration

I enjoy modern Javascript. But boy have I grown to hate Node. If anything slows down my productivity on almost a daily basis and causes headaches, it's Node.

I would rather have to wait 10 mins for `npm install` to fully download everything my project depends on as long as it works every time.

And I am not even touching `package-lock.json`... What a mess. A developer should not have to maintain two separate files that contain information about dependency versions.

I know I am not the only developer with Node issues. But if the problem is this large, the community should be working on a solution right?

Yarn was a failure. It tried to do what `npm` does, but better. But that doesn't fix the underlying issues of Node package dependencies.

### Hope

Not sure how everything will shake out in the community. But I have heard good things about [deno](https://deno.land). Let's all hope that `deno` allows us to code with modern Javascript while not having to stress about our dependencies and whether they will work out of the box after two years.
