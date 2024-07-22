'use client';
import { AppProgressBar } from 'next-nprogress-bar';

export const ProgressBar = () => (
  <AppProgressBar
    height="4px"
    color="red"
    options={{ showSpinner: false }}
    shallowRouting
  />
);
