'use client';

import React from 'react';
import * as yup from 'yup';
import { Icon, Stack } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';

import { Form, InputGroup, PasswordInput } from '@/components';
import { useForm } from '@/shares/hooks/useForm';
import { buildEmailRequired, buildStringRequired } from '@/shares/utils/yup';

const schema = yup.object().shape({
  email: buildEmailRequired('Email'),
  password: buildStringRequired('Password'),
});

const LoginView = () => {
  const { methods } = useForm({
    schema,
  });

  const onSubmit = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
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
            children: <Icon as={FaUserAlt} color="gray.300" />,
          }}
        />
        <Form.Field
          name="password"
          label="Password"
          placeholder="Enter your password"
          component={PasswordInput}
        />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Stack>
    </Form>
  );
};

export default LoginView;
