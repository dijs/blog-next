---
published: true
title: Functional Programming
layout: post
date: 1/31/2016
---

As I learn more about programming through the years, I find it incredible how the techniques I have come to love are normally very old.

I love math. Always have.

Math inherently does not have extra state laying around. I believe that when we transform our application's state, nothing external of our transformation context should affect the resultant state.

### What do I mean by this?

Here is a simple example: *Let's create a function which computes the sum of a list of numbers.*

Here is an example which uses extra dangerous state (**DON'T DO THIS!**):
```js
// This is the external data which
// could be affected by other code
// in this context
let sum = 0
function computeSum (numbers) {
  numbers.forEach(n => sum += n)
}
computeSum([1,2,3])
const result = sum
```

Now, a better example, using a more functional technique:

```js
const bySum = (sum, n) => sum + n
// This is safe from any
// external code
const sum = numbers => numbers.reduce(bySum)
const result = sum([1,2,3])
```

With functional programming, we can trust our code more. Functional code is more maintainable, predictable, doesn't mutate other code, can be reused, smaller, and sometimes more readable (depending on who is reading it).
