---
published: true
title: Retro Neural Network
blurb: The last entry for the JS1k code golfing competition
layout: post
date: 3/5/2019
---

Since 2014, I have been a part of JS1k. It has been a challenge and a great learning experience.

I will devote this post to sharing my journey through coding my last entry. But if anyone is interested, here are the links to my past entries.

- [https://js1k.com/2014-dragons/demo/1848](https://js1k.com/2014-dragons/demo/1848)
- [https://js1k.com/2015-hypetrain/demo/2136](https://js1k.com/2015-hypetrain/demo/2136)
- *I missed 2016 for some reason, I don't remember why*
- [https://js1k.com/2017-magic/demo/2693](https://js1k.com/2017-magic/demo/2693)
- [https://js1k.com/2018-coins/demo/3103](https://js1k.com/2018-coins/demo/3103)

And my latest, [https://js1k.com/2019-x/demo/4099](https://js1k.com/2019-x/demo/4099)

<iframe width="100%" height="600" src="https://jsfiddle.net/dijs/4a3z9pvu/5/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


I split this project into sections, to make sure each step made sense and worked properly.

The last thing you want to do is jump right into rolling your own neural network... please don't do that.

My goals were:

1. Figure how to render a stylish 'X' to the screen
2. Scale down and transform the image data to something a neural network can use for input
3. Use an already built library to build first neural network (I used [brain.js](https://github.com/BrainJS/brain.js))
4. Simplify everything as much as possible
5. Replace NN library with simplified functions which implement forward/backward propagation
6. Add style

