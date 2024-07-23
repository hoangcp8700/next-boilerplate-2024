'use client';

import * as yup from 'yup';
import { useRef } from 'react';

import { Input } from '@/components/atoms';

import { Form } from '.';

const schema = yup.object().shape({
  test: yup.string().required(),
});

const defaultValues = {
  test: '',
};

const Test = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const onFormRefSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onSubmit = async (data: any): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 5000);
    });
  };

  return (
    <div>
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        schema={schema}
      >
        <Form.Field name="test" label="Test" component={Input} />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form>
      <button type="button" onClick={onFormRefSubmit}>
        Submit
      </button>
    </div>
  );
};
export default Test;
