Page load time is an important factor when developing a website. As modern developers, we can get too focused on what our frameworks (React, Vue, Angular) are doing for us, and we forget what our users are actually being served. With our users in mind, we can continue using our frameworks, but transform what the user receives to significantly improve the performance of the site.

Have you looked at the output HTML for a basic client-side React app?
It is the bare minimum for HTML, with some javascript to load the app. This might be fine for apps that are not user facing, Admin UI's, Internal Tools, etc. But if this is an external application which will need to be SEO friendly, this is horrible. We need to give our users **something** on the first page load!

Do you remember the olden days of website programming? A different HTML file for each page where CSS and JS was sprinkled within? Sure, this eventually became a burden to maintain when applications grew large, but the benefit was **there was no magic**! There was not a bunch of different libraries transforming a bunch of independent modules, setting up communication between them, transpiling, prepping them for rendering, minifying and more.

Our end users **do not care** about that.

...

But developers do.

That is why these frameworks exist! Because they are incredibly helpful. [They](https://reactjs.org/) allow us to separate business logic from views and to organize our code in a well maintainable manner. [They](https://babeljs.io/) give us brand new ways to use our programming languages. [They](https://webpack.js.org/) compile all our code and resources down into a package which is easy to deploy.

So, what is my point? Why can't we have both?

**You can.**

I'm not talking about the server-side rendering of these frameworks. Yes, that is cool, but in that scenario the server is having to run, build, render, and serve your application for each request (*with the opportunity to cache of course*).

But what if we could do better?

**You can.**

Write your app using a modern framework. Render it as a deployment step. Deploy as a pure static app, which can be hosted anywhere (AWS, Google, Github, etc). Then if you need dynamic content, fetch and handle it client-side.

With this approach, our websites can be highly maintainable, incredibly fast, and easy to deploy.

To eat my own dog food, this is exactly how I built my blog site.

...

I am in the process of creating a tool for developers which can help write their applications using this pattern.
