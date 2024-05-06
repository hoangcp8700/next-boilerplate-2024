---
to: src/components/<%= level %>/<%= h.changeCase.pascalCase(name) %>/index.tsx
---
'use client';

export interface <%= h.changeCase.pascalCase(name) %>Props {
  children?: React.ReactNode;
}

const <%= h.changeCase.pascalCase(name) %> = ({ children }: <%= h.changeCase.pascalCase(name) %>Props) => (
  <div>Component <%= h.changeCase.pascalCase(name) %> {children}</div>
);

export default <%= h.changeCase.pascalCase(name) %>;
