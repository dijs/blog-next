import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.svg';
import { ReactComponent as Github } from '../images/github.svg';

export default function Header() {
	return (
		<div className="header">
			<div className="avatar">
				<img src={avatar} alt="avatar" />
			</div>
			<Link to="/" className="title">
				<span className="a">dijs</span>
				<span className="b">talks</span>
			</Link>
			<div className="social">
				<span>Find me on</span>
				<a
					href="https://github.com/dijs"
					rel="noopener noreferrer"
					target="_blank"
				>
					<Github className="github" />
				</a>
			</div>
		</div>
	);
}
