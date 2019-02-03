---
published: true
title: Workflow
blurb: Step by step guide to how you should code
layout: post
date: 09/19/2015
---
Over the years, my development workflow has changed tremendously. Whether learning from past problem solving experiences, studying software patterns, or learning from other developers, my view on workflow has changed.

A brief personal coding history:

**High School (2007):** No OO, no tests, no code repos, no libraries. I was re-inventing the wheel wherever I went.

**College:** Object oriented design, basic patterns.

**First Job:** Libraries. Still developing on production code, haha...

**Second Job:**  Started open source contributing. Used SVN (gross).

**Current Job:** Tests. Modular design patterns. Git.

There it is, eight years of learning.

I would like to share my current workflow, one that I use for almost all of my projects currently, and has served me well.

### 1. State the problem or idea

This is the first and most important step. You must clearly understand your problem or idea. This is **not** the time to think about implementation! What you are doing here is defining the input and expected output. Think of use cases your solution will be solving.

### 2. Design and Draw Solution

You should spend a lot of time on this one. Find a whiteboard, and get drawing. Define where the data is coming from, and where it is going. Draw how things are connected and what information will be sent between them. Think about the logic expressions you will need. If your data will need to be transformed, draw some examples. At this stage, you are writing down all your design ideas.

### 3. Modularize Design

Before you start on this one, unless you are lucky enough to have two white boards, take a picture of your original solution design. During this step, you are going to simplify and modularize your solution. Start by extracting functionality into independent modules. This allows them to have a clear purpose. What you are doing in this stage is breaking down larger problems into smaller problems. This has many great side effects including easier testability, reusability, and maintainability.

### 4. Create unit tests for modules

Let’s make sure the modules will work as expected after we implement them. Since you have the designs for clear and independent modules now, think about the required parameters of each module and their respective required results. Now write unit tests based on your module requirements.

### 5. Implement modules

This one should be straight forward. Implement modules which are validated by your units tests. You might be thinking I am a full on “Test Driven Development” dude by now. I’m not. I just picked up ideas from my peers at work and molded some of their philosophies into my development workflow. “Use only that which works, and take it from any place you can find it.” - Bruce Lee

### 6. Create use case tests

Now that you have your modules created and tested, let’s write use case tests. These will be end-to-end test scenarios which cover your entire solution. They will touch many of yours modules.  That being said. I am an advocate of **really really fast tests**, so make sure you mock, stub, do whatever you need to do in order to **not** call actual outside services. That wastes time.

### 7. Tie together modules to implement solution

By the time you get to this step, you should definitely know how your modules should be connected, which coding patterns you will use, and the overall structure of the codebase. Just to point out, this is **not a waterfall** workflow, be agile! If you you need to step back in the process, do it, but **follow the order** of the stages. Do not implement code before you design and write the initial tests for it. Once your use case tests pass, your solution should be complete.

