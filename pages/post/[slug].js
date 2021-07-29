import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Header from '../../components/Header';
import Back from '../../components/Back';
import buildPosts from '../../scripts/build-posts';

export default function Post({
  metadata: { title = '', date = '', blurb = '' } = {},
  content,
  slug
}) {
  useEffect(() => {
    window.disqus_config = function() {
      this.page.url = `https://blog.richardvanderdys.com/post/${slug}`; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = slug; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    (function() {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement('script');
      s.src = 'https://dijs-blog.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    })();
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
          <h1>{title}</h1>
          <div className="date">{date}</div>
        </aside>
        <main className="content">
          <ReactMarkdown source={content} escapeHtml={false} />
        </main>
        <div id="disqus_thread"></div>
      </article>
      <Back />
    </div>
  );
}

export async function getStaticProps(ctx) {
  const props = buildPosts().find(p => p.slug === ctx.params.slug);
  return {
    props
  };
}

export async function getStaticPaths() {
  return {
    paths: buildPosts().map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: false
  };
}
