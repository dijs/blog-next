---
published: true
title: Dynamic Animation
blurb: Organic movement with code
layout: post
date: 5/24/2022
---

# Dynamic Animation

I’m sure many of you all have seen organic-looking movement among creatures or players in games. I decided to give it a go myself and hopefully learn some lessons I can use elsewhere. I must give props to [RujiK](https://www.youtube.com/watch?v=ohYIUxmxI-I&t=1s) for inspiring me to learn about this.

Dynamic motion can come in all shapes and sizes: hair, tails, chains, arms, legs, etc. I am going to talk about a simple simulation of a lizard.

The lizard follows your mouse cursor and his body segments organically follow him.

<iframe width="680" height="400" src="/lizard-demo/index.html" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The idea is quite simple, for the body and tail, we have nodes which continuously follow the node directly before it with a specified distance in between. This is practically the same algorithm for making a chain. The legs and feet are a bit more complicated. The feet take steps when they are “stretched” beyond a certain threshold, then placed perpendicular to the head and base of the leg.

I hope to use this organic movement for something in the future!
