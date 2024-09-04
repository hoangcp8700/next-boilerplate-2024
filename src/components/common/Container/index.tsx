/* eslint-disable prettier/prettier */
'use client';

import clsx from 'clsx';

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container = ({ className, children }: ContainerProps) => (
  <div
    className={clsx('mx-auto w-full max-w-screen-8xl px-4 sm:px-6', className)}
  >
    {children}
  </div>
);
