---
published: true
title: Panhandling
blurb: How much money could you make begging on the streets?
layout: post
date: 12/16/2015
---

After hearing plenty of stories about "fake" beggars, I decided to mathematically figure out how much one could earn by begging an entire year.

### Formula
![Formula](https://latex.codecogs.com/gif.latex?%5Csum_%7Bd%3D1%7D%5E%7B365%7D%20%5Cleft%20%5B%5Csum_%7Bh%3D1%7D%5E%7B24%7D%20e%5E%7B-%5Cleft%20%28%20%5Cfrac%7Bh-12%7D%7B6%7D%20%5Cright%20%29%5E2%7D%20%5Cright%20%5D%20%5Ccdot%20%5Cfrac%7B%5Csin%20%5Cleft%20%28%5Cfrac%7Bd%7D%7B7%7D%20%5Cright%29%20&plus;%201%7D%7B2%7D)

### How I got there...

I am using a bell curve function to find the estimates of earning throughout each day.

Then I use a wave function to find daily earning estimates throughout the week.

After using these two functions to transform the daily earnings, I calculate the summation of an entire year.

I realize that I could use *much* better functions for estimation, but this was just some quick research.

Finally, if you could find a way to earn $20/hr, you could make $39,030.67 annually according to this formula.
