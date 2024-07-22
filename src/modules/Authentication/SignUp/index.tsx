'use client';

import React from 'react';
import * as yup from 'yup';
import { Icon, Stack } from '@chakra-ui/react';
import { FaMailBulk, FaPhone, FaUserAlt } from 'react-icons/fa';

import { Form, InputGroup, PasswordInput } from '@/components';
import { useForm } from '@/shares/hooks/useForm';
import {
  buildConfirmRef,
  buildEmailRequired,
  buildPhoneRequire,
  buildStringMinMaxRequired,
  buildStringRequired,
} from '@/shares/utils/yup';
import useAuth from '@/shares/hooks/useAuth';
import { SignUpPayloads } from '@/libs/redux';
import { logger } from '@/libs/logger';

const schema = yup.object().shape({
  email: buildEmailRequired('Email'),
  phone: buildPhoneRequire('Phone'),
  userName: buildStringRequired('UserName'),
  password: buildStringMinMaxRequired('Password'),
  confirmPassword: buildConfirmRef(
    'Confirm Password',
    'password',
    'Confirm Password not matching',
  ),
});

const initialize = {
  email: '',
  userName: '',
  password: '',
  confirmPassword: '',
};

const SignUpView = () => {
  const { handleSignUp } = useAuth();
  const { methods } = useForm({
    schema,
    defaultValues: initialize,
  });

  const onSubmit = async (data: SignUpPayloads) => {
    try {
      await handleSignUp(data);
    } catch (error) {
      logger.error('Fail to sign up', error);
    }
  };

  return (
    <Form onSubmit={onSubmit} methods={methods}>
      <Stack
        maxW="768px"
        spacing={4}
        mx="auto"
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        <Form.Field
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email address"
          component={InputGroup}
          leftElement={{
            children: <Icon as={FaMailBulk} color="gray.300" />,
          }}
        />

        <Form.Field
          name="userName"
          label="UserName"
          placeholder="Enter your username"
          component={InputGroup}
          leftElement={{
            children: <Icon as={FaUserAlt} color="gray.300" />,
          }}
        />

        <Form.Field
          name="phone"
          label="Phone"
          type="number"
          placeholder="+84 000-000-000"
          component={InputGroup}
          leftElement={{
            children: <Icon as={FaPhone} color="gray.300" />,
          }}
        />

        <Form.Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          component={PasswordInput}
        />

        <Form.Field
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter your confirm password"
          component={PasswordInput}
        />

        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Stack>
    </Form>
  );
};

export default SignUpView;
