---
published: true
title: Animating Your Game
blurb: How to bring Blender animations to Godot
layout: post
date: 12/7/2023
---

So, to start with, I am not a 3D modeling expert whatsoever. I follow Blender tutorials and hack things together until they work.

More specifically, I am trying to use Blender to create 3D models for a game in Godot. Exporting models from Blender to Godot is not a big deal if you are not using animations.

Without animations, the steps are very simple:

1. Create a model in Blender
2. Export the model as a .glb file
3. Import the model into Godot
4. Profit

But why would anyone want to make a game without animations? I certainly don't. So, I had to figure out how to export animations from Blender to Godot.This took me a while to figure out, so I am going to share it here so that others can benefit from my pain and so that I can remember how to do it.

I am going to assume you already have a model in Blender that you want to animate. If you are only using location, rotation, and scaling animations, then you can skip this post essentially. Why? Because you can do all those things in Godot already! But if you want your meshes to animate in some other way, like for example a sail catching wind, then you will need to use shape keys.

We use modifiers to animate meshes, but Godot does not support modifiers directly. So, we have to **save** the modified mesh as a shape key. Shape keys were the secret sauce that I was missing. Shape keys allow you to morph a mesh into a different shape over time.

Of course, everyone uses different terminology for this stuff, so that was the last piece of the puzzle for me. Godot calls shape keys **"Blend Shapes"**. After many hours of trying to export animations from Blender to Godot, no animation ever worked as it did in Blender. I finally found a post that mentioned "Blend Shapes", and the lightbulb went off!

There it was, a property field on the exported Mesh in Godot called "Blend Shapes". I grabbed the slider and moved it, and my mesh morphed into the shape I had created!!

So, here are the steps to export animations from Blender to Godot:

1. Create a model in Blender
2. Create a Basis shape key
3. Add the modifiers you want to animate your mesh
4. Apply your modifier using the "Apply as Shape Key" button
5. Test your shape key by moving the slider in the "Shape Keys" panel
6. Export the model as a .glb file (verify that the "Shape Keys" checkbox is checked under "Animation")

Good luck and happy animating!
