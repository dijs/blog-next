import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Header from './Header';

export default function Post({ metadata: { title, date }, content }) {
  return (
    <div>
      <Helmet title={title} />
      <Header />
      <div className="post">
        <div className="info">
          <div className="title">{title}</div>
          <div className="date">{date}</div>
        </div>
        <div className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </div>
      </div>
    </div>
  );
}
