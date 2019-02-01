import React from 'react';
import { Link } from 'react-router-dom';
import avatar from './avatar.svg';

export default function Header() {
  return (
    <Link to="/" className="header">
      <img src={avatar} alt="avatar" />
      Blog.
    </Link>
  );
}
