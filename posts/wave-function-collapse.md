---
published: false
title: Unleashing Infinite Worlds with Wave Function Collapse in Godot
blurb: Discover the Power of Procedural Level Generation
layout: post
date: 4/16/2023
---

As a game developer, I've always been fascinated by procedural level generation. The ability to create endless, unique levels that can keep players engaged is a powerful tool for any game. Recently, I came across an intriguing procedural generation algorithm called Wave Function Collapse (WFC). In this blog post, I'll provide a high-level overview of WFC and share how I implemented it in Godot using GDScript to create interesting levels for my game.

Overview of the Wave Function Collapse Algorithm:

The WFC algorithm has three main steps:

Analyzing the input data and building a list of possible tiles and their constraints.
Selecting an initial tile and updating the constraints.
Iteratively collapsing the wave function by choosing the next tile and updating the constraints until a coherent structure is generated or the algorithm fails.
Implementing WFC in Godot with GDScript:

Step 1 - Analyzing the Input Data:

In my Godot implementation, the input data is stored in a TileMap node called ExTileMap. I iterated through each tile and built a dictionary of possible neighbor tiles for each direction.

-- Share code

Step 2 - Selecting an Initial Tile and Updating Constraints:

With the possible tiles and constraints analyzed, I randomly filled an initial cell based on the possible tiles.

-- Share code

Step 3 - Iteratively Collapsing the Wave Function:

I collapsed the wave function by choosing the next tile and updating the constraints in a loop until a coherent structure was generated or the algorithm failed.

By implementing the Wave Function Collapse algorithm in Godot using GDScript, I was able to create fascinating and coherent levels for my game. The procedural generation capabilities of WFC are a valuable addition to any game developer's toolbox. If you're interested in creating unique levels for your games, I encourage you to explore WFC and see how it can enhance your projects.

--- Share screen shots or live examples of the algorithm in action ---
