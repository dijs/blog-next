---
published: true
title: Art Generation
blurb: Beauty in Randomness
layout: post
date: 5/27/2022
---

<div class="gallery">
  <img src="/art-generator/hook.png">
  <img src="/art-generator/fish.png">
  <img src="/art-generator/teacher.png">
  <img src="/art-generator/origami.png">
</div>

I am loving all the incredible computer generated art these days. I will preface this post with "nothing I made here uses machine learning or neural networks". Maybe one day I that can be added to this generator, but today is not that day.

If you just want to play with what I built, go ahead:

Try out the [generator](/art-generator/index.html)!

Mondrian was the first artist that opened the world of geometrical art for me. For the first time "modern" art had its own personal meaning to me, that there would be beauty in organized geometrical chaos. Being able to break down that chaos into a algorithm almost feels wrong, as if I am removing the human-ness to it. But alas, breaking down problems is what I do.

The first thing I wanted to do was simplify the problem. I have seen a lot of generated art to be grid based. While I like the grid for simplification purposes, I didn't want my end result to look too blocky.

The next problem was how to render anything. I decidied to essetially do a random walk across the canvas. I was worried choosing random points would look messy, so I ended up shuffling the verticies of my grid and choosing a subset to traverse.

I needed to fill the shapes created by my random walk paths and make sure each shape has its own color. I recently found a great color pallete [resource](https://coolors.co/palettes/trending). This website allowed me to theme my generated artwork using trendy colors, which can be customized of course.

Finally, I made a little user interface to show off all the bells and whistles of the generator. I hope you enjoy it and make something that you find interesting.
