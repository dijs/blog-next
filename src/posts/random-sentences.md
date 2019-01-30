---
published: true
title: Random Sentences
layout: post
tags: [random, markov]
date: 11/22/2014
---

Recently, I have been trying to learn the Hungarian language. After memorizing a bunch of words, just repeating them to study got boring. I wanted to write a program which randomly created sentences I could use to practice with. Of course, the best practice would be to go find a native speaker near me, but I wanted a challenge...

### Hypothesis

In order to generate random sentences, I needed some kind of sentence building logic. I have used Markov Chains to build random names in the past, so why would it not work for sentences?

### Data

First! I needed data. Thank God for <http://www.gutenberg.org/>. This saved me loads of time finding a bunch of random text.

### Training

This was a lot of data, so I did not want to load it all in memory at once. Let's use Stream's!

I streamed the huge text data file and counted all the instances of each [bigram](http://en.wikipedia.org/wiki/Bigram) and [trigram](http://en.wikipedia.org/wiki/Trigram). After counting, I sorted each word's adjacent neighbor by the number of instances. This gave me a list of words and their most used adajcent bigram and trigram neighbor.

### Generation

With this Markov "link" data, I was able to generate rudimentary sentences. Nothing made sense, but it was easy to read.

These sentences are not logical, they are built by choosing what word should statistically come next.

### Ideas for the future:

- Extract/Analyze subject, verb, object in each sentence
- Use neural networks for training _next_ word

### Code

```js
//Create Markov links
function createLinks(input, output, n) {
	var links = {};

	if (!n) {
		n = 2; // bigram by default
	}

	function trainSentence(sentence) {
		NGrams.ngrams(sentence, n).forEach(function(gram) {
			var word = gram[0];
			var neighbor = gram[n - 1];
			if (!links[word]) {
				links[word] = {};
			}
			if (!links[word][neighbor]) {
				links[word][neighbor] = 0;
			}
			links[word][neighbor]++;
		});
	}

	function read() {
		var buffer;
		while ((buffer = stream.read())) {
			buffer
				.toLowerCase()
				.split(/\./g)
				.forEach(trainSentence);
		}
	}

	var stream = fs.createReadStream(input, {
		encoding: 'utf8'
	});

	stream.on('readable', read);

	stream.once('end', function() {
		var sortedLinks = {};
		var keys = Object.keys(links);

		keys.forEach(function(key) {
			var words = Object.keys(links[key]);
			sortedLinks[key] = _.sortBy(words, function(word) {
				return links[key][word];
			});
		});

		fs.writeFile(output, JSON.stringify(sortedLinks, null, '\t'));
	});
}
```

```javascript
//Generate Sentence
function generateSentenceMark2(
	bigramInput,
	trigramInput,
	length,
	k,
	dictionary,
	starter
) {
	var bigrams = require(bigramInput);
	var trigrams = require(trigramInput);

	var current = starter || _.sample(dictionary || Object.keys(bigrams));
	var last;

	var sentence = [current];

	function dictionaryContains(word) {
		return _.contains(dictionary, word);
	}

	function getNeighbor(links, word) {
		var neighbors = links[word];
		if (dictionary) {
			neighbors = neighbors.filter(dictionaryContains);
		}
		// neighbors might be null or empty...
		var neighbor = neighbors[Math.ceil(neighbors.length * Math.random() * k)];
		// Go through all of the words if word doesnt have neighbors
		var i = 0;
		while (!_.has(links, neighbor) && i < neighbors.length) {
			neighbor = neighbors[i++];
		}
		return neighbor;
	}

	// Generate Neighbors
	_(length - 1).times(function(i) {
		var neighbor =
			i % 2 === 0 ? getNeighbor(bigrams, current) : getNeighbor(trigrams, last);
		last = current;
		current = neighbor;
		sentence.push(current);
	});

	return sentence.join(' ');
}
```
