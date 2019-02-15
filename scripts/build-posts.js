const fs = require('fs');
const path = require('path');
const metadataParser = require('parse-md').default;
const dateFns = require('date-fns');

const slug = text =>
  text
    .toLowerCase()
    .replace(/\//, '-')
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -

const rawPosts = fs
  .readdirSync('./posts')
  .map(name => fs.readFileSync(path.join('./posts', name), 'utf8'));

const posts = rawPosts
  .map(source => metadataParser(source))
  .filter(({ metadata: { published } }) => published)
  .map(post => {
    post.metadata.date = new Date(post.metadata.date);
    return post;
  })
  .sort((a, b) => +b.metadata.date - +a.metadata.date)
  .map((post, index) => {
    if (!post.metadata.blurb) post.metadata.blurb = 'Write something here!';
    post.metadata.date = dateFns.format(post.metadata.date, 'MMM D, YYYY');
    post.slug = slug(post.metadata.title);
    post.index = index;
    post.path = `/post/${post.slug}`;
    return post;
  });

fs.writeFileSync('./src/posts.json', JSON.stringify(posts, null, 3));
