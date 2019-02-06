import React from 'react';
import { Link } from 'react-router-dom';

export default function Back() {
	return (
		<Link to="/" className="back">
			Back to all posts
		</Link>
	);
}
