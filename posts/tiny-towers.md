---
published: true
title: Tiny Towers
blurb: A simple tower defense game for airplane mode
layout: post
date: 11/20/2026
---

I was on an airplane and wanted to play some tower defense to pass the time. I tried opening some older tower defense games and was shocked to find that they were completely unusable without an internet connection. The games were already on my phone, but apparently that wasn't enough.

Completely useless, in my opinion.

Tower defense seems like such a good fit for a offline environment. I don't want to deal with micro-transactions or hour-long cooldowns. I just want a road full of enemies to deal with.

So, I decided to make my own.

## Keeping it simple

Tiny Towers is a small tower defense game built around the familiar pattern: place towers along a road and keep the enemies from reaching your castle.

There are four tower types. Archers fire quickly, catapults hit groups, mages deal with armor, and snares slow things down. You earn gold, upgrade your towers, and try to survive another wave.

That's enough to get started.

I like how much you can get out of those few pieces. A tower near a bend gets more time to attack. A snare can keep enemies in range of a catapult. Spending all your gold on one powerful tower means leaving another part of the road poorly defended. You can understand the rules quickly and still spend a while figuring out a good strategy.

I wanted the screen to be easy to read, too. The whole thing looks like an old campaign map, with little illustrated towers and enemies moving across parchment. It fits the scale of the game, and I like being able to see the entire battlefield at once.

## A kingdom that keeps going

Eventually, your kingdom falls. Then you get another generation to try again.

There is some progression between attempts, but the extra systems open up as you play. You begin with the towers and the road. Once you have a handle on those, the game starts giving you more decisions to make.

One of my favorite parts is the Kingdom Laws. These let you change the rules for future generations, with a benefit and a drawback. You might get more starting gold in exchange for earning less from enemies. Suddenly, a strategy that worked in the last generation needs some adjustment. This was my simple try at a prestige system.

## Airplane mode

The most important requirement for this game was that it had to work **fully** offline.

Once installed, the game has everything it needs on the device. The waves, upgrades, unlocks, and rewards all work locally. Your records and kingdom progress are saved locally as well. You can put your phone in airplane mode and play.

I built it with Godot. For this kind of game, keeping everything on the device is pretty straightforward. There is no reason for a server to decide whether an archer can shoot an enemy walking down a road.

Honestly, offline play feels like a strange thing to call a feature. I would have expected it from the games I opened on that flight. But that experience made it the main requirement for mine.

I wanted a small game I could have on my phone and actually play when I had some time. On a flight, somewhere with terrible reception, or just sitting on the couch.

Tiny Towers is my attempt at that. Build some towers, see how long the castle holds, and try again when it falls. I'm looking forward to having it with me on the next flight.

[Play Tiny Towers in your browser](/tiny-towers/index.html).
