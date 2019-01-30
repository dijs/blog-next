---
published: true
title: Flashcards
layout: post
date: 12/31/2014
---
Through my adventures of learning the Hungarian language, flashcards have been a great tool for memorizing new vocabulary. The best open source app I found was [Anki](https://github.com/dae/anki). The program was highly customizable and I found tons of free download-able decks online, full of study material. Downside was the mobile app. It was expensive and did not features I had seen on some other free flashcard apps.

A friend drew my attention to [Flashcards](https://itunes.apple.com/us/app/flashcards/id478986342?mt=8) by NKO, which was a very fun app to use and it was free!

I wanted to use this new app for my mobile studying, but there was no way I was going to manually create hundreds of words...on my phone...

After doing a little research into the different applications deck file formats, I felt like hacking. Turned out that both apps just used compressed zip files as their outer shell and renamed the extensions. Anki used a complicated SQLite database to store all of their information for each deck. I quickly was able to export the needed data rows (English and Hungarian columns) to a CSV file. The other app used a FDK file format, which archived a JSON (YAY!) configuration file and data files (Images and Sounds). This format was a bit harder to build.

My first run through was simple, I just created a text-only version of my Anki deck. Worked like a champ!

Next big idea was to add images. Ugh... I had a list of English words, and I needed relevant images to pair them with. First tried with Google... Nope, they cut you off quickly with their API limits. After a few more tries, Flickr turned out to be the best, and the easiest to use. Now I had the images and the word pair data.

Generating the JSON configuration file took a while to figure out. Turned out they only allow you to use a max of 100 card decks in the free version of the app. I modified my conversion app to iterate through each word pair and link the images.

End result was awesome. Tons of pretty cards to flip through. Now to practice...

I was planning on released the source code of this project, was it became VERY domain specific. If anyone has a need for this source, please just [email](mailto:richard.vanderdys@gmail.com) me. I would be happy to give it out.
