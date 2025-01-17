'use client';

import { LinkI18n, LinkI18nInterface } from '@/i18n/i18nNavigation';

export interface LinkProps extends LinkI18nInterface {
  children: React.ReactNode;
}

export const Link = ({ children, href, ...props }: LinkProps) => (
  <LinkI18n href={href} {...props}>
    {children}
  </LinkI18n>
);
