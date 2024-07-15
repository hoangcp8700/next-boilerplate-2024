'use client';

import React, { PropsWithChildren } from 'react';
import { ChakraProvider as ChakraProviderApp } from '@chakra-ui/react';

export const ChakraProvider = ({ children }: PropsWithChildren) => {
  return <ChakraProviderApp>{children}</ChakraProviderApp>;
};
