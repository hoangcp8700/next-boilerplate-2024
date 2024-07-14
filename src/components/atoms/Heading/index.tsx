'use client';

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
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
      {...props}
    />
  ) : (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
};
