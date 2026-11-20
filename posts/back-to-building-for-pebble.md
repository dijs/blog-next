---
published: true
title: Back to Building for Pebble
blurb: Getting back into Pebble development with three new watchfaces.
layout: post
date: 11/20/2026
---

It’s been a long time since I’ve been involved in Pebble development, and I’m excited to be getting back into it.

Excited enough that I’ve already started making watchfaces again. Apparently getting back into Pebble development comes with a growing collection of project folders.

There’s something satisfying about building for a watch. You have a small screen, a handful of buttons, and a very short window to make something useful or interesting. Every bit of space matters. A font change or a few pixels of adjustment can make a surprisingly big difference.

I’ve been remembering how much I enjoy that.

One of the projects I’ve been working on is **[JARVIS](https://apps.repebble.com/jarvis_5f56eb11a5654499b7432d7e)**. It has exactly the sort of sci-fi look you’d expect from the name: cyan graphics on black, concentric rings, and a little dashboard of information around a big digital clock. The goal was to make something that feels like a tiny futuristic interface on your wrist while still being readable when you just want to know the time.

It shows the date, battery percentage with a circular indicator, and current weather conditions and temperature. The weather comes through the phone using location data, so there’s some practical information behind all those glowing-looking lines.

[![JARVIS watchface with a cyan sci-fi interface, central clock, weather, date, and battery indicator](/images/back-to-building-for-pebble/jarvis.png)](https://apps.repebble.com/jarvis_5f56eb11a5654499b7432d7e)

A lot of the work has been in the details. Moving text around. Adjusting colors. Cleaning up the background. Getting the visual balance right.

Looking back through the commits, there are messages like “better,” “cleaner,” and “pretty.” That’s a fairly accurate development diary. Sometimes you know exactly what needs to change. Sometimes you move something a few pixels, look at it again, and decide: yep, better.

I like having a project where that counts as a productive evening.

I’ve also been experimenting with watchfaces that make the screen itself a little more playful. **[LifeGrid](https://apps.repebble.com/lifegrid_8c8db61e613a42859267c6f0)** puts a tiled clock into an edge-to-edge grid, with Conway’s Game of Life evolving around it. The screenshot gives you an idea of the look: big black digits surrounded by tiny cells and scattered bits of color.

[![LifeGrid watchface with large tiled clock digits surrounded by a grid of black, white, and colorful cells](/images/back-to-building-for-pebble/lifegrid.png)](https://apps.repebble.com/lifegrid_8c8db61e613a42859267c6f0)

**[Passing Forms](https://apps.repebble.com/passing-forms_7fa656ef67374a5fbaaaa323)** takes an abstract direction, creating a new geometric composition every minute. Large time digits sit over bold blocks of color and black-and-white shapes. It’s been fun exploring how much personality a watchface can have through its layout alone.

[![Passing Forms watchface with large outlined time digits over red, yellow, blue, black, and white geometric shapes](/images/back-to-building-for-pebble/passing-forms.png)](https://apps.repebble.com/passing-forms_7fa656ef67374a5fbaaaa323)

These watchfaces have been a fun way to get comfortable with Pebble development again, each with its own personality. You can find all of them on [my Pebble Appstore developer page](https://apps.repebble.com/apps/dev/dijs_5304f76ae3fb8e7bef0002bb), and the screenshots above link to their individual listings.

They’ve already brought back a familiar habit: wondering what else I could squeeze onto this little screen.

That curiosity is a big part of why this new era of Pebble feels exciting to me.

PebbleOS is now open source, and there’s new hardware to build for. The developer tools have also been updated for modern computers, alongside browser-based development options. There’s a lot to explore as a returning developer. [The update on Pebble’s open-source software and development tools](https://ericmigi.com/blog/pebble-watch-software-is-now-100percent-open-source/) gives a good sense of how much has changed.

I also want to acknowledge the people who kept this community going while I was away. Rebble and the wider Pebble community put years of work into keeping watches, software, and services usable. Returning to a platform with that kind of dedication behind it means something. [Eric’s announcement about bringing Pebble back](https://ericmigi.com/blog/why-were-bringing-pebble-back/) recognizes how much that work helped make this possible.

I’m looking forward to reconnecting with the community, seeing what people are building, and sharing some projects of my own.

For now, I’m enjoying having the SDK open again, tweaking a watchface, and discovering that I still have plenty of ideas for a tiny screen.

It’s good to be back.
