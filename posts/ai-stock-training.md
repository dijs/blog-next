---
published: true
title: AI Powered Stock Trading
blurb: This is not financial advice.
layout: post
date: 1/28/2022
---

Sound a little clickbaity? That was the idea, but I assure you, this article is all about trading stock based on the decision of a neural network.

## I did a thing

I am not good a picking winners in the stock market. There are too many emotions in my decisions to buy or sell. So I decided to let a neural network decide if I should buy or sell a stock, at a set time, every day. Now I am not leaving my life savings up to a bot, I am just giving it some play money to see how it does. Let's talk about how it works!

## Alpaca

A wonderfully easy to use stock trading API library. Within a few lines of code, you can analyze the market, make buy orders, check on your portfolio, etc. I set up a "wishlist" of stocks to analyze every day. I fetch the historical data for these stocks and hand that data over to the "brain".

## BrainJS

I have stuck with BrainJS for a few years now just because of its simplicity. I know TensorFlow JS would probably be a much more efficient tool to use here. But every time I try to use it, I feel like I need an entire semester to learn how to do just the basics... Anyways, I normalize the historical stock price data and train a simple neural net to learn its "pattern". I then let the neural network give me a forecasted price which determines if I need to buy or sell that stock.

## SendGrid

Once I have the stocks to buy, I make my orders, calculate my current profit/loss status and use SendGrid to email me a daily summary of my trades.

## Github

As far as running this thing. Everything is hosted on Github and is run with a Github Action. I am still trying to work out the best solution for scheduling this action to run every day. Github's built-in action scheduler did not work for me.

## Future

I will let this bot run for a few weeks and update this blog post with some results after a while.
