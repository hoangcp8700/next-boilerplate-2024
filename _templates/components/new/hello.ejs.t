---
to: src/components/<%= level %>/<%= h.changeCase.pascalCase(name) %>/index.tsx
---
'use client';

export interface <%= h.changeCase.pascalCase(name) %>Props {
  children?: React.ReactNode;
}

export const <%= h.changeCase.pascalCase(name) %> = ({ children }: <%= h.changeCase.pascalCase(name) %>Props) => (
  <div>Component <%= h.changeCase.pascalCase(name) %> {children}</div>
);
