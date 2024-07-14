'use client';
import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressBar = () => (
  <AppProgressBar
    height="4px"
    color="#fafafa"
    options={{ showSpinner: false }}
    shallowRouting
  />
);
