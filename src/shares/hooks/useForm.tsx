import { yupResolver } from '@hookform/resolvers/yup';
import { useRef, useState } from 'react';
import {
  FieldError,
  FieldValues,
  Path,
  useForm as useFormApp,
  UseFormProps,
} from 'react-hook-form';
import * as yup from 'yup';

interface UseFormAppProps<T extends FieldValues = any>
  extends Pick<UseFormProps<T>, 'defaultValues'> {
  schema?: yup.ObjectSchema<T> | yup.AnyObjectSchema;
}

export const useForm = <T extends FieldValues = any>({
  schema,
  defaultValues,
  ...props
}: UseFormAppProps<T>) => {
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const methods = useFormApp<T>({
    ...(schema && { resolver: yupResolver(schema) }),
    mode: 'onSubmit',
    shouldUnregister: true,
    defaultValues,
    ...props,
  });

  const onFormRefSubmit = () => {
    if (formRef) {
      formRef?.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onFormEmpty = (keyExcludes?: string[]) => {
    const values = methods.watch();
    return Object.entries(values).every(([key, value]) => {
      if (keyExcludes?.length && keyExcludes?.includes(key)) {
        return true; // Skip this key
      }
      return value === '' || value === null || value === undefined;
    });
  };

  const setError = (name: Path<T>, message: string) => {
    methods.setError(name, { type: 'custom', message });
  };

  const {
    isLoading,
    isSubmitting,
    isValidating,
    isDirty,
    isValid,
    isSubmitted,
    disabled,
  } = methods.formState;

  const loading = isLoading || isValidating || isSubmitting || submitting;
  const isDisabled =
    disabled || loading || (!isDirty && !isValid && isSubmitted);
  const hasErrors = isDirty && !isValid && isSubmitted && !isSubmitting;
  const isFormChanged = methods?.formState?.isDirty;

  const errorMessage =
    (Object.values(methods?.formState?.errors)?.[0] as FieldError) || undefined;

  return {
    methods,
    disabled: isDisabled || hasErrors,
    isLoading: loading,
    formRef,
    errorMessage,
    isFormChanged,
    onFormRefSubmit,
    onFormEmpty,
    setSubmitting,
    setError,
  };
};
