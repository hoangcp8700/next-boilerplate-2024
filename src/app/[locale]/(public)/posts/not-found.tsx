'use client';

import Link from '@/components/atoms/Link';
import { RouterName } from '@/shares/constants/router';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found This Post</h2>
      <p>Could not find requested resource</p>
      <Link href={RouterName.posts}>Return Posts</Link>
    </div>
  );
}
