import React from 'react';
import { collect } from 'react-recollect';
import posts from './posts';
import PostItem from './components/PostItem';
import Post from './components/Post';
import { back } from './store/updaters';

function App({ store: { activePostIndex } }) {
  return (
    <div>
      <div className="header">
        <span>Blog.</span>
        <div className="back" onClick={() => back()}>
          Back (implement with history)
        </div>
      </div>
      {activePostIndex !== undefined ? (
        <Post {...posts[activePostIndex]} />
      ) : (
        <div className="posts">{posts.map(PostItem)}</div>
      )}
    </div>
  );
}

export default collect(App);
