import raw from 'raw.macro';
import metadataParser from 'parse-md';
import dateFns from 'date-fns';

const slug = text =>
  text
    .toLowerCase()
    .replace(/\//, '-')
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -

export default [
  raw('github-pages-static-routing.md'),
  raw('new-blog-2019.md'),
  raw('loomis-head-study.md'),
  raw('ares-game-part-1.md'),
  raw('random-sentences.md'),
  raw('trees.md'),
  raw('css-animation.md'),
  raw('log-with-comments.md'),
  raw('reading-list.md'),
  raw('vacbot-part-1.md'),
  raw('flashcards.md'),
  raw('mint-fi.md'),
  raw('self-learning-game-mk1.md'),
  raw('workflow.md'),
  raw('functional.md'),
  raw('mutation-testing-in-javascript.md'),
  raw('starters.md'),
  raw('yet-another-container-presenter-pattern.md'),
  raw('homemade-thing-recognizer.md'),
  raw('panhandling.md'),
  raw('stupid-mario.md'),
  raw('hotspots.md'),
  raw('parsz.md'),
  raw('text-analysis-with-react.md'),
  raw('hue-beats.md'),
  raw('pivotal-charts.md'),
  raw('the-middleman.md')
]
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
