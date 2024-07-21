'use client';

import * as yup from 'yup';

import { useForm } from '@/shares/hooks/useForm';
import { Input } from '@/components/atoms';

import { Form } from '.';

interface TypeProps {
  test?: string;
}
const schema = yup.object().shape({
  test: yup.string().required(),
});

const Test = () => {
  const { methods } = useForm<TypeProps>({
    schema,
    defaultValues: { test: '' }, // !IMPORTANT
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
      <Form.Field name="test" label="Test" component={Input} />
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
export default Test;
