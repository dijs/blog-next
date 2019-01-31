import React from 'react';
import { collect } from 'react-recollect';
import classnames from 'classnames';
import posts from './posts';
import PostItem from './components/PostItem';
import Post from './components/Post';
import { back } from './store/updaters';

function App({ store: { activePostIndex } }) {
  return (
    <div>
      <div className="header">
        <i
          class={classnames('fas fa-caret-left', {
            active: activePostIndex !== undefined
          })}
          onClick={() => back()}
        />
        Blog.
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
