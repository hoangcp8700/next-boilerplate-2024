'use client';

import { LinkI18n, LinkI18nInterface } from '@/libs/i18nNavigation';

export interface LinkProps extends LinkI18nInterface {
  children: React.ReactNode;
}

const Link = ({ children, href, ...props }: LinkProps) => (
  <LinkI18n href={href} {...props}>
    {children}
  </LinkI18n>
);

export default Link;
