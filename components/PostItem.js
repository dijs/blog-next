import Link from 'next/link';

export default function PostItem({
  metadata: { title = '', blurb = '', date = '' },
  path = '',
  number = 0,
}) {
  return (
    <Link href={path} legacyBehavior>
      <a className="post-item">
        <div className="title">
          <span className="number">#{number} </span>
          {title}
        </div>
        <div className="blurb">{blurb}</div>
        <div className="date">{date}</div>
      </a>
    </Link>
  );
}
