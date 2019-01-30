---
published: false
title: CSS Animation
layout: post
date: 1/25/2019
---

Recently, I worked on a project which included ....

In the past, I had mostly handled web animations with either pure javascript or a combination of CSS and javascript. Today, things are radically different.

I will not go deep into describing CSS transforms and animation here, since there are much better places for that:

https://cssreference.io/animations/
<br>
https://cssreference.io/property/transform/
<br>
https://cssreference.io/transitions/

If you do not understand these properties yet, go study them first.

In this article I will discuss some of the pain points I experienced when adding animations to my project, and give some tips and solutions so you will not make the same mistakes.

## Use CSS pre-processors!

They are really easy to setup. And even easier if you are starting with a boilerplate project like [create-react-app](https://facebook.github.io/create-react-app/) or something similar. They may already have one available. Please check!

But why?

There are loads of benefits when using a preprocessor. But more specifically, I noticed a few which helped me when creating and organizing my animations:

- Write your animation styles in separate files. I personally use a separate animation style sheet for each module.
- Nesting. This helps alleviate CSS selector repetition and also allows for more organized styles IMO.
- Use variables. It is always good to have standards. You don't want a bunch of hard coded values everywhere. This will reduce random buggy values floating around.
- Loops. When creating styles which use repetitive styles, a pre-processor can automate this for you. A common use case here is staggered animations. Each iteration of the loop may increase the animation delay

## For animations with many stages, use classes to switch animations

For example:

    none, idle, active, completed

are possible states for a element to have set

You do not want the `idle` state animation to be the default for your component, because that will cause janky animations on page load. I noticed this when some of my components were fading in every time I refreshed the page. It looked horrible.

A good rule of thumb is to only change animation state when reacting to a user interaction.

## Make your animation duration as small as possible

I normally stick to a **maximum** of 300ms. No one wants to wait for the UI.

You want to user to think, what just happened? I don't know, but it looked great.

<iframe width="100%" height="300" src="//jsfiddle.net/dijs/wym6dfh0/29/embedded/result,css/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
