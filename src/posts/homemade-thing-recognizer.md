---
published: true
image: 'https://cdn.pixabay.com/photo/2018/03/31/06/31/dog-3277416__340.jpg'
title: Homemade Thing Recognizer
layout: post
date: 11/19/2017
---

When I was in college (around 2010), I worked with OpenCV and facial detection quite a bit, I always found it very interesting. I wanted to build a recognition platform on top of this, but I quickly determined I was in **way** over my head...

Neural networks have come a long way since then.

Since moving into our home, I have been trying to find ways of gathering data. Temperatures inside and outside, moisture levels in the garden, todo list data, camera systems with motion detection, etc. I have been doing this in the hope that one day, I can create a neural networks to help with things around the house.

Recently, I have had a breakthrough in this area.

After noticing that I was _accidentally_ storing hundreds of gigabytes of motion detection videos, I realized the treasure this could be!

## Finding the interesting bits

Since I peruse the tech blogs every day, I remembered seeing some new work in the image tagging world. After some searching, I found it again, [YOLO](https://pjreddie.com/darknet/yolo/). After building this library, downloading a previously trained model, and learning a bit of python, I was labeling objects in my videos!

At first, I naively thought there was no way this could work for my use case. Each tag took around 30 seconds to calculate and I was potentially going to have thousands of frames thrown at this thing.

NO. I went a **much** simpler route that has bene working well.

## Only a few frames

I decided there was no reason to analyze entire videos worth of frames. My motion detection was already doing the hard work for me. I decided to break out **ffmpeg** and extract a few frames of the detection video.

This greatly simplified my problem. Now all I had to do was tag a few images for each detection video.

I quickly wrote a simple python server that accepted an POST request with an image, and used YOLO to spit out a list of labels. Each which had bounding box data... this was getting exciting.

## Tagging

Just for fun, I whipped up a quick react app which allowed me to _swipe_ through all my tagged objects and give them **real** labels.

## Personal Recognition

To be honest, the labels were nice, but those were not what I was after. I wanted to know when my wife walks through the gate, if my dog is barking at the fence, or if a friend comes over. That was my goal.

I went back to a library I had tried before and failed with. [ConvNetJS](http://cs.stanford.edu/people/karpathy/convnetjs/docs.html) I had remembered he made a demo which could learn to recognize objects from a dataset with 90% accuracy after just a few minutes.

Here is the [demo](http://cs.stanford.edu/people/karpathy/convnetjs/demo/cifar10.html).

I now had a large amount of raw training data, and a potential library to use.

I knew my raw data needed to be cleaned up and normalized for it to run through a network. I kept it simple, I **cropped** out the detected boundary of the image then used a **contain** algorithm to resize them to 64x64. In the future I want to also save a horizontal flipped version of the image so I can double my training data.

It took a fews day to figure out ConvNetJS. At first I was only running the data through once per image and expecting it to work 🤦.

I went back to the demo and realized he was throwing random input images at the network and teaching it the correct label, while minimizing the "classification loss". I coded up something very similar, but without the fancy graphs. It was just a terminal app that took all my normalized images and personal labels and trained them randomly over a set amount of iterations.

After tweaking the network training configuration a few times, my training normally takes around 30 mins, and performs quite well.

I now get emails throughout the day of **recognized** people, dogs, cars, etc.

Still more work to do, but I am very happy with where it is right now.
