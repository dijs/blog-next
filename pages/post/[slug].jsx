import buildPosts from '../../scripts/build-posts';
import PostContainer from '../../components/PostContainer';

export default function Post({
  metadata: { title = '', date = '', blurb = '' } = {},
  content,
  slug,
  number,
}) {
  return (
    <PostContainer
      metadata={{ title, date, blurb }}
      content={content}
      slug={slug}
      number={number}
    />
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
    paths: buildPosts()
      .filter(({ isStaticRoute }) => !isStaticRoute)
      .map(({ slug }) => ({
        params: {
          slug,
        },
      })),
    fallback: false,
  };
}
