'use client';

import * as yup from 'yup';

import { Input } from '@/components/atoms';

import { Form } from '.';

const schema = yup.object().shape({
  test: yup.string().required(),
});

const Test = () => {
  const onSubmit = async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
  };

  return (
    <Form
      defaultValues={{ test: '' }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      <Form.Field name="test" component={Input} label="First Name 2" />
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
export default Test;
