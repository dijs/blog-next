---
published: true
title: Splashing Pixels
blurb: Unlocking the Beauty of Simulated Fluids
layout: post
date: 10/14/2023
---

I have made many different physics and particle systems throughout the years, but fluids have always been a challenge. I have tried to implement them in the past, but at the time I could not figure out how to efficiently handle the interactions between particles. And I did not understand the physics behind it.

Thankfully, I have learned a lot since then. I have learned how to implement a spatial grids to efficiently handle particle interactions and we now have incredible sources of information at our fingertips. I love watching various YouTube channels that build creative interesting projects and explain the physics behind them. Specifically for this simulation, I watched [this video](https://www.youtube.com/watch?v=rSKMYc1CQHE) by [Sebastian Lague](https://www.youtube.com/@SebastianLague).

<iframe style="border: none; width: 100%; height: 400px;" src="https://fluid-sim-dijs.vercel.app"></iframe>

Rendering a bunch of particles was straightforward. And I had already implemented a spatial grid for my [verlet physics engine](https://blog.richardvanderdys.com/post/physics-engine). So the most challenging part was understanding the physics behind the fluid dynamics. I had to learn about density, pressure forces, viscosity, etc. Thankfully, Sebastian Lague's video was a great resource for this.

Honestly, I was quite suprised after I implemented the physics how similar it was to how I implement boids. Essentially particles trying to move away from each other and move towards their neighbors to achieve stability. I also had to implement a collision system to keep the particles in the bounds of the canvas, but that was also pretty straightforward. Interacting with the particles was fun and easy since it was just another force I applied to the particles based on their distance from the mouse.

I won't explain the grid system here, since I already explained that in another post. But I will try to explain the physics behind the fluid simulation, at a high level at least.

For each step in the simulation:

- We apply gravity to the particles
- We calculate the density of each particle based on the distance to its neighbors
- We calculate the pressure force of each particle based on the density of its neighbors
- We calculate the viscosity force of each particle based on the velocity of its neighbors
- We update the velocity and position of each particle based on the forces applied to it

I used many different configurable variables to tweak the simulation since there are many different factors that affect the behavior of the fluid.

Try playing around with the variables and see what happens!
