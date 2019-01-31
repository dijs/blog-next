import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export default function Back({ active }) {
  return (
    <Link to="/">
      <i
        className={classnames('fas fa-caret-left', {
          active
        })}
      />
    </Link>
  );
}
