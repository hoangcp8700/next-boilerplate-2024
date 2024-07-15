import {
  Input as InputApp,
  InputProps as InputAppProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

export interface InputProps extends InputAppProps {}

const InputRef: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type = 'text', ...props },
  ref,
) => <InputApp ref={ref} type={type} {...props} />;

export const Input = forwardRef(InputRef);
