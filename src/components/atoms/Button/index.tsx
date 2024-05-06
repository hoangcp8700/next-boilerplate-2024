'use client';

export interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => (
  <button>Component Button {children}</button>
);

export default Button;
