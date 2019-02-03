---
published: true
title: Yet Another Container/Presenter Pattern
blurb: Use another component layer to transform your data to be rendered easily
layout: post
date: 11/08/2016
---

*These ideas are not just for React, but for simplicity, I will be using React to demonstrate.*

I am not going to go over what Smart/Dumb components are, Dan Abramov already did a great job [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.nrqfzj2dj).

These are awesome ideas! And I would like to expand upon it.

Before I start, let me be clear. This pattern I will be explaining is **NOT** for every little component.

Without future ado...

Introduce another level of complexity 😄!

Yes, it sounds ridiculous, but here is the reason: **Data which is easy to store and update is not always structured in an efficient manner to pass down through components or for the components to use and reduce that data.**

My proposition is to use a **View Container** in between the Data Store and the Presenter.

![Pattern Flow](https://docs.google.com/drawings/d/1SLtlXyZzw6CukM2CigBJOyMpq9Yny57p9-L7sIonKA0/pub?w=629&amp;h=195)

By splitting up the way we manage the data and the way we manage the view state we can use better data structures to store, update, and obtain the necessary data to present.

Here are some examples of the same application, but handling data, reducing, and rendering differently.

### First is our monolith. Do everything in one component.
<iframe width="100%" height="300" src="http://jsfiddle.net/fojjyLkk/1/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Second is using the plain Container/Presenter pattern.
<iframe width="100%" height="300" src="http://jsfiddle.net/cnmLyqx7/1/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Third example shows Data Store/View Container/Presenter pattern.
<iframe width="100%" height="300" src="http://jsfiddle.net/d6nc2u9t/embedded/js,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

The state and action handler in the last example can be extracted out as a Redux Store/Reducer, which would clean up this example even more.

I hope my explanation showed how we can improve the separation of concerns and logic in our applications.

<hr />

## 2019 Update 

A much better way to acheive this same pattern is by using a [react-recollect](https://github.com/davidgilbertson/react-recollect) store and transforming your view data with `selectors`.