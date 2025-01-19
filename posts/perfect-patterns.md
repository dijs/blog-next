---
published: true
title: Perfect Patterns
blurb: Creating tiling magic on the canvas
layout: post
date: 1/19/2025
---

Have you ever clicked on a canvas, watched a few colorful circles appear, and thought, Wow, this is cool, but can it make patterns that look like they belong on a funky notebook or a chic wallpaper? Well, I thought the same thing. 

<iframe style="width: 100%; height: 900px;" src="https://perfect-patterns.vercel.app" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The app lets you:

1. Shift-click on the canvas to generate a handful of randomly colorful circles
2. Click to create a seamless pattern by "shifting" the canvas vertically and horizontally.
3. Add more circles and repeat the process until you're drowning in glorious patterns.

The magic happens when you take the portion of the canvas that moves off-screen and wrap it back onto the opposite side. This ensures everything aligns seamlessly. Think of it like wrapping a gift—but digitally and without the tape getting stuck to your fingers.

## The Technique

```javascript

function wrapCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  dx: number,
  dy: number
) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  fillBackground(canvas, ctx);
  ctx.putImageData(
    imageData,
    canvas.width * dx * -0.5,
    canvas.height * dy * -0.5
  );
  ctx.putImageData(
    imageData,
    canvas.width * dx * 0.5,
    canvas.height * dy * 0.5
  );
}
```

This little piece of code is where the seamless magic happens. By capturing the canvas data and redistributing it, you ensure continuity between edges. Add some randomness for the circles, and you’ve got an app that’s simple, fun, and oddly satisfying.

Let’s be real—clicking to generate random dots and then watching them transform into a seamless pattern is like a combination of Jackson Pollock and Tetris. It's messy, oddly addictive, and will make you feel like a modern artist in minutes.

Next time you’re staring at a blank canvas, remember: a few random dots, some clever wrapping, and a dash of creativity can go a long way. Who knows? Maybe your next pattern will end up on a trendy notebook or a Pinterest board. Until then, happy clicking—and tiling!