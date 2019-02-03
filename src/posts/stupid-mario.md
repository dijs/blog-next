---
published: true
title: Stupid Mario
blurb: Learning neural network algorithms with Mario and emulators
layout: post
date: 12/01/2014
---

I have seen a bunch of neural network articles around Hacker News lately. The way I boiled it down was: if you could simplify a problem and solution down to a finite number of inputs and a binary output, you could train a network to solve that problem on its own.

I used to do a lot of Mario speed runs in high school. I was never any good, but to this day that is the only way I can play Mario now. It has been ingrained into my muscle memory.

What if I taught a neural network how to play Mario?

**Hypothesis**

Starting simple. I just want to see if I can train a network to NOT DIE. I will ask the network when to jump throughout the level. After so many experiences dying where he should jump, hopefully he will learn to jump.

**Setup**

I used the fantastic [JSNES](https://fir.sh/projects/jsnes/) to facilitate the game itself. I was able to easily grab the data I needed directly from the emulator's memory. I found this great [map](http://datacrystal.romhacking.net/wiki/Super_Mario_Bros.:RAM_map) that made it easy to find the exact variables I used for training and event detection.

The next part was the brain itself.

I tried quite a few big open source neural network Javascript libraries, but due to development issues, I decided to just use a simple perceptron function.

**Training**

I wanted to training to be just like a human, visual. So my training input was a normalized frame buffer which I converted to greyscale for ease of use with the perceptron.

The output would be if Mario needed to jump right after that frame.

I simply trained the perceptron by detecting when Mario had died and used the previous buffer.

Automating the game play was the trickiest part. I had to detect game overs, collision deaths, and pit fall deaths, and automate Mario's controls.

**Outcome**

No, I do not have a perfect Mario player yet... that is why I titled this post _Stupid_ Mario.

It is hard to truly tell if a network is learning until it makes sufficient progress.

[Try it out!](http://www.richardvanderdys.com/projects/stupid-mario)

**Future Ideas**

- Use more events for training
- Save/Load network data
- Use a big name network library
- Other games
