import React from 'react';
import classnames from 'classnames';
import posts from './posts';
import PostItem from './components/PostItem';
import Post from './components/Post';
import withStore from './components/withStore';

function App({ activePostIndex, back, setActivePost }) {
  return (
    <div>
      <div className="header">
        <i
          className={classnames('fas fa-caret-left', {
            active: activePostIndex !== undefined
          })}
          onClick={() => back()}
        />
        Blog.
      </div>
      {activePostIndex !== undefined ? (
        <Post {...posts[activePostIndex]} />
      ) : (
        <div className="posts">
          {posts.map((post, index) => (
            <PostItem
              key={index}
              {...post}
              setActivePost={() => setActivePost(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default withStore(App);
