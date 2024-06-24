import buildPosts from '../../scripts/build-posts';

export default async function rss(_request, response) {
  response.setHeader('Content-Type', 'text/xml');
  response.write(`<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
      <channel>
          <title>dijs Talks - Blog of Richard van der Dys</title>
          <link>https://blog.richardvanderdys.com</link>
          <description>Collection of posts about my personal development.</description>
          <language>en-us</language>
          ${buildPosts()
            .map(
              (post) => `
          <item>
              <title>${post.metadata.title}</title>
              <link>https://blog.richardvanderdys.com/post/${post.slug.replace(
                /&/g,
                '&amp;'
              )}</link>
              <description>${post.metadata.blurb.replace(
                /&/g,
                '&amp;'
              )}</description>
              <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
          </item>
          `
            )
            .join('')}
      </channel>
  </rss>`);
  response.end();
}
