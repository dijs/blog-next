---
published: true
title: Custom Babel Plugin
blurb: Learning how to write plugins for Babel
layout: post
date: 7/12/2019
---

I will assume the readers of this article know what [Babel](https://babeljs.io/) is. If not and you are a Javascript developer, please go check it out.

When developing, I am constantly trying to be as succinct as possible in my coding. I want my code to be readable and straight to the point.

Take this example:

```js
const getRebelNames = pilots =>
  pilots.filter(pilot => pilot.faction === 'rebel').map(pilot => pilot.name);
```

With modern JS, it is much cleaner than we had before:

```js
function getRebelNames(pilots) {
  return pilots
    .filter(function(pilot) {
      return pilot.faction === 'rebel';
    })
    .map(function() {
      return pilot.name;
    });
}
```

But, when you read these lines, they don't quite flow as much as I would desire.

My thoughts when reading

```js
map(pilot => pilot.name);
```

are as follows...

`map over ... function with pilot argument ... name property of pilot`

I want better than that. In the past, I have written functions just to help with readability.

```js
const byName = pilot => pilot.name;
map(byName);
```

That is fine, but I feel that this should be built into the language itself.

Today we have Babel, and so I thought I could write a plugin which adds syntax and functionality which would help me write cleaner code.

I was halfway right.

Turns out, adding syntax is not so easy. You can only use what Babel (through Babylon) has deemed worthy, unless you want to fork their library and write your own syntax parser addition. I had never written a Babel plugin, and I wasn't going to open yet another Pandora's box. So, sadly, I had to come up with an alternative solution: _Use valid syntax in another way to achieve my goal_.

I decided to **steal** an operator which is rarely used (at least by me) to be used for another purpose.

Without further ado,

```js
pilots.map(~name);
```

The `~` operator acts as a shortcut to reading a property of the first argument in a call expression. So this code would transpile to:

```js
pilots.map(_uid => _uid.name);
```

I wanted a syntax closer to

```js
pilots.map(.name)
```

But, alas, this is not possible yet. Maybe in the future Babel will support a way to introduce custom syntax.

Currently, there is support for basic use cases, but it was not my goal to support ALL use cases. I was just trying to learn how to write Babel plugins.

Here is the example from above using this new feature:

```js
const getRebelNames = pilots => pilots.filter(~faction === 'rebel').map(~name);
```

If you are interested in using this plugin, it is available right now!

Here is the npm [package](https://www.npmjs.com/package/babel-plugin-assume-first-argument)

Lastly, a shout out to the helpful links I found for learning:

- [The Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
- An excellent starting [repo](https://github.com/40x/babel-plugin-runtime-logger) which has easy to use tests
