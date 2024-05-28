---
published: true
title: Bringing the Silver Screen to the Terminal
blurb: A developer's journey to streaming movies in ASCII art
layout: post
date: 5/2/2024
---

<video width="1280" height="720" controls>
  <source src="/videos/bunny.mp4" type="video/mp4">
  No video support.
</video>

## Introduction

Every now and then, a project comes along that sounds just crazy enough to work. My latest venture? Streaming a movie in ASCII art directly within a terminal. Yes, you heard that right—think of it as a nod to the early days of computing meets modern Node.js wizardry. In this post, I'll walk you through the rollercoaster ride of turning a video file into a "terminal blockbuster."

## History

I do remember back in my early days of programming, I found a telnet server that streamed Star Wars in ASCII art. It was mesmerizing to watch the iconic opening crawl rendered in text characters. This project was a nod to that experience, but with a modern twist.

## The Premise

The idea struck me one lazy Sunday afternoon: what if I could watch any movie in ASCII right in my command line? The concept was nostalgic, a bit quirky, and technically intriguing. The plan was to use Node.js, a dash of FFmpeg magic, and some good old ASCII art generation to make it happen.

## The Setup

Here's a quick overview of the environment:

- **Node.js** for running the script
- **FFmpeg** for extracting frames from the movie
- **ascii-art** and **ascii-art-ansi** libraries for converting images to ASCII

## Challenge 1: Frame Extraction

The first hurdle was extracting frames from the movie in a way that they could be fed into our ASCII renderer. FFmpeg came to the rescue here, allowing me to dissect the movie into individual frames with specific dimensions and at a manageable frame rate.

### Solution

Using the command below, I extracted frames at one frame per second, scaled down to fit the terminal window:

```bash
ffmpeg -i source/movie.mp4 -vf "scale=400:-1,fps=1" frames/%04d.png
```

## Challenge 2: ASCII Rendering

Next up was the challenge of turning these frames into ASCII. The `ascii-art` library provided a straightforward way to do this, but tweaking it to handle a stream of images smoothly took some doing.

### Solution

I crafted a Node.js script that would load each frame, convert it to ASCII, and display it, then clear the terminal for the next frame, creating an animation effect.

## Challenge 3: Keeping the Terminal Clean

Rapidly changing ASCII frames cluttered the terminal, creating a jumbled mess rather than a movie.

### Solution

I initially tried to clear the terminal on every frame, but it caused flickering. So instead, I reset the cursor before rendering each new frame. Here's a snippet:

```javascript
function resetCursor() {
  process.stdout.write('\u001b[0;0H');
}
```

## Challenge 4: Rendering

#### Character Density

Initially using the default ASCII character set, the output was too coarse to capture the movie's essence. I needed a denser character set to render more detail. Using the block characters from the `ascii-art-ansi` library did the trick.

#### Color Support

Movies are colorful, and ASCII is not. To add a splash of color, I leveraged ANSI escape codes to render the ASCII art in color. This required some tweaking of the `ascii-art-ansi` library to support color rendering. The best results came from using full 32-bit color support.

Here is a snippet of the code:

```javascript
const Color = require('ascii-art-ansi/color');

Color.isTrueColor = true;
```

## Conclusion

What started as a fun experiment turned into a deep dive into the nuances of Node.js, color support, and multimedia processing. The end result? A fully functional ASCII cinema in my terminal! It may not replace IMAX, but it sure brings a new angle to "Netflix and chill."

So, grab your popcorn, clone the repo, and enjoy your favorite movies in a style only a true geek could love. Happy coding!
