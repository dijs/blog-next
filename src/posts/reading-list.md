---
published: true
title: Reading List
layout: post
date: 12/17/2014
---
I use [Readability](http://readability.com) to bookmark all the articles I come across every day. Since I do not usually have time to sit down and read during the day, I read at night. Although, I prefer reading physical books to my laptop or phone screen. So, I decided to create books of all my articles per year. They would serve as reading list history and also ease the actual "reading" process.

**Plan**

- Export all my bookmarks from Readability
- Compile the content of all the articles into a book format
- Create PDF for backup and print

**Export**

This was easy. Readbility just emails you a JSON document with all of your bookmark data. Or you can use their API to gather this information.

**Compile**

This was a bit more difficult. Since the export data did not include the article content, I had to "parse" the URL's for content. Luckily, Readability's API includes their parser also.

I wrote this simple node application to combine the article contents together into a HTML page:

```javascript
//Create Reading List eBook
var readability = require('readability-api');
var async = require('async');

var articleUrls = require('./readability.json').bookmarks.map(function(article) {
	return article.article__url;
});

readability.configure({
	parser_token: '<API KEY>'
});

var parser = new readability.parser();

var html = '<!DOCTYPE html><html><head><meta charset="UTF-8"><link href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css" rel="stylesheet"><title>Reading Material 2014</title></head><body class="container">';

async.each(articleUrls, function(url, done) {
	parser.parse(url, function(err, article) {
		if (article) {
			html += '<article><h1>' + article.title + '</h1><p>' + article.content + '</p></article>';
		}
		done();
	});
}, function() {
	html += '</body></html>';
	console.log(html);
});
```

After creating and styling the HTML a bit, I used Google Chrome to print the page to PDF for me. I realize this could have been done within the node app also, but Chrome was quicker at the time.

Now each year I can have a digital history of what I read and have physical copies to fill my bookshelf with.
