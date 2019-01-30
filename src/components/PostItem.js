import React from 'react';
import { setActivePost } from '../store/updaters';

export default function PostItem({ metadata: { title } }, index) {
  return (
    <div className="post-item" onClick={() => setActivePost(index)}>
      <div
        className="image"
        style={{
          backgroundImage: `url('//picsum.photos/200?random&t=${Math.random()}')`
        }}
      />
      <div className="title">{title}</div>
      <div className="blurb">
        Dolore nisi eiusmod adipisicing sint quis aliqua dolor cillum et sit
        aliqua.
      </div>
      <div className="date">Jan 30, 2019</div>
    </div>
  );
}
