import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FieldProps<T extends React.ElementType> = {
  component: T;
  name: string;
  inputRef?: any;
  directive?: boolean;
} & React.ComponentProps<T>;

const Field = <T extends React.ElementType>({
  inputRef,
  component: Component,
  name,
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
          <Component
            {...props}
            {...field}
            ref={(input: React.ReactElement) => {
              ref(input);

              if (inputRef) {
                inputRef.current = input;
              }
            }}
            onChange={(evt: React.ChangeEvent) => {
              onFieldControllerChange?.(evt);
              onChange?.(evt);
            }}
            {...(error ? { error: !!error, helperText: error.message } : {})}
          />
        );
      }}
    />
  );
};

export default Field;
