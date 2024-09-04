'use client';

import { Container } from '@/components/common';
import { AppConfigs } from '@/shares/constants';

export const Footer = () => (
  <footer className="border-t border-gray-300 py-4 text-center text-sm">
    <Container>
      © Copyright {new Date().getFullYear()} {AppConfigs.name}. Made With{' '}
      <a
        href="https://creativedesignsguru.com"
        className="text-blue-700 hover:border-b-2 hover:border-blue-700"
      >
        CreativeDesignsGuru
      </a>
      .
      {/*
       * PLEASE READ THIS SECTION
       * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
       * The link doesn't need to appear on every pages, one link on one page is enough.
       * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
       */}
    </Container>
  </footer>
);
