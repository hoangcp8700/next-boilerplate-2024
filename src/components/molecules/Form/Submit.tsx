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
  ...props
}: SubmitButtonProps<T>) => {
  const { control } = useFormContext();
  const { isLoading, isSubmitting, isValidating } = useFormState({
    control,
  });
  const loadingValue = [loading, isLoading, isSubmitting, isValidating].some(
    Boolean,
  );

  const Component = as;

  return (
    <Component loading={loadingValue} type="submit" {...props}>
      {children}
    </Component>
  );
};

export default SubmitButton;
