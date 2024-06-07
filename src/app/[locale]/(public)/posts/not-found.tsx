'use client';

import { Container, Heading, Link, Text } from '@/components';
import { RouterName } from '@/shares/constants/router';

export default function NotFound() {
  return (
    <Container className="flex-col-center">
      <Heading>Not Found This Post</Heading>
      <Text>Could not find requested resource</Text>
      <Link href={RouterName.posts}>Return Posts</Link>
    </Container>
  );
}
