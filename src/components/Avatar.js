import React, { useState } from 'react';
import classnames from 'classnames';
import { ReactComponent as Head } from '../images/avatar.svg';

export default function Avatar() {
	const [active, setActive] = useState(false);
	function activate() {
		if (active) return;
		setActive(true);
		setTimeout(() => setActive(false), 3000);
	}
	return (
		<div className={classnames('avatar', { active })}>
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
			<Head onClick={activate} onMouseOver={activate} />
		</div>
	);
}
