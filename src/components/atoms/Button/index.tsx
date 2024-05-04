'use client';

export interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => (
  <div>Component Button {children}</div>
);

export default Button;
