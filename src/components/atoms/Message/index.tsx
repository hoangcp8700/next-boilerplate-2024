'use client';

import clsx from 'clsx';

export interface MessageProps {
  children?: React.ReactNode;
  className?: string;
}

export const Message = ({ children, className }: MessageProps) => (
  <div className={clsx('flex-center', className)}>{children}</div>
);
