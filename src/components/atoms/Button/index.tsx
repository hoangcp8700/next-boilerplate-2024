import React from 'react';
// import styles from "./button.module.css";

export interface ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => (
  <div>Component Button {children}</div>
);

export default Button;
