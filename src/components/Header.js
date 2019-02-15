import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Github } from '../images/github.svg';
import { ReactComponent as LinkedIn } from '../images/linkedin.svg';
import { ReactComponent as Npm } from '../images/npm.svg';
import { ReactComponent as Logo } from '../images/logo.svg';
import Back from './Back';
import Avatar from './Avatar';

export default function Header({ showBack }) {
  return (
    <header className="header">
      <Avatar />
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="bottom">
        {showBack ? <Back /> : null}
        <div className="social">
          <a
            href="https://github.com/dijs"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/richard-van-der-dys-iii-91880a24/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedIn className="icon" />
          </a>
          <a
            href="https://npmjs.com/~dijs"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Npm className="icon" />
          </a>
        </div>
      </div>
    </header>
  );
}
