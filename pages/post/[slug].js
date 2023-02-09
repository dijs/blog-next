import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Script from 'next/script';
import rehypeRaw from 'rehype-raw';

import Header from '../../components/Header';
import Back from '../../components/Back';
import buildPosts from '../../scripts/build-posts';

export default function Post({
  metadata: { title = '', date = '', blurb = '' } = {},
  content,
  slug,
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta
          property="og:url"
          content={`https://blog.richardvanderdys.com/post/${slug}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={blurb} />
        <meta name="description" content={blurb} />
        <link href="/favicon.png" rel="shortcut icon" />
      </Head>
      <Header showBack />
      <article className="post">
        <aside className="info">
          <h1>{title}</h1>
          <div className="date">{date}</div>
        </aside>
        <main className="content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />
        </main>
        <Script
          src="https://utteranc.es/client.js"
          repo="dijs/blog-next"
          issue-term="pathname"
          theme="github-light"
          crossOrigin="anonymous"
          async
        />
      </article>
      <Back />
    </div>
  );
}

export async function getStaticProps(ctx) {
  const props = buildPosts().find((p) => p.slug === ctx.params.slug);
  return {
    props,
  };
}

export async function getStaticPaths() {
  return {
    paths: buildPosts().map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
