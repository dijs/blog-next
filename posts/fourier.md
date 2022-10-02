---
published: true
title: Art of the Fourier Transform
blurb: Drawing with waves and frequencies
layout: post
date: 9/13/2022
---

## Interesting video

We were watching some Youtube as a family recently and decided to learn about the Fourier transform (yes, we are nerdy). This beautiful piece of mathematics was Joseph Fourier's generalized theory based on his analysis of heat flow.

There was a ton of complicated math when solving these transforms, but what I found interesting was the simple motion of the geometry. I figured if I could build a program based on these visualizations alone, I could skip the math entirely, but still achieve the same result. Don't get me wrong, I love math, but I saw this as a different sort of challenge.

## Development

I decided to use Godot as my engine for this project since creating visuals is what it is meant for. I created a dynamic `Circle` scene with variable `size`, `color`, and `frequency`. Then I simply attached these `Circles`'s to each other as nested children so that their movement would be relative to their parent's motion.

Enjoy the demo below.

## Demo

<iframe style="width: 100%; height: 630px;" src="/fourier/index.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
