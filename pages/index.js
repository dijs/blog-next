import Head from 'next/head';
import PostItem from '../components/PostItem';
import Header from '../components/Header';
import buildPosts from '../scripts/build-posts';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Richard van der Dys | Blog</title>
        <meta property="og:url" content="https://blog.richardvanderdys.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Richard van der Dys | Blog" />
        <meta
          property="og:description"
          content="Collection of posts about my personal development"
        />
        <link href="/favicon.png" rel="shortcut icon" />
        <meta
          name="description"
          content="Collection of posts about my personal development"
        />
      </Head>
      <Header />
      <nav className="posts">
        {posts.map((post, index, arr) => (
          <PostItem key={post.slug} {...post} number={arr.length - index} />
        ))}
      </nav>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: buildPosts(),
    },
  };
}
