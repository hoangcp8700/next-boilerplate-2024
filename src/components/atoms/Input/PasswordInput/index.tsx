'use client';

import { forwardRef, useState } from 'react';
import {
  Icon,
  IconButton,
  InputLeftElementProps,
  InputRightElementProps,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

import { InputProps } from '..';
import { InputGroup } from '../InputGroup';

export interface PasswordInputProps extends InputProps {
  leftElement?: InputLeftElementProps;
  rightElement?: InputRightElementProps;
}

const PasswordInputRef: React.ForwardRefRenderFunction<
  HTMLInputElement,
  PasswordInputProps
> = (inputProps, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <InputGroup
      leftElement={{
        pointerEvents: 'none',
        color: 'gray.300',
        children: <Icon as={FaLock} color="gray.300" />,
      }}
      rightElement={{
        padding: 0,
        children: (
          <IconButton
            onClick={handleShowClick}
            aria-label="Search database"
            icon={showPassword ? <FaEyeSlash /> : <FaEye />}
          />
        ),
      }}
      type={showPassword ? 'text' : 'password'}
      ref={ref}
      {...inputProps}
    ></InputGroup>
  );
};

export const PasswordInput = forwardRef(PasswordInputRef);
