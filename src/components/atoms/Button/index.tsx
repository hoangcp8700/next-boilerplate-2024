'use client';

import {
  Button as ButtonApp,
  ButtonProps as ButtonAppProps,
} from '@chakra-ui/react';

export interface ButtonProps extends ButtonAppProps {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => (
  <ButtonApp {...props}>{children}</ButtonApp>
);
