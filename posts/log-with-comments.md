---
published: true
title: Log with Comments
blurb: Remember complex code by writing good comments
layout: post
date: 12/25/2015
---
Recently, I was debugging though a codebase and had inserted a bunch of logging statements in between the problem areas. Normally, after debugging and solving the issues, I would remove the logs and be done with it. Code is working again, done, move on with life...

Wrong!

It will bite you. Most of us cannot remember those fine details in our codebase, especially when the logic is any kind of complicated.

I have made the mistake many times, and it finally clicked for me. If I am already logging information which helps me understand what the program is doing, why not use that for comments? So, instead of ripping out the logs I added after debugging, I just convert them to practical future knowledge comments.

By the way, this does not replace following good code standards and using descriptive variable and function/method names, etc.

Example:

```js
if(balance - amount > 0) {
  withdraw(amount);
}else{
  throw new Error('not enough money');
}
```

There is a bug in this code. You cannot empty your account if you wanted to, because you must leave a balance larger than zero.

But by just glancing at it, that may not be immediately understood.

If I were debugging this code, I may do this:

```js
if(balance - amount > 0) {
  console.log('withdrew ' + amount + ' and left ' + (balance - amount));
  withdraw(amount);
}else{
  throw new Error('not enough money');
}
```

After finding the error, I would switch that log statement to a useful comment.

```javascript
// Withdrawal amount must not exceed account balance, but can equal balance for emptying an account
if(balance - amount >= 0) {
  withdraw(amount);
}else{
  throw new Error('not enough money');
}
```
Go an write some better comments, so you will understand your old code in the future!
