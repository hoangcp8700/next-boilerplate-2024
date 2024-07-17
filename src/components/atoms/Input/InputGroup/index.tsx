'use client';

import { forwardRef } from 'react';
import {
  InputAddonProps,
  InputGroup as InputAppGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';

import { Input, InputProps } from '..';

export interface InputGroupProps extends InputProps {
  leftElement?: InputAddonProps;
  rightElement?: InputAddonProps;
}

const InputGroupRef: React.ForwardRefRenderFunction<
  HTMLInputElement,
  InputGroupProps
> = ({ leftElement, rightElement, ...inputProps }, ref) => {
  return (
    <InputAppGroup>
      {leftElement && <InputLeftAddon {...leftElement} />}
      <Input ref={ref} {...inputProps} />
      {rightElement && <InputRightAddon {...rightElement}></InputRightAddon>}
    </InputAppGroup>
  );
};

export const InputGroup = forwardRef(InputGroupRef);
