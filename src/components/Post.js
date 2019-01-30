import React from 'react';
import ReactMarkdown from 'react-markdown';

// Hacky fun test
const div = new Proxy(
  {},
  {
    get: function(obj, prop) {
      return props => <div className={prop} {...props} />;
    }
  }
);

export default function Post({ metadata: { title }, content }) {
  return (
    <div>
      <div.post>
        <div.info>
          <div.title>{title}</div.title>
          <div.date>Jan 30, 2019</div.date>
          <div.social>Social Stuff Here...</div.social>
        </div.info>
        <div.image
          style={{
            backgroundImage: `url('//picsum.photos/200?random&t=${title}')`
          }}
        />
        <div.content>
          <ReactMarkdown source={content} escapeHtml={false} />
        </div.content>
      </div.post>
    </div>
  );
}
