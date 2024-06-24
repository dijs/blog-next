---
published: true
title: Game Boy Development
blurb: A new yet old challenge
layout: post
date: 6/24/2024
---

<video width="800" height="500" controls>
  <source src="/videos/gb.mp4" type="video/mp4">
  No video support.
</video>

## Personal History with the console

So many good memories were made with my Game Boy Color. I remember playing Pokémon Red for the first time and being completely immersed in the world—the tiny screen with a resolution of 160x144 pixels and no backlight. I remember riding in the backseat of the car on long road trips, playing games and having to wait for the highway lights to illuminate the screen so I could see what I was doing. It was a simpler time, but the games were just plain fun.

I had no idea at the time what it took to make these games and the limitations the developers had to work with. Truly, the developers of these games were wizards in their own right.

## Beginning Development

I've been making games as long as I have been programming. I have made games for the web, mobile, VR, and even the Pebble smartwatch! But I have never made a game for a specific console. When I started learning about Game Boy development, I was immediately shocked by the opinionated framework and limitations that the console had. It made sense. Nintendo wanted all the games developed for the platform to run well and be optimized for the hardware.

With each "tutorial" I followed, I learned more and more about the built-in functions and patterns. Building using these patterns was a challenge since I have in the past either done everything from scratch or used a more modern game engine like Unity or Godot.

For the first time, I could see my game in the memory (VRAM) of the machine. The "sprites" or "tiles" were living and limited to a specific piece of the memory. Being tied to only rendering 40 sprites on the screen at once was a new challenge.

## Snake-like game

I started with what I thought would be a simple game to make. I remember playing Snake on my TI-83. What I failed to remember was that the rendering on the TI-83 was done differently and was based on a grid. I wanted my Snake game to be a bit more fluid and not just changing tiles on a grid.

So I instead kept a queue of the positions visited by the head of the snake. I then rendered each snake body segment based on the position in the queue and distance from the previous segment. Once I had the snake moving around the screen, I added the ability to eat food and grow in length. I figured I had solved the challenge I set out to accomplish for this game.

## Breakout-like game

A true classic. I remember playing various forms of Breakout on my first iPod. The new challenges with this game were collision detection and rendering the bricks. Since I was limited to 40 sprites on the screen at once, I had to use background tiles to render the bricks. I think in the end, it was a simpler challenge than the Snake game, but still fun to learn more about the Game Boy system.

## Frogger-like game

Lastly, I wanted to make a Frogger-like game. The new challenges here animating sprites and using meta-sprites or sprites that are made up of multiple sprites. I used background tiles to render the road, the grass, and the river. Then I drew 8x8 sprites for the frog, the cars, and the logs. It was a fun challenge to store the different sprites in memory and animate them on the screen.

## Conclusion

I had never worked in such a constrained environment before. Using C with a specific game development framework was a new challenge. Thankfully many developers came before me to improve the framework and provide tutorials. I hope to continue to learn more about the Game Boy and make my own custom open-world space-themed game in the future!
