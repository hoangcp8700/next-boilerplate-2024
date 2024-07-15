'use client';

import React from 'react';
import * as yup from 'yup';

import { Form, Input } from '@/components';
import { useForm } from '@/shares/hooks/useForm';

const schema = yup.object().shape({
  userName: yup.string().required(),
});

const LoginView = () => {
  const { methods } = useForm({
    schema,
    defaultValues: { userName: '' },
  });

  const onSubmit = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Form onSubmit={onSubmit} methods={methods}>
          <Form.Field name="userName" label="UserName" component={Input} />
          <Form.SubmitButton>Submit</Form.SubmitButton>
        </Form>
      </div>
    </main>
  );
};

export default LoginView;
