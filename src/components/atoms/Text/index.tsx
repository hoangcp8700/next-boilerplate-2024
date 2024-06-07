'use client';

import clsx from 'clsx';

interface TextProps {
  type?: 'p' | 'span' | 'div';
  content?: string;
  children?: React.ReactNode;
  className?: string;
}
export const Text = ({
  type = 'p',
  children,
  content,
  className,
}: TextProps) => {
  const Element = type;

  return content ? (
    <Element
      className={clsx('duration-300 ease-in-out', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <Element className={clsx('duration-300 ease-in-out', className)}>
      {children}
    </Element>
  );
};
