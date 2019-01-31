import raw from 'raw.macro';
import metadataParser from 'parse-md';
import moment from 'moment';

export default [
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
	raw('pan.md'),
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
	.sort((a, b) => +moment(b.metadata.date) - +moment(a.metadata.date))
	.map(post => {
		if (!post.metadata.image) post.metadata.image = '//picsum.photos/300';
		if (!post.metadata.blurb)
			post.metadata.blurb =
				'Dolore nisi eiusmod adipisicing sint quis aliqua dolor cillum et sit aliqua.';
		post.metadata.date = moment(post.metadata.date).format('MMM D, YYYY');
		return post;
	});
