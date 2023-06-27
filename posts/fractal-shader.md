---
published: true
title: Painting with Pixels
blurb: Unleashing the Power of WebGL Shaders
layout: post
date: 06/05/2023
---

<iframe style="width: 100%; height: 630px;" src="/shader.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Hello, coding enthusiasts! Today, we will be delving into the wonderful world of shaders and WebGL. With these tools, we can create dazzling visuals that can be embedded directly into web pages. Our aim is to craft a mesmerizing animation that uses a dynamic display of colors and shapes. We will also add a feature that allows us to download this animation as a GIF! Let's dive in.

## Understanding Shaders

Shaders are a type of program used in graphics to produce appropriate levels of color, darkness, light, and other visual effects. They are written in a language called GLSL (OpenGL Shading Language), which is a high-level language with a syntax similar to C. Shaders are used because they allow us to harness the computational power of modern GPUs to render stunning graphics with incredible efficiency.

In our project, we will mainly use one type of shader: the fragment shader. The vertex shader processes the vertex data of our scene, while the fragment shader processes the color and depth information for each pixel.

## The Code

At the heart of our program, we have a WebGL context that renders our visuals to a `<canvas>` element. We feed this context with data from our vertex and fragment shaders, and utilize a variety of adjustable `uniforms` that manipulate the look and feel of our display. These uniforms range from the frequency of our fractal `u_freq` to the color palette `u_pd` and the glow amount `u_glow_amount`.

We have associated these uniforms with a series of HTML range inputs. As the user moves these sliders, their values are fed back into the WebGL context, leading to real-time changes in our visualization. This creates an interactive experience where the user can manipulate the graphics in a very direct and intuitive manner.

## The Magic of Fractals

We've chosen to use fractals for this project, due to their near-infinite complexity and potential for beautiful imagery. Specifically, we're making use of the fract() function, which generates the fractional part of a number, producing a repeating pattern. By repeating this process on a per-pixel basis and modulating the outcome with our range inputs, we create intricate and dynamic patterns.

## Recording the Animation

To capture the beauty of our creation, we have implemented a recording function. When the 'Download GIF' button is clicked, the program starts capturing frames of the canvas and adds them to a GIF file using the `gif.js` library. The library renders the gif file and starts the download, preserving their unique fractal creation in a portable and shareable format.

## A Few Final Words

This post has introduced you to the fascinating world of shaders, fractals, and WebGL. These tools allow you to tap into the raw power of modern GPUs and create truly stunning visuals right in your web browser. We hope you've found this guide informative and inspiring.

Remember, the code provided here is just a starting point. With a little imagination and a willingness to experiment, you can push this basic framework in a myriad of exciting directions.

```js
#version 300 es
precision mediump float;

uniform float u_freq;
uniform vec3 u_pa;
uniform vec3 u_pb;
uniform vec3 u_pc;
uniform vec3 u_pd;
uniform float u_iterations;
uniform float u_time_scale_color;
uniform float u_time_scale_shape;
uniform float u_fract_amp;
uniform float u_fract_off;
uniform float u_glow_amount;
uniform float u_iter_amount;
uniform float u_time;
uniform vec2 u_resolution;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

out vec4 color;

void main() {
    vec2 uv = (gl_FragCoord.xy / u_resolution) * 2.0 - 1.0;

    vec2 uv0 = uv;

    vec3 finalColor = vec3(0.0, 0.0, 0.0);

    for (float i = 0.0; i < u_iterations; i++) {
        uv = fract(uv * u_fract_amp) - u_fract_off;

        float d0 = length(uv0);
        float d = length(uv) * exp(-d0);

        float seed = d0 + i * u_iter_amount + u_time * u_time_scale_color;
        vec3 color = palette(seed, u_pa, u_pb, u_pc, u_pd);

        d = sin(d * u_freq + u_time * u_time_scale_shape) / u_freq;
        d = abs(d);

        d = smoothstep(0.0, 0.1, d);
        d = pow(u_glow_amount / d, 1.2);

        finalColor += color * d;
    }

    float g = length(uv);

    color = vec4(finalColor, 1.0);
}
```

Thanks to `kishimisu` for the amazing shader tutorial!
