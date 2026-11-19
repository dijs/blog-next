---
published: true
title: No Man's Mine
blurb: From planet surface to space and back again, without a loading screen.
layout: post
date: 4/9/2026
---

This project started with a very specific itch: I wanted to experience atmospheric entry and takeoff as one continuous journey.

Fly toward a planet. Enter its atmosphere. Keep descending until you can land, get out, and walk around. Then climb back into the ship and fly all the way into space again.

**No loading screen between space and the surface.**

**No cut to a landing animation.**

**Just keep flying.**

 So I built a little space exploration prototype with procedural planets, editable terrain, and a spaceship.

It's built with **Rust** and **Bevy**, and runs in the browser through WebAssembly and WebGPU. The planets come from seeds rather than hand-built maps. Up close, the ground consists of individual blocks you can mine and place. Farther away, simpler geometry keeps the whole planet manageable while you travel.

Gravity points toward the planet's center, so “up” changes as you explore. The ground beneath your feet is part of the same world you were looking at from orbit.

Of course, once I could land somewhere, I wanted to dig holes in it. Exploration is great, but sometimes you need to leave a small, structurally irresponsible contribution to the landscape.

The illustrated terrain took inspiration from [Baron](https://baron.by.dai.studio/).

It's still just a prototype, but the journey I wanted is there: **surface to space, and back again.**

Give it a spin below. Progress resets when you reload, so keep your first underground civilization modest.

<iframe src="/no-mans-mine/index.html" title="Play No Man's Mine" style="width: 100%; height: 640px; border: 0;" loading="lazy" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe>

[Open the game in its own page](/no-mans-mine/index.html).
