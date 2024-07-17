import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

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
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, onChange: onFieldControllerChange, ...field },
        fieldState: { error },
      }) => {
        return (
          <>
            <FormControl
              isReadOnly={isReadOnly}
              isRequired={isRequired}
              isInvalid={!!error}
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
                  onChange?.(evt, ...rest);
                }}
              />
              {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
            </FormControl>
          </>
        );
      }}
    />
  );
};

export default Field;
