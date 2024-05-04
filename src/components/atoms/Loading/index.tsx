'use client';

export interface LoadingProps {
  children: React.ReactNode;
}

const Loading = ({ children }: LoadingProps) => (
  <div>Component Loading {children}</div>
);

export default Loading;
