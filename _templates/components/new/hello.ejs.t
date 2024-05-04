---
to: src/components/<%= level %>/<%= h.inflection.capitalize(name) %>/index.tsx
---
'use client';

export interface <%= h.inflection.capitalize(name) %>Props {
  children: React.ReactNode;
}

const <%= h.inflection.capitalize(name) %> = ({ children }: <%= h.inflection.capitalize(name) %>Props) => (
  <div>Component <%= h.inflection.capitalize(name) %> {children}</div>
);

export default <%= h.inflection.capitalize(name) %>;
