import { useState } from 'react';
import Head from 'next/head';
import PostItem from '../components/PostItem';
import Header from '../components/Header';
import buildPosts from '../scripts/build-posts';

export default function Home({ posts }) {
  const [searchValue, setSearchValue] = useState('');

  const filteredPosts = posts.filter((post) => {
    const { title, blurb } = post.metadata;
    const search = searchValue.toLowerCase();
    return (
      title.toLowerCase().includes(search) ||
      blurb.toLowerCase().includes(search) ||
      post.content.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <Head>
        <title>Richard van der Dys | Developer Blog</title>
        <meta property="og:url" content="https://blog.richardvanderdys.com" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="Richard van der Dys | Developer Blog"
        />
        <meta
          property="og:description"
          content="Collection of posts about my personal development"
        />
        <link href="/avatar.png" rel="shortcut icon" />
        <meta
          name="description"
          content="Collection of posts about my personal development"
        />
      </Head>
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />
      <nav className="posts">
        {filteredPosts.map((post) => (
          <PostItem key={post.slug} {...post} number={post.number} />
        ))}
      </nav>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await buildPosts();
  // Add number
  posts.forEach((post, index, arr) => {
    post.number = arr.length - index;
  });

  return {
    props: {
      posts,
    },
  };
}
