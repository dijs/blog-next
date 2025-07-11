---
published: true
title: Cracking the Code
blurb: Finding Infinite Ore Veins in Minecraft
layout: post
date: 7/11/2025
---

A couple of weeks ago, I was playing on a modded Minecraft server with my family. The mod pack we’re using is heavily focused on **Create** — with all the glorious cogs, gears, steam engines, and kinetic chaos you’d expect.

One consistent pain point: **gathering ores in large quantities**. We built massive Create-powered drills that helped, but some resources — like **Ancient Debris** — were still extremely hard to get in bulk.

That’s when we stumbled on a gem: a mod included in our pack called [Create: Ore Excavation](https://www.curseforge.com/minecraft/mc-mods/create-ore-excavation). And it changed everything.

## Infinite Ore Veins? Yes, Please.

This mod adds a new gameplay mechanic: **"infinite" ore veins** that are scattered across the Minecraft world. Once you locate a vein within a chunk, you can set up a massive drill to extract from it — and it won’t run out.

There’s a catch, though:

- You need **serious rotational energy** to power the drill.
- Some ores require **lava or water** to operate.
- And you need a special **drill bit** to actually mine the good stuff.

I consider this a **mid-to-late game mod** — by the time you can reasonably craft the necessary machinery, power sources, and transportation, you’re likely already well-established.

Flying around with a **jetpack**, I managed to find about 5 infinite veins across thousands of blocks. It was totally worth it. Once you discover one, I highly recommend setting up **teleporters or portals** for quick access.

## The Problem: Where Are the Veins?

After scouring the overworld for diamonds and the nether for ancient debris, I started to get frustrated. I was flying for hours and finding nothing.

That’s when the programmer in me kicked in.

> _"Wait a second… this can't be truly random, can it?"_

I had a hunch: the placement of ore veins was probably **deterministic**, based on the **world seed** and **chunk coordinates**. So I did what any curious dev would do — I went digging in the mod’s source code.

## Diving Into the Mod Code

Now, I haven’t touched Java in over a decade — so jumping into Minecraft mod source code felt… nostalgic. And confusing.

I didn’t try to learn the whole modding ecosystem. Instead, I laser-focused on this **one problem**:

> _Given chunk coordinates (x, z) and a seed, tell me which infinite ore vein if any is located there._

I sifted through the mod's code, dependencies, helper libraries, and Minecraft internals. It was scattered, but not impossible to follow. I began pulling out key logic pieces and reconstructing them in my own script.

To stay grounded, I wrote some **unit tests** using my world seed and the chunk coordinates of known ore veins I’d already discovered. That way, I’d know if my reimplementation was on the right track.

It worked beautifully. **TDD to the rescue.**

## Claude, Java RNGs, and a Few Late Nights

The trickiest part? Rebuilding the mod’s **random generation logic**, which relies on Java's `Random` class and some salted structure seed calculations. Thankfully, the mod also included some handy JSON files with values like:

- **Chunk spacing**
- **Separation distances**
- **Salt constants**

Once I had those, I asked Claude to help me reimplement the structure seed logic in JavaScript. After a few hours of tinkering and running tests...

✅ **It worked.** My tests passed. I had a working ore vein locator.

## The Payoff: A Diamond Rush

To validate my code, I brute-forced a search for a diamond vein in the overworld.

It found one.

I flew to the coordinates...

💎 **Boom. Diamonds.** I couldn’t believe it.

---

## Try It Yourself

I’ve made the tool available online for anyone who’s had the same frustrations I did:

👉 [Create Ore Excavation Hunter](https://create-ore-excavation-hunter.vercel.app/)

All you need is your world seed and some chunk coordinates, and it’ll tell you if there’s an infinite vein there.

That said — I still **highly encourage manual exploration** first. There’s something magical about the moment you stumble upon a rich vein after searching for hours.

And finally, a huge shoutout to the creators of the Create Ore Excavation mod — it’s a brilliant addition to an already amazing gameplay experience.

Happy mining.
