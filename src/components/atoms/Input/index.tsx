'use client';

export interface InputProps {
  children?: React.ReactNode;
  label?: string;
}

const Input = ({ children }: InputProps) => (
  <div>Component Input {children}</div>
);

export default Input;
