'use client';

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
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <Element className={className}>{children}</Element>
  );
};
