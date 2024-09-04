'use client';

import { Container, Heading, Link, Text } from '@/components';
import { RouterName } from '@/shares/constants';

export default function NotFound() {
  return (
    <Container className="flex-col-center">
      <Heading>Not Found This User</Heading>
      <Text>Could not find requested resource</Text>
      <Link href={RouterName.users}>Return Users</Link>
    </Container>
  );
}
