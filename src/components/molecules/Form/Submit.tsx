import { ElementType, ComponentProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/atoms';

type SubmitButtonProps<T extends ElementType> = ComponentProps<T> & {
  as: T;
};
const SubmitButton = <T extends ElementType>({
  as = Button,
  children,
  ...props
}: SubmitButtonProps<T>) => {
  const { formState } = useFormContext();

  const {
    isLoading,
    isSubmitting,
    isValidating,
    isDirty,
    isValid,
    isSubmitted,
    disabled,
  } = formState;

  const loadingValue = [isLoading, isSubmitting, isValidating].some(Boolean);

  const hasErrors = isDirty && !isValid && isSubmitted && !isSubmitting;

  const isDisabled =
    disabled ||
    isSubmitting ||
    (!isDirty && !isValid && isSubmitted) ||
    hasErrors;

  const Component = as;

  return (
    <Component
      isLoading={loadingValue}
      isDisabled={isDisabled}
      type="submit"
      {...props}
    >
      {children}
    </Component>
  );
};

export default SubmitButton;
