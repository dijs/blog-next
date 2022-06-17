---
published: true
title: Infinite Desert RPG
blurb: 2D or 3D? That is the question.
layout: post
date: 6/17/2022
---

So. Big. Pivot.

It’s going to be 3D. I can hear you arguing already, “But why?? The 2D isometric graphics were the bee’s knees and gave it a fun old school look”. I get it. I tried. At the end of the day, after determining what style of story I wanted to tell, the player need to feel a depth and vastness of the terrain that was very difficult to obtain with 2D Iso. I went as far as recreating the amazing isometric style of Roller Coaster Tycoon. But the work that would have had to go into making the terrain look good and be traversable would have been a nightmare, and frankly I want to spend my time on the rest of the game. So, I started down the road of 3D. Thankfully, I have done a few 3D projects in Godot already, nothing publishable unfortunately. I hope to change that with this game though.

Check out my progress, and the details below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/0Af1523K_0A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="max-width: 100%;"></iframe>

I have come up with a story. I won’t be sharing those details yet though, I wanted to focus on the engine for now. I did not want to give up on the infinite-ness of my world. So that is the very first thing I worked on. Using noise to generate height maps is easy mode. Making an infinite terrain is another story. Thankfully by sampling noise based on player position allows us to get a smooth terrain height map at any position. In order to keep the number of game objects maintainable, I am using chunks. 

Nine chunks are loaded around the player at all times. Within each chunk, I sample different noise instances to determine where water and nature objects exist. Creatures will be randomly placed given certain conditions. NPC’s will be loaded on particular spots in order to plan the story later on.

Once I figured out the terrain rendering, placing objects was simple. The next big challenge was animating 3D models. I have never done this. I was able to find some great static animal models, and figured I could learn to animate them. Thank goodness for Youtube. I was able to follow a few tutorials and use Blender’s armature feature to rig some basic animations.

Seeing the moving animals, greenery, rocks, and sky really made the world **pop** in my opinion. I will continue to port over the features I had already finished in the 2D version and hopefully get started on the story side of things soon.