---
published: true
title: Shading with GPU
blurb: Parallel hatching with accelerated math functions
layout: post
date: 2/15/2019
---

I have always been fascinated when art and programming can come together and make something beautiful.

Unless a program uses randomness, art created with a program will always follow the rules the programmer taught it.

Of course, with human artists, no two pieces will be the same.

I am interested in trying to discover the logic of certain types of artwork, or sometimes, more specifically, the technique used within.

I recently saw some extraordinary artwork which used the [hatching](https://www.mybluprint.com/article/this-hatching-exercise-will-make-your-drawings-better) technique for shading.

I decided to challenge myself to re-draw images using this technique.

Oh yeah, as an extra challenge, I am using the GPU for all the math computations.

Before I dive into my algorithm, here is the result

<iframe style="width: 100%; height: 800px;" src="//jsfiddle.net/dijs/6qf28gt7/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

I am really happy with how simplified the code ended up being. I started with lots of over complicated math and rendering methods. But after trial and error and some creativity, I ended up with this process:

**For each pixel in the image**
1. Compute the luminance
2. Threshold color based on dynamic number of spaces
3. Exponentially expand value to create the illusion of more or less shading
4. Use dynamic function to decide whether or not the pixel is a part of a shade line

