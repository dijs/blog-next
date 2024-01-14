---
published: true
title: A Google Docs Blog Engine
blurb: Making writing and publishing blog posts easier
layout: post
date: 1/14/2024
---

For the first post of the year, I am writing about a project I made for my wife. She needed a new blog, and I wanted to make it as easy as possible for her to write and publish posts. Using markdown is wonderful for me as a developer, but it is not as easy for her since she wants to write highly dynamic posts.

I decided to use Google Docs as the CMS because she already uses the Google Drive suite. I built a blog engine that pulls documents from Google Docs and renders them as HTML. This allows her to write posts in Google Docs, and they are auto-published based on a published date which is saved in metadata.

Google allows you to add metadata to any document, but it is not easy to do. There is no way to add metadata directly in Google Docs, so I found a Chrome extension that allows you to add metadata to any document. There is a maximum length to each metadata key/value pair of around 128 characters, so I had to be creative with how I stored the data.

The metadata fields we are using are:

- `date_to_publish` the date the post should be published
- `summary` a summary of the post
- `keywords` a comma-separated list of keywords

Each of these of used to render meta tags in the head of the document. `date_to_publish` is used to determine if the post should be published or not. This allows her to write posts ahead of time and have them auto-publish.

I wanted to make it easy for her to customize the look and feel of the blog, so after pulling the HTML of each document, I dynamically rendered static HTML pages for each post. This allows her to use plain CSS to customize the look and feel of the blog.

I am using NextJS to build and render the blog and Vercel to host it.

This allows the entire process to be free, and very easy to maintain.

If anyone is interested in using this, I can make it available on GitHub. Just let me know.
