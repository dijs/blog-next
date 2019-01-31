import React from 'react';

export default function PostItem({
  metadata: { title, image, blurb, date },
  setActivePost
}) {
  return (
    <div className="post-item" onClick={setActivePost}>
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
