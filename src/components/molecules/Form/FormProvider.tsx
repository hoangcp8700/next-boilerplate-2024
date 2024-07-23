/* eslint-disable react/display-name */
import React, { Ref, forwardRef, useEffect, useId } from 'react';
import {
  DefaultValues,
  FieldValues,
  FormProvider as FormProviderApp,
  UseFormProps,
  UseFormReturn,
  useForm as useRHForm,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { logger } from '@/libs/logger';

export interface FormProps<T extends FieldValues>
  extends Pick<UseFormProps<T>, 'mode'> {
  defaultValues?: DefaultValues<T>;
  schema?: yup.AnyObjectSchema;
  children: React.ReactNode;
  className?: string;
  onSubmit?: (
    values: T,
    defaultValues?: DefaultValues<T>,
    methods?: UseFormReturn<T>,
  ) => Promise<void> | void;
  onReset?: () => void;
}

const FormProvider = forwardRef<HTMLFormElement, FormProps<any>>(
  <T extends FieldValues = any>(
    props: FormProps<T>,
    ref: Ref<HTMLFormElement>,
  ) => {
    const {
      onSubmit,
      onReset,
      children,
      className,
      schema,
      mode,
      defaultValues,
    } = props;

    const id = useId();
    const methods = useRHForm<T>({
      ...(schema && { resolver: yupResolver(schema) }),
      mode: mode || 'onSubmit',
      shouldUnregister: true,
      defaultValues,
      ...props,
    });

    useEffect(() => {
      // Don't reset if dirty
      if (defaultValues && !methods.formState.isDirty) {
        methods.reset(defaultValues);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [methods.reset, JSON.stringify(defaultValues)]);

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
          try {
            if (onSubmit) {
              await onSubmit(values, defaultValues, methods);
            }
          } catch (err) {
            logger.warn('onSubmit is not a function or not provided');
            // Do nothing
          }
        })(evt);
      } catch (error) {
        logger.error(' ~ form error:', error);
      }
    };

    return (
      <FormProviderApp {...methods}>
        <form
          id={id}
          ref={ref}
          onSubmit={handleSubmit}
          onReset={onReset}
          className={className}
        >
          {children}
        </form>
      </FormProviderApp>
    );
  },
);

export default FormProvider;
