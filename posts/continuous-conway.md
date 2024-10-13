---
published: true
title: Continuous Conway
blurb: Game of Life with Real Numbers
layout: post
date: 10/13/2024
---

<iframe width="100%" height="800" src="https://continuous-conway.vercel.app/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Drag the $ \beta $ slider to change how the the cells are approximated. The leftmost position is the most continuous version of the Game of Life, while the rightmost position is the most discrete version.

## Background

I have always been fascinated by the Game of Life, a cellular automaton devised by the mathematician John Conway. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.

I came across this fun blog [post](https://hardmath123.github.io/conways-gradient.html) which describes a continuous version of the Game of Life. The idea is to replace the discrete boolean states of each cell with real numbers. The next state of each cell is then calculated using pure mathematics, instead of the usual conditional rules of the Game of Life.

### Discrete Rules

The Game of Life is played on an infinite two-dimensional grid of square cells. Each cell can be in one of two states, alive or dead. The state of each cell changes over time according to the following rules:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

### Continuous Math Version

Let $c_{x, y}$ represent the current value at coordinates $(x, y)$.

Let $n_{x, y}$ represent the sum of the neighboring values around $(x, y)$.

<p>
$$
n_{x, y} = \sum_{i=-1}^{1} \sum_{j=-1}^{1} c_{x+i, y+j} - c_{x, y}
$$
</p>

<p>Define two distributions $ a $ and $ b $ based on $ n $:</p>

<p>
    $$ a = \text{distr}(n, 2.5, 1) $$
    $$ b = \text{distr}(n, 3, 1) $$
</p>

<p>The updated value $ v $ at position $(x, y)$ is calculated as:</p>

<p>
    $$ v = c \cdot a + (1 - c) \cdot b $$
</p>

<p>Then we apply a sigmoid function to approximate the value between 0 and 1 using a $ \beta $ threshold:</p>

<p>
    $$ v_{\text{final}} = \sigma(v, 0.3, \beta) $$
</p>
