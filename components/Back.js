import Link from 'next/link';

export default function Back() {
  return (
    <Link href="/" legacyBehavior>
      <a className="back">Back to all posts</a>
    </Link>
  );
}
