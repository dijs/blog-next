---
published: true
title: Github Pages Static Routing
blurb: Fixing statically hosted Github Pages site routing with directory indexes
layout: post
date: 02/06/2019
---

I ran into this issue when using [create-react-app](https://facebook.github.io/create-react-app/) and [react-snapshot](https://github.com/geelen/react-snapshot) together, but it's possible to use this solution for any setup which creates this problem.

### The Problem

After building static site assets, you may have rendered HTML files which link to your difference pages. When using Github to host a static site, it is important to structure these files in their own directory with an index. Using this organization, Github will respond with the correct page.

**Stucture before**

    /site
        /site/index.html
        /site/pages/a.html
        /site/pages/b.html
        /site/pages/c.html

**After structure fix**

    /site
        /site/index.html
        /site/pages/a/index.html
        /site/pages/b/index.html
        /site/pages/c/index.html

Only with this structure can you use loose routes such as:

- https://handle.github.io/site/pages/a
- https://handle.github.io/site/pages/b/
- https://handle.github.io/site

In order to maintain this structure, I wrote a small script to fix the original build output from react-snapshot output.

```js
const fs = require('fs');
const path = require('path');

const dir = 'build/post';
const posts = fs.readdirSync(dir).filter(name => name.endsWith('html'));

for (const post of posts) {
  const base = path.basename(post, '.html');
  try {
    fs.mkdirSync(`${dir}/${base}`);
  } catch (e) {
    console.log(e.message);
  }
  fs.renameSync(`${dir}/${post}`, `${dir}/${base}/index.html`);
}
```

I hope someone else finds this useful when building static sites hosted on Github!
