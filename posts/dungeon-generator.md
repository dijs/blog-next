---
published: true
title: Dungeon Generator
blurb: Overlap some rooms, then separate. But not too much...
layout: post
date: 5/19/2020
---

I have recently been making games in Godot. All kinds of different game genres. I want to play around and see what I like most. Developing games in Godot deserves an entire post or multiple to itself, but this post is about **dungeons**...

Everyone and their brother has a dungeon generator and there are already fancy algorithms which generate them for you.

But I wanted to learn how they work and wanted something custom. So I made one.

The dungeons for this particular game are quite simple. There are no complex mazes or paths in between rooms.

_If you just want to play with the generator, just scroll to the bottom._

## The Algorithm

The general algorithm for this is as follows:

- Generate a number of overlapping rectangles of different sizes (rooms)
- While a room overlaps another
  - Move that room one unit in a random direction
  - If moving the room causes an "island" to exist, reverse that movement

But what is an _island_?

For this algorithm, an island is simply a room which does not intersect another room. But there is an edge case...

If you count a corner to corner overlap as an intersection, that may cause issues in your game. So I added a check for a _minimum overlap area_.

## Let's do better.

With the algorithm above, I was able to generate small 3-5 room dungeons in around 50-100 iterations of the algorithm. But when I tried big dungeons, like 16-24 rooms, it took over a 1000 iterations and multiple seconds to solve!

In order to make this more efficient, I thought about using a set room velocity instead of always picking a random direction. This worked wonders. I had similar results and much fewer iterations. I was able to crank out a 32 room dungeon in less than a second.

## Enjoy some generated dungeons.

**Reset** makes a bunch of overlapping rooms

**Generate** generates the dungeon all at once

**Tick** generates the dungeon one step at a time

<iframe style="width: 100%; height: 400px;" src="https://jsfiddle.net/dijs/196mbuyp/embedded/result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
