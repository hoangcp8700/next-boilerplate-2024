'use client';

import React from 'react';

export interface PullDownProps {
  children: React.ReactNode;
}

export const PullDown = ({ children }: PullDownProps) => (
  <div>Component PullDown {children}</div>
);
