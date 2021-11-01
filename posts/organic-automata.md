---
published: true
title: Organic Automata
blurb: Experimenting with life-like behavior visualization
layout: post
date: 10/8/2021
---

## The Demo

<iframe style="border: none; width: 100%; height: 400px;" src="/organic-automata.html"></iframe>

## The Background

I have always been facinated with "The Game of Life" - created by the late John Conway. Since 1970, people all over the world have continued to research and create more and more complex simulations.

In its simplest form, the visualization is created by modifying every pixel based on the presence of its immediate neighbors.

If we were to expand each pixel's neighborhood, we could calculate values based on the presence of the surrounding cells, which gives us better knowledge of the cell's current state in their community.

We can then create rules using these values which essentially determine whether or not the cell survives the simulation step, dies, or is reborn.

## The Implementation

Since we would like this visualization to be rendered in real-time, my goal was to render the simulation at 60 frames a second. This means that every 17 milliseconds I must iterate through every pixel on the canvas, calculate information about it's neighboring cells, and determine the pixel's next state. Long story short, even after applying many optimizations, the resolution of the canvas had to stay quite small for this simulation to run anywhere near 60fps.

Now, it would be very iteresting to apply this same logic using a shader, which I am sure would be able to render this at a higher resolution with no problem. But I will leave that for another day.

## The Style

I did apply an "after-effect" to smooth out visualization since the original resolution is around 160x160 pixels. I feel it adds a more organic feel to the simulation. If anyone is interested, I learned how to make "blobs" from [this](https://css-tricks.com/shape-blobbing-css/) article.
