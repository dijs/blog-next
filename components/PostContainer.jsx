import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Script from 'next/script';
import rehypeRaw from 'rehype-raw';

import Header from './Header';
import Back from './Back';

export default function PostContainer({
  metadata: { title = '', date = '', blurb = '' } = {},
  content,
  slug,
  number,
  children,
  skipMathJax = false,
}) {
  useEffect(() => {
    if (skipMathJax) return;

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
        <meta property="og:image" content="/avatar.png" />
        <meta name="description" content={blurb} />
        <link href="/avatar.png" rel="shortcut icon" />
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
        {content && (
          <main className="content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />
          </main>
        )}
        {children}
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
