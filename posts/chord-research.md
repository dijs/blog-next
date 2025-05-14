---
published: true
title: Crunching Chords at Scale
blurb: What 600k Songs Taught Me About Music, Multithreading, and Jupyter Notebooks
layout: post
date: 5/14/2025
---

# Exploring the Chordonomicon with Node.js Worker Threads and Jupyter Notebooks

Recently, I stumbled across a [Hacker News post](https://www.cantgetmuchhigher.com/p/i-analyzed-chord-progressions-in) discussing a massive dataset called [Chordonomicon](https://huggingface.co/datasets/ailsntua/Chordonomicon), which includes chords, key, genre, and other metadata for over **680k songs** from [Ultimate-Guitar](https://www.ultimate-guitar.com/). As someone who loves both music and code, I couldn’t resist digging in.

This turned into a fun project that touched on large data processing, worker threads in Node.js, and even Jupyter notebooks with Deno.

## Why Bother?

The post I mentioned before focused on Keys and Chords, I would need to parse those as well, but I specifically wanted to look at the **chord progressions**. I don’t usually work with datasets this large, so processing it efficiently was part of the challenge—and the learning experience.

> “What if I multi-threaded this in TypeScript to make it faster?”

Spoiler: I’m not sure it _did_ make it faster. But it was a great excuse to experiment with `worker_threads` in a `tsx` environment.

## Setting the Stage: TSX Workers

Here’s a bit of code from my `worker.js` bootstrap file that made the whole `tsx` + `worker_threads` combination possible:

```ts
// worker.js
const path = require('path');
const { workerData } = require('worker_threads');

// Enable support for TypeScript in the worker
require('tsx');
require(path.resolve(__dirname, workerData.path));
```

**Why it’s cool:**
Normally, using TypeScript with Node.js workers is a pain or near impossible. This approach uses `tsx` to dynamically compile TS files at runtime inside worker threads—meaning I didn’t need to precompile and link them.

Then I spun up multiple workers to chunk and handle parts of the dataset:

```ts
const worker = new Worker(resolve(__dirname, 'worker.js'), {
  workerData: { path: 'worker.ts', ...data },
});
```

## Normalizing Chords to Roman Numerals

One of the most critical steps in my analysis was translating every chord into a normalized, key-agnostic format—specifically, roman numerals. This is a fundamental concept in music theory because it lets you describe chord functions like tonic, dominant, subdominant independent of key. A I–IV–V in C major (C–F–G) looks the same in G major (G–C–D), which makes it perfect for large-scale harmonic analysis.

To pull this off, I used the excellent **@tonaljs** package. This library helps parse chords, detect qualities (major/minor/diminished/etc.), and a myriad of other music theory tasks.

After normalizing and cleaning up the raw chord strings which were often messy or inconsistent, I fed them through tonaljs's `getRomanNumeral()` to extract structured harmonic data. I then aggregated that data into usable forms: frequency counts by chord type, chord-step pairings, and full progressions.

Since the data was so large, I decided to focus only on the chords from the verses of each song.

## Analysis with Deno and Jupyter

Instead of writing a typical web app or running a CLI script, I decided to do something different: I used a **Jupyter notebook** powered by a **Deno** kernel to explore the processed data.

This was my first time using a notebook from within VS Code with the [`Jupyter for Deno`](https://github.com/denoland/jupyter-deno) kernel, and it was delightful. I could write TypeScript, run it interactively, and plot results all in one place.

## Graphing with Vega-Lite

After trying several visualization libraries, I landed on **Vega-Lite**—which was lightweight and worked great with tabular JSON. My focus was mostly on:

- Key distribution
- Most common chords
- Chord progressions
- Heatmap of chords across steps

# Progressions

Breaking down the most common chord progressions by their ending cadence gave us a few lists:

- Authentic
  - `I-V-I`
  - `I-IV-V-I`
  - `I-IV-I-V-I`
  - `I-vi-IV-V-I`
  - `I-IV-vi-V-I`
  - `I-vi-ii-V-I`
  - `I-vi-V-I`
  - `I-V-IV-V-I`
  - `I-ii-V-I`
- Plagal
  - `I-IV-I`
  - `I-V-IV-I`
  - `I-V-vi-IV-I`
  - `I-V-I-IV-I`
  - `I-vi-IV-I`
  - `I-vi-V-IV-I`
  - `I-V-ii-IV-I`
  - `I-ii-IV-I`
  - `I-IV-V-IV-I`
- Deceptive
  - `I-V-vi`
  - `I-IV-V-vi`
  - `I-IV-I-V-vi`
  - `I-IV-V-I-IV-V-vi`
  - `I-V-I-V-vi`
  - `I-IV-I-IV-V-vi`
  - `I-vi-IV-V-I-vi-IV-V-vi`
  - `I-IV-I-IV-I-V-vi`

## The Results!

<iframe frameborder="0" src="/chords-notebook.html" allowfullscreen="" width="100%" height="620"></iframe>
