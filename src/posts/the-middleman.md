---
published: true
title: The Middleman
blurb: Tiny server which proxies and modifies responses of another server for testing purposes
layout: post
date: 04/28/2015
---
So... are you mobile friendly according to Google?

I was recently working on fixing some mobile issues at my place of work. I was required to push to production for each change since our development servers are locked down and not visible to Google.

In order to quickly make changes and test them I needed another development environment visible to Google with a clone of the website I was working on.

My first idea was to proxy the website through a small Node proxy server and modify the response. This kinda worked, but I ran in to too many brick walls...

I needed more control.

Why not just mirror the response?

What I ended up with was a application that would cache a HTTP response for a given URL and modify the page by adding CSS and Javascript to the response. If there are any dependencies, the server will proxy them through with a little Express magic.

Check out the [source](https://github.com/dijs/middleman).

### Future

- Add a edit page to accompany the view, currently you just make another middleman page
- Add more modification options
