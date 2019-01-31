import React from 'react';
import Helmet from 'react-helmet';
import posts from '../posts';
import PostItem from './PostItem';
import Back from './Back';

function PostList({ posts }) {
  return (
    <div className="posts">
      {posts.map(post => (
        <PostItem key={post.slug} {...post} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <Helmet title="Richard van der Dys | Blog" />
      <div className="header">
        <Back />
        Blog.
      </div>
      <PostList posts={posts} />
    </div>
  );
}
