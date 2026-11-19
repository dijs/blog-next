---
published: true
title: Epic Battles
blurb: Several thousand tiny soldiers fighting right in your browser.
layout: post
date: 6/10/2026
---

Apparently watching [ants](/post/rise-of-the-ants) make decisions wasn’t enough. I wanted to give the decisions swords.

The idea was simple: How large of a battle could I simulate? No story. Just a battlefield I could command and zoom into and watch unfold.

I started with 32 soldiers to get the feeling, the look, and the mechanics right. Then I continued until there were 10,000 of them at over 60 fps.

The simulation is built in **Rust** with **Bevy**, again. Underneath the crowd, a spatial grid keeps neighbor checks local, while melee combat breaks down into individual duels. Each soldier has stats, health, and attack timers. Thousands of little RPG fights happening at once.

Soldiers get tired. Morale breaks. Wounded troops withdraw and recover while fresh soldiers take their place. They gain experience and ranks, which will become much more interesting once I add follow up battles and wrap this engine with an actual story and gameplay.

Archers have limited ammunition, too. Before that change, battles tended to end with the remaining archers going at it.

There’s pathfinding around obstacles, formation movement, shields, animated sprites, shadows, and blood stains.

The version below runs directly in your browser through WebAssembly and drops 5,000 soldiers onto the field.

Drag to select troops, right-click to move them, middle-drag to pan, and scroll to zoom. Or leave everyone alone and watch their terrible afternoon develop.

<iframe src="/epic-battles/index.html" title="Play Epic Battles" style="width: 100%; height: 640px; border: 0;" loading="lazy" allow="fullscreen" allowfullscreen="allowfullscreen"></iframe>

[Open the battlefield in its own page](/epic-battles/index.html).
