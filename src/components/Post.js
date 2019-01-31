import React from 'react';
import ReactMarkdown from 'react-markdown';
import Helmet from 'react-helmet';
import Back from './Back';

export default function Post({ metadata: { title, image, date }, content }) {
  return (
    <div>
      <Helmet title={title} />
      <div className="header">
        <Back active />
        Blog.
      </div>
      <div className="post">
        <div className="info">
          <div className="title">{title}</div>
          <div className="date">{date}</div>
        </div>
        <div
          className="image"
          style={{
            backgroundImage: `url('${image}')`
          }}
        />
        <div className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </div>
      </div>
    </div>
  );
}
