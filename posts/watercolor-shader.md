---
published: true
title: Watercolor Shader
blurb: Realtime psychedelic visuals
layout: post
date: 5/22/2022
---

My wife is a pro at watercolor pencils. It always amazes me that she can take a great little sketch and apply some water with a few brushstrokes to it and it comes to life.

Check out some of her [work](https://www.heathervanderdys.com/).

Shaders have always been interesting to me and I love to understand how they work. My goal with this shader was to immerse the viewer into a realtime watercolor painting.

The shader source is actually quite small:

```c
shader_type canvas_item;

uniform sampler2D noise;
uniform float noise_amp = 0.67;
uniform float time_scale = 0.01;
uniform float scale = 0.72;
uniform vec2 offset = vec2(0);

void fragment() {
	vec2 n = texture(noise, UV + TIME * time_scale).xy;
	COLOR = texture(TEXTURE, offset + UV * (1. + n * noise_amp) * scale);
}
```

Essentially I am swapping nearby pixels according to a [simplex](…) noise map.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ujp8B7WmTfU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
