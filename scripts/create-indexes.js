const fs = require('fs');
const path = require('path');

const posts = fs
	.readdirSync('build/post')
	.filter(name => name.endsWith('html'));

for (const post of posts) {
	const base = path.basename(post, '.html');
	try {
		fs.mkdirSync(`build/post/${base}`);
	} catch (e) {
		console.log(e.message);
	}
	fs.renameSync(`build/post/${post}`, `build/post/${base}/index.html`);
}

console.log('Done');
