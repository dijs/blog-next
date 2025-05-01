import Link from 'next/link';
import Github from './vectors/github.svg';
import LinkedIn from './vectors/linkedin.svg';
import Npm from './vectors/npm.svg';
import Logo from './vectors/logo.svg';
import Back from './Back';
import Avatar from './Avatar';
import project from '../package.json';
import Search from './Search';

export default function Header({ showBack, searchValue, onSearchChange }) {
  return (
    <header className="header" data-version={project.version}>
      <Avatar />
      <Link href="/" legacyBehavior>
        <a className="logo">
          <Logo />
        </a>
      </Link>
      <div className="bottom">
        {showBack ? (
          <Back />
        ) : (
          <Search value={searchValue} onChange={onSearchChange} />
        )}
        <div className="social">
          <a
            href="https://github.com/dijs"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Github className="icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/dijs"
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
