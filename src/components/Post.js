import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Header from './Header';

export default function Post({
  metadata: { title, date, blurb },
  content,
  slug
}) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          property="og:url"
          content={`https://blog.richardvanderdys.com/post/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={blurb} />
      </Helmet>
      <Header />
      <article className="post">
        <div className="info">
          <h1>{title}</h1>
          <div className="date">{date}</div>
        </div>
        <div className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </div>
      </article>
    </div>
  );
}
