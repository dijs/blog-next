const fs = require('fs');
const path = require('path');

const dir = 'build/post';
const posts = fs.readdirSync(dir).filter(name => name.endsWith('html'));

for (const post of posts) {
	const base = path.basename(post, '.html');
	try {
		fs.mkdirSync(`${dir}/${base}`);
	} catch (e) {
		console.log(e.message);
	}
	fs.renameSync(`${dir}/${post}`, `${dir}/${base}/index.html`);
}

console.log('Done');
