---
published: true
title: Obstacle Avoidance
blurb: Game movement with Godot
layout: post
date: 4/29/2022
---

## Demo

Click around to spawn barrels which move towards the statue while avoiding boulders.

<iframe width="680" height="400" src="/ObstacleAvoidanceDemo/index.html" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## How it works

#### The Colors

The line from the barrel shows the current direction of its velocity.

The colors represent what the barrel is currently avoiding and how far ahead the obstacle is.

If the barrel turns green/yellow, the obstacle is far away and we will slowly avoid it.

If the barrel turns orange, the obstacle is close and we will avoid it more.

If the barrel turns red, the barrel is within the boundary of the obstacle and quickly moves away from it.

#### Simplified Algorithm

- For each step in the game engine
  - For each barrel
    - Calculate the direction towards the statue
    - Calculate the avoidance force for the most threatening obstacle
    - Apply those vectors to the velocity of the barrel

#### Avoidance Force

This was the most difficult vector to calculate. We use a line to determine the most threatening obstacle to avoid. The barrel looks ahead a certain amount of pixels and we use that as a ray. We look at 3 points along that ray. If there is an obstacle at one of those points, it is a possible threat. We loop through all the possible threats to determine the closest. Once we have found the closest threat, we caclulate a force to avoid it.

```
avoidance_force = (ahead - obstacle.position).normalized() * max_avoid_force
```
