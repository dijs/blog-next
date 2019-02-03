---
published: true
title: Self Learning Game
blurb: Training a neural network to play a simple shoot-em-up game by trial and error
layout: post
date: 08/29/2017
---

Long have I been trying to make some time to properly use machine learning to
play a game.

In the past, I tried teaching a neural network to play Mario. That did not go very well. [Link](http://richard.vanderdys.blog/posts/stupid-mario.html)

I believe there were too many inputs. I see what I was thinking, I wanted to give the network our entire visual input. But this is not entirely realistic. When we play games, we are not evaluating each pixel of each frame! We are using our incredible eyes to focus on certain parts of the screen, most notably where the player is and what objects are relatively close to him.

So, Round 2.

I made a simpler game where the goal is not to get hit by missiles.

Take a look:

<iframe width="100%" height="900" src="https://dijs.github.io/ai-dodger/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

So, I wanted to train a network to decide where to move next based on the current player's state.

After creating the actual game and playing it a bit, I generalized the code to
accept an AI player.

I went through 3 different machine learning implementations before I actually got something that worked.

First, was a hand coded solution which tried to use a table with all possible
inputs and outcomes, and each cell was updated as to which action was best in that state. This solution did not seem to work at all, although it would be interesting to try again using what I have learned now.

I instead, tried to use a already built solution for neural networks. I had heard great things about ConvNetJS, so I implemented the [Reinforcement Learning Brain](http://cs.stanford.edu/people/karpathy/convnetjs/demo/rldemo.html) to be my actor. The result was not much better... At this point, I created the "Average Reward Over Time" visualization that you can see on the right of the game. These numbers should be growing as time passes, since the AI is supposed to get smarter. But they were not. So, I scrapped that library.

I went with another [library](http://cs.stanford.edu/people/karpathy/reinforcejs/) that focused only on reinforcement learning. Same author. Since I had already generalized the code, implementing this new library was very straightforward. And almost immediately I saw actual learning. So, after cleaning up the code and putting some lipstick on the game itself, I called it a success.

Finally, an AI player that teaches itself to play a simple game!

For those who are interested, the training inputs I finalized on were simply an array of binary digits which signified whether there existed enemies relative to the players positions (in a line of sight fashion). This can be easily seen in the game. I have highlighted the inputs as green and red. The small size of the input really improved the learning rate of the AI player. The reward was simply based on whether or not the chosen state kept the player alive or not.

The HUGE difference here (between this and Mario) if you have not guessed already is that I have the game state, and not just the frame buffer to work with. I imagine I could use a similar solution to teach Mario to survive if I figured out a way to reduce a simplified game state.

Anyways, Thanks for reading if you made it this far!
