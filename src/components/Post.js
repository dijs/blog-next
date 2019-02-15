import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Header from './Header';
import Back from './Back';

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
        <meta name="description" content={blurb} />
      </Helmet>
      <Header showBack />
      <article className="post">
        <aside className="info">
          <h1>{title}</h1>
          <div className="date">{date}</div>
        </aside>
        <main className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </main>
      </article>
      <Back />
    </div>
  );
}
