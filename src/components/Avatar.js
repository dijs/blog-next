import React from 'react';
import { ReactComponent as Head } from '../images/avatar.svg';

export default function Avatar() {
	return (
		<div className="avatar">
			<div className="note-wrapper n1">
				<div className="note">♫</div>
			</div>
			<div className="note-wrapper n2">
				<div className="note">♪</div>
			</div>
			<div className="note-wrapper n3">
				<div className="note">♫</div>
			</div>
			<div className="note-wrapper n4">
				<div className="note">♪</div>
			</div>
			<Head />
		</div>
	);
}
