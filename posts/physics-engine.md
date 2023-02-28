---
published: true
title: Physics Engine
blurb: Bouncing balls in full color!
layout: post
date: 2/28/2023
---

## Background

I have always been impressed by physics engines. When I was an undergrad, I had a colleague in one of my programming classes who wrote and released a Physics Engine written in C#. That was my first real introduction to the inner workings of these systems. Through years of building games, implementing my own very simple physics systems, and using ones built into game engines (mainly Godot), I started to understand what made them tick.

## Genesis

The reason I sat down and wrote this "toy" physics engine was because of a Youtube video I saw where a fellow developer simplified the basics of [verlet integration](https://en.wikipedia.org/wiki/Verlet_integration) and why it was important. Until I tried using this newfound knowledge, the physics engines I had built in the past would always start slowing down as soon as I had around 100 objects in the system. This much simpler way of doing the calculations was not only much easier to implement but also seemed more realistic and resulted in a more beautiful simulation.

<iframe style="width: 100%; height: 900px;" src="https://physics-engine.vercel.app" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## What's with these collisions?

In the video I watched, the author used both a `naive`, to show its drawbacks and a better `grid` based solution to solving collisions. I did the same but wanted to dig deeper and find a potentially more efficient way of solving collisions.

Long story short, I did, but it was _slower_.

I found the [QuadTree](https://en.wikipedia.org/wiki/Quadtree) structure. This, very cool data structure efficiently stores your objects in a partitioned manner based on their positions and lets you query a specific range of space to retrieve points within that space.

Like I said before, for some reason the grid-based solution is **much** more performant, and it seems to lie in the slowness of the recursive querying.

The grid solution: Every time I update an object's position, I assign it to a grid `cellIndex`. I also keep and update a `Map` of each cell's objects on every frame. In this way, I can just iterate through the grid cells, and solve collisions of the included objects, **and their cell neighbours**.

Here is the source of the demo: https://github.com/dijs/physics-engine/tree/main/src/components/physics

If anyone can spot where my quadtree was implemented wrong, or can explain why the grid solution works better in this scenario, I would be happy to learn.

Thanks for reading!
