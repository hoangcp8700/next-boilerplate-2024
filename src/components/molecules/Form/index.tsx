/* eslint-disable @typescript-eslint/no-shadow */
'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  ForwardedRef,
  forwardRef,
  useId,
  useImperativeHandle,
} from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import * as yup from 'yup';

import { withProperties } from '@/shares/utils/widthProperties';
import { capitalizeFirstLetter } from '@/shares/utils/string';

import Field from './Field';
import SubmitButton from './Submit';

export interface FormProps<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver' | 'defaultValues'> {
  onSubmit: SubmitHandler<T>;
  onSubmitError?: SubmitErrorHandler<T>;
  children:
    | (({ method }: { method: UseFormReturn<T> }) => React.ReactNode)
    | React.ReactNode;
  className?: string;
  defaultValues?: DefaultValues<T>;
  validationSchema?: yup.ObjectSchema<T> | yup.AnyObjectSchema;
  formName?: string;
  ref?: ForwardedRef<UseFormReturn<T>>;
}
interface WithForwardRefType<U extends FieldValues>
  extends React.FC<FormProps<U>> {
  <T extends FieldValues>(
    props: FormProps<T>,
  ): ReturnType<React.FC<FormProps<T>>>;
}
yup.setLocale({
  mixed: {
    required: ({ path }) => `${capitalizeFirstLetter(path)} is required`,
  },
});

// eslint-disable-next-line react/display-name
const FormRef: WithForwardRefType<FieldValues> = forwardRef<
  UseFormReturn<FieldValues>,
  FormProps<FieldValues>
>(
  <T extends FieldValues>(
    props: FormProps<T>,
    ref: ForwardedRef<UseFormReturn<T>>,
  ) => {
    const {
      onSubmit,
      children,
      onSubmitError,
      className,
      validationSchema,
      mode = 'onChange',
      formName,
      defaultValues,
      ...formProps
    } = props;

    const methods = useForm<T>({
      resolver: validationSchema && yupResolver(validationSchema),
      mode,
      // shouldUnregister: true: reduce the number of render times
      // https://codesandbox.io/p/sandbox/dynamic-radio-example-forked-et0wi?file=%2Fsrc%2FApp.tsx%3A32%2C8-32%2C20
      shouldUnregister: true,
      defaultValues: defaultValues,
      ...formProps,
    });

    const id = useId();

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
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
    };

    useImperativeHandle(ref, () => methods, [methods]);

    return (
      <FormProvider {...methods}>
        <form
          id={id}
          name={formName}
          onSubmit={handleSubmit}
          className={className}
          noValidate
        >
          {typeof children === 'function'
            ? children({ method: methods })
            : children}
        </form>
      </FormProvider>
    );
  },
) as WithForwardRefType<FieldValues>;

const Form = withProperties(FormRef, {
  Field,
  SubmitButton,
  // HelperText: FormHelperText,
});

export default Form;
