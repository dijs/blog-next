import React from 'react';
import { setActivePost } from '../store/updaters';

export default function PostItem(
  { metadata: { title, image, blurb, date } },
  index
) {
  return (
    <div className="post-item" onClick={() => setActivePost(index)}>
      <div
        className="image"
        style={{
          backgroundImage: `url('${image}')`
        }}
      />
      <div className="title">{title}</div>
      <div className="blurb">{blurb}</div>
      <div className="date">{date}</div>
    </div>
  );
}
