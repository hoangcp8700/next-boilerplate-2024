'use client';

export interface InputProps {
  children?: React.ReactNode;
  label?: string;
}

export const Input = ({ children }: InputProps) => (
  <div>Component Input {children}</div>
);
