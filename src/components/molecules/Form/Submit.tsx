import { ElementType, ComponentProps } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { Button } from '@/components/atoms';

type SubmitButtonProps<T extends ElementType> = ComponentProps<T> & {
  as: T;
};
const SubmitButton = <T extends ElementType>({
  as = Button,
  children,
  loading,
  disabled: buttonDisabled,
  ...props
}: SubmitButtonProps<T>) => {
  const { control } = useFormContext();
  const {
    isLoading,
    isSubmitting,
    isValidating,
    isDirty,
    isValid,
    isSubmitted,
    disabled,
  } = useFormState({
    control,
  });
  const loadingValue = [loading, isLoading, isSubmitting, isValidating].some(
    Boolean,
  );

  const isDisabled =
    disabled ||
    isSubmitting ||
    (!isDirty && !isValid && isSubmitted) ||
    buttonDisabled;
  const hasErrors = isDirty && !isValid && isSubmitted && !isSubmitting;

  const Component = as;

  return (
    <Component
      isLoading={loadingValue}
      isDisabled={isDisabled || hasErrors}
      type="submit"
      {...props}
    >
      {children}
    </Component>
  );
};

export default SubmitButton;
