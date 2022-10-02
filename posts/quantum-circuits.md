---
published: true
title: Quantum Circuits
blurb: Tool for testing out quantum circuit logic
layout: post
date: 10/2/2022
---

## The Origin

I am grateful to have a mother-in-law who continually challenges me. We both share the trait of desiring to constantly learn more and improve our craft. She is currently studying quantum computing and likes to bounce ideas off me. Recently she shared that her team was building a math library from the ground up using only quantum circuits. They already had an adder but were struggling with the subtractor. 

## Solving the Problem

I never work with this type of low-level programming, so I saw this as an interesting challenge. At first, we were only working with 2 bits which only encompasses the values: 0, 1, 2, and 3. I came at this as I would any problem, at a high level. Before writing any code, I needed to re-learn binary subtraction. Since, at the quantum level, all you have are bits to work with (1 or 0). I had not done binary subtraction since college, but it quickly came back. After doing a few example problems to feel comfortable, I replaced all the bits with variables. Now I could write some pseudo-code which handled all the different conditions during the computation.

## Building the Circuit

Now came the step I had never done before, translating an algorithm into a series of logic gates. All I had to work with was

- a few bits which served as the memory
- a flip operator (1 -> 0 or 0 -> 1)
- a controlled flip operator (flip if a bit is 1)

My problem was finding a combination of these operators which could correctly subtract B from A.

Like I said before, we are only handling the 2-bit case right now. There could be a similar solution to this problem which returns the output to a separate pair of bits in memory, but this solution modifies B itself. 

The memory looked something like this:

A<sub>0</sub> `(1) - - - - -`

A<sub>1</sub> `(1) - - - - -`

B<sub>0</sub> `(0) - - - - -`

B<sub>1</sub> `(1) - - - - -`

This particular case signifies 3-2 or in binary form 11-10.

After the subtraction is done, the B<sub>0</sub> would be `1` and B<sub>1</sub> would be `0`.

The circuit was complete, now for testing...

## Yet another Tool

These circuits were incredibly difficult to debug by just staring at them. After solving the 2-bit case, I wanted to make sure I had my circuit properly covered with unit tests before I moved forward with any other N-bit solution.

I won't go into the details of development since this is just a quick React application. But here is my homemade tool for building and testing quantum circuits.

[Check it out](https://quantum-circuits.vercel.app/)!