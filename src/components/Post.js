import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Post({ metadata: { title, image, date }, content }) {
  return (
    <div>
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
