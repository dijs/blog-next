---
published: true
title: Vacbot Part 1
layout: post
date: 3/27/2016
---

My wonderful wife recently bought me a iCreate 2 hackable roomba. She knows me well...

Many different ideas came to my mind while thinking about what to do with it. Most of them were a bit too grand scale, so I decided to get a feel for the roomba's hackability with a simple project first. I will create a drivable roomba with sight.

In order to start creating the robot, I did a lot of research and decided to use a raspberry pi for the "brain" of the bot instead of an arduino (which I had used before) because I needed WiFi, more CPU, easy power and serial inputs.

The pi setup was pretty straightforward. Installing the OS was simple with NOOBS. The USB WiFi adapter was easy to plugin and get DHCP, although getting a static IP took a lot of digging through forums to figure out and I am still not sure I completely understand what I did. But it works! Getting SSH setup was easy and made my life much easier.

Installing the camera to the pi was simple after watching an installation video. And thankfully there are easy to use programs already built for the module.

Getting anything to control the vacuum was a headache. I tried first with my mac, which for whatever reason was not creating a TTY to use for communicating. Thankfully, the pi did create one. Although, when trying to use any of the npm modules built for communication, they didn't work. After digging through the specs of the iCreate 2, it turns out the baud rate is different than the original iCreate. After forking one of the modules and updating the rate, I was good to go.

Next was figuring out video streaming. Lot's of people accomplished this in many different ways, but I think I found a great solution. This [project](https://github.com/jacksonliam/mjpg-streamer) is capable of doing everything I needed. I cloned and compiled it on the pi and it already has a raspberry pi camera module interface built in! With one command, I was streaming high quality video at 30 fps.

Now to find a way to use the power from the iCreate 2's serial cable to power my raspberry pi B+...

I have some ideas, but since I am not an electrical engineer, I am not confident they will work. I plan on trying to use the power wires from the serial cable and using a buck converter to get a constant 5v to a micro usb cable which is plugged into the pi. Then (this is where it gets weird) I want to take the data wires (and ground I think) and splice them to a USB A cable which I can plug into the pi for communicating.

Not sure if this will work, but I will find out when the parts arrive!

There is a lot more to this than I thought, but things are slowly coming together.

Next part coming soon.
