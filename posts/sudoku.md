---
published: true
title: Sudoku Solver
blurb: Using a computer to mimic human solving techniques
layout: post
date: 12/27/2021
---

I have always been facinated with Sudoku. It reminds me a lot of the Rubik's Cube, with many different "problems" and various techniques to solve the one "solution".

In order to better understand these techniques we use while analyzing a sudoku problem, I decided to write a visual solver.

Check it out [here](https://sudoku-solver-mu.vercel.app/)!

The app allows you to solve a sudoku problem step by step. There are currently only two techniques used, but I plan on adding more.

**Single Candidate Search** which checks the row, column, and box for all other possible numbers. If there is only one possible number left, it must be the solution.

**Naked Pairs** which finds naked pairs among rows, columns, or boxes. Then it analyzes if that "pair" can be used to determine a solution.

This [website](https://www.conceptispuzzles.com/index.aspx?uri=puzzle/sudoku/techniques) was great at explaining various different techniques
