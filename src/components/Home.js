import React from 'react';
import Helmet from 'react-helmet';
import posts from '../posts';
import PostItem from './PostItem';
import Header from './Header';

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
      <Header />
      <PostList posts={posts} />
    </div>
  );
}
