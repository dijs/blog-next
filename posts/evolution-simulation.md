---
published: true
title: Evolution Simulation
blurb: Simulating creature evolution in a limited environment
layout: post
date: 5/11/2019
---

# Evolution Simulation

I wanted to create a space where I could observe if and how creatures change over time in order to survive. The idea was to simulate natural selection of traits: speed, size, and sense.

Speed controls the rate at which a creature can move around and search for food.

Size controls if they can eat other creatures.

Sense controls the radius of the area the creature can _sense_ around them.

Movement cost is calculated as size<sup>3</sup> + speed<sup>2</sup> + sense

At each step, if a creature has enough energy, they move around and search for food in order to survive. If they sense a creature less than 30% of their size, they can eat them instead.

If they found more at least one piece of food, they survive the day.

If they found more than one piece of food, they generate another creature with traits similar to theirs.

The simulation ends when no creature survives the day.

## Demo

<iframe style="width: 100%; height: 500px;" src="https://dijs.github.io/evolution-sim/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Source is [here](https://github.com/dijs/evolution-sim)
