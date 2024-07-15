import React, { Ref } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FieldProps<T extends React.ElementType> = {
  component: T;
  name: string;
  label?: string;
  inputRef?: Ref<HTMLInputElement>;
} & React.ComponentProps<T>;

const Field = <T extends React.ElementType>({
  inputRef,
  component: Component,
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
            {label && <span>{label}</span>}
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
            {error && <p>{error.message}</p>}
          </>
        );
      }}
    />
  );
};

export default Field;
