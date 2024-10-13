import { useEffect } from 'react';
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
  number,
}) {
  useEffect(() => {
    // Add MathJax config and script only on client-side after hydration
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      window.MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\[', '\\]']]
        },
        loader: { load: ['input/tex', 'output/chtml'] }
      };
    `;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.type = 'text/javascript';
    script2.id = 'MathJax-script';
    script2.async = true;
    script2.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js';
    document.head.appendChild(script2);

    return () => {
      // Clean up the scripts if the component unmounts
      document.head.removeChild(script);
      document.head.removeChild(script2);
    };
  }, []);

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
          <h1>
            <span className="number">#{number} </span>
            {title}
          </h1>
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
  const posts = buildPosts();
  const index = posts.findIndex((p) => p.slug === ctx.params.slug);
  const props = posts[index];
  return {
    props: {
      ...props,
      number: posts.length - index,
    },
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
