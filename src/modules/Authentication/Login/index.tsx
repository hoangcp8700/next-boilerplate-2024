'use client';

import React from 'react';
import * as yup from 'yup';
import { Icon, Stack } from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa';

import { Form, InputGroup, PasswordInput } from '@/components';
import { useForm } from '@/shares/hooks/useForm';
import { buildStringRequired } from '@/shares/utils/yup';
import useAuth from '@/shares/hooks/useAuth';

const schema = yup.object().shape({
  userName: buildStringRequired('UserName'),
  password: buildStringRequired('Password'),
});

const LoginView = () => {
  const { handleLogin } = useAuth();
  const { methods } = useForm({
    schema,
    defaultValues: { userName: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    await handleLogin(data);
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
          name="userName"
          label="UserName"
          placeholder="Enter your username"
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
