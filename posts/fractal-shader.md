---
published: true
title: Painting with Pixels
blurb: Unleashing the Power of WebGL Shaders
layout: post
date: 06/05/2023
---

<iframe style="width: 100%; height: 630px;" src="/shader.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Hello, coding enthusiasts! Today, we will be delving into the wonderful world of shaders and WebGL. With these tools, we can create dazzling visuals that can be embedded directly into web pages, providing a truly interactive experience. Our aim is to craft a mesmerizing animation that responds to user input, creating a dynamic display of colors and shapes. We will also create a function that allows us to download this animation as a GIF! Let's dive in.

## Understanding Shaders

Shaders are a type of program used in 3D rendering to produce appropriate levels of color, darkness, light, and other visual effects. They are written in a language called GLSL (OpenGL Shading Language), which is a high-level language with a syntax similar to C. Shaders are used because they allow us to harness the computational power of modern GPUs to render stunning graphics with incredible efficiency.

In our project, we use two types of shaders: the vertex shader and the fragment shader. The vertex shader processes the vertex data of our scene, while the fragment shader processes the color and depth information for each pixel.

## The Code

At the heart of our program, we have a WebGL context that renders our visuals to a `<canvas>` element. We feed this context with data from our vertex and fragment shaders, and utilize a variety of adjustable parameters (uniforms) that manipulate the look and feel of our display. These uniforms range from the frequency of our fractal ("u_freq") to the color palette ("u_pd") and the glow amount ("u_glow_amount").

For the sake of flexibility, we have associated these uniforms with a series of HTML range inputs. As the user moves these sliders, their values are fed back into the WebGL context, leading to real-time changes in our visualization. This creates an interactive experience where the user can manipulate the graphics in a very direct and intuitive manner.

## The Magic of Fractals

We've chosen to use fractals for this project, due to their near-infinite complexity and potential for beautiful imagery. Specifically, we're making use of the fract() function, which generates the fractional part of a number, producing a repeating pattern. By repeating this process on a per-pixel basis and modulating the outcome with our range inputs, we create intricate and dynamic patterns.

## Recording the Animation

To capture the beauty of our creation, we have implemented a recording function. When the 'Download GIF' button is clicked, the program starts capturing frames of the canvas and adds them to a GIF file using the gif.js library. This recording can then be downloaded by the user, preserving their unique fractal creation in a portable and shareable format.

## A Few Final Words

This post has introduced you to the fascinating world of shaders, fractals, and WebGL. These tools allow you to tap into the raw power of modern GPUs and create truly stunning visuals right in your web browser. We hope you've found this guide informative and inspiring.

Remember, the code provided here is just a starting point. With a little imagination and a willingness to experiment, you can push this basic framework in a myriad of exciting directions. Happy coding!
