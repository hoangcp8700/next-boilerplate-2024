import { FormControl, FormLabel } from '@chakra-ui/react';
import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage as FormErrorMessage } from '@hookform/error-message';

type FieldProps<T extends React.ElementType> = {
  component: T;
  name: string;
  label?: string;
  inputRef?: Ref<HTMLInputElement>;
  isRequired?: boolean;
  isReadOnly?: boolean;
} & React.ComponentProps<T>;

const Field = <T extends React.ElementType>({
  inputRef,
  component: Component,
  isReadOnly,
  isRequired,
  name,
  label,
  onChange,
  ...props
}: FieldProps<T>) => {
  const { control, formState } = useFormContext();
  const { errors } = formState;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, onChange: onFieldControllerChange, ...field },
      }) => {
        return (
          <>
            <FormControl
              isReadOnly={isReadOnly}
              isRequired={isRequired}
              isInvalid={!!errors[name]}
            >
              {label && <FormLabel>{label}</FormLabel>}
              <Component
                {...props}
                {...field}
                ref={(input: React.ReactElement) => {
                  ref(input);

                  if (inputRef) {
                    inputRef.current = input;
                  }
                }}
                onChange={(evt: React.ChangeEvent, ...rest: any) => {
                  onFieldControllerChange?.(evt);
                  if (rest.length > 0) {
                    onChange?.(evt, ...rest);
                  } else {
                    onChange?.(evt);
                  }
                }}
              />

              <FormErrorMessage
                name={name}
                errors={errors}
                render={({ message }) => {
                  return <p className="text-sm text-red-500">{message}</p>;
                }}
              />
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default Field;
