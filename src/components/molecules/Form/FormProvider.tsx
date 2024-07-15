/* eslint-disable react/display-name */
import React, { Ref, forwardRef, useId } from 'react';
import {
  FieldValues,
  FormProvider as FormProviderApp,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  onSubmit?: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<T>;
  methods: UseFormReturn<T>;
  children: React.ReactNode;
  className?: string;
  formName?: string;
}

const FormProvider = forwardRef<HTMLFormElement, FormProps<any>>(
  <T extends FieldValues = any>(
    props: FormProps<T>,
    ref: Ref<HTMLFormElement>,
  ) => {
    const { onSubmit, children, onSubmitError, className, formName, methods } =
      props;

    const id = useId();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
      try {
        if (evt) {
          if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
          }

          if (typeof evt.stopPropagation === 'function') {
            evt.stopPropagation();
          }
        }

        return methods.handleSubmit(async (values) => {
          if (typeof onSubmit === 'function') {
            await onSubmit(values, evt);
          } else {
            console.warn('onSubmit is not a function or not provided');
          }
        }, onSubmitError)(evt);
      } catch (error) {
        console.log(' ~ form error:', error);
      }
    };

    return (
      <FormProviderApp {...methods}>
        <form
          id={id}
          name={formName}
          ref={ref}
          onSubmit={handleSubmit}
          className={className}
        >
          {children}
        </form>
      </FormProviderApp>
    );
  },
);

export default FormProvider;
