'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { Container, Heading } from '@/components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="flex-center flex-col">
      <Heading className="text-center">Something went wrong!</Heading>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </Container>
  );
}
