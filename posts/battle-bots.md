---
published: true
title: Battle Bots
blurb: Explosive Multiplayer Code Learning
layout: post
date: 2/7/2022
---

## Background

A few years ago I wrote a Javascript app that used WebSockets to power a "multiplayer" bot battling area. Each player entered an arena, could write the logic for their bot in either raw Javascript or a block-based language. This code was essentially shared across all the players in each arena.

Here was the big problem: Each player simulated their version of the battle. There was never anyone primary source of truth. I hoped that the simulations would be very very similar and all the players would essentially see the same thing. I was **wrong**, every little delta exponentially changed the simulation outcome.

In the end, I scrapped the idea and haven't looked back. Until now.

## A New Player Has Joined

Godot has changed the way I look at game development. Its built-in language is in my opinion, too simple, but gets the job done. What it does have is almost every feature you need to build any game you can think of. So a few weeks ago, I decided to try and re-create Battle Bots using ONLY Godot.

To make quick progress, I have simplified the code a player can input. It is not quite as exciting as the system I had before. But the most important feature of this new version is around the multiplayer. The server/client logic has been completely re-thought. The server now receives all necessary information from each client, acts as the main simulator, and instructs each connected client what to render. In this way, all players are always viewing the **same** battle simulation.

As far as the game logic and rendering goes, it has been a breeze. Since I am now working in a real game engine, I have built-in tools for sprites, animations, collisions, GUI, etc. New features take minutes to accomplish rather than days.

## Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/xStp4zzhUBQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Future

There is much I was would add, but in summary:

- Allow players to properly log in / create user
- Host all game event information externally
- Upgrade the code input user interface
