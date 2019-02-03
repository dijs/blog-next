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
      <Helmet>
        <title>Richard van der Dys | Blog</title>
        <meta property="og:url" content="https://blog.richardvanderdys.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Richard van der Dys | Blog" />
        <meta
          property="og:description"
          content="Collection of posts about my personal development"
        />
      </Helmet>

      <Header />
      <PostList posts={posts} />
    </div>
  );
}
