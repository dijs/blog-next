import Link from 'next/link';

export default function PostItem({
  metadata: { title = '', blurb = '', date = '' },
  path = ''
}) {
  return (
    <Link href={path}>
      <a className="post-item">
        <div className="title">{title}</div>
        <div className="blurb">{blurb}</div>
        <div className="date">{date}</div>
      </a>
    </Link>
  );
}
