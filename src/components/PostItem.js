import React from 'react';
import { Link } from 'react-router-dom';

export default function PostItem({
  metadata: { title, image, blurb, date },
  slug,
  path
}) {
  return (
    <Link className="post-item" to={path}>
      <div
        className="image"
        style={{
          backgroundImage: `url('${image}')`
        }}
      />
      <div className="title">{title}</div>
      <div className="blurb">{blurb}</div>
      <div className="date">{date}</div>
    </Link>
  );
}
