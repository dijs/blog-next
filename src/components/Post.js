import React from 'react';
import ReactMarkdown from 'react-markdown';
// Try creating proxy for react components

export default function Post({ metadata: { title }, content }) {
  return (
    <div>
      <div className="post">
        <div className="info">
          <div className="title">{title}</div>
          <div className="date">Jan 30, 2019</div>
          <div className="social">Social Stuff Here...</div>
        </div>
        <div
          className="image"
          style={{
            backgroundImage: `url('//picsum.photos/200?random&t=${title}')`
          }}
        />
        <div className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </div>
      </div>
    </div>
  );
}
