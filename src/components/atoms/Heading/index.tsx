'use client';

import clsx from 'clsx';
import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content?: string;
  children?: React.ReactNode;
  className?: string;
}
export const Heading: React.FC<HeadingProps> = ({
  type = 'h2',
  children,
  content,
  className,
  ...props
}) => {
  const Element = type;

  return content ? (
    <Element
      className={clsx('duration-300 ease-in-out', className)}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  ) : (
    <Element className={clsx('duration-300 ease-in-out', className)} {...props}>
      {children}
    </Element>
  );
};
