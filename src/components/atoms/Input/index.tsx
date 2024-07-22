import {
  Input as InputApp,
  InputProps as InputAppProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

export interface InputProps extends InputAppProps {}

const InputRef: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type = 'text', value, ...props },
  ref,
) => (
  <InputApp
    ref={ref}
    type={type}
    value={value || ''}
    focusBorderColor="transparent"
    {...props}
  />
);

export const Input = forwardRef(InputRef);
