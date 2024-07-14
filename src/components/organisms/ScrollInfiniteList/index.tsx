'use client';

import { Loading } from '@/components/atoms';
import useScrollInfinite from '@/shares/hooks/useScrollInfinite';

interface ScrollInfiniteListProps {
  loading?: boolean;
  loadingComponent?: JSX.Element;
  className?: string;
  children: React.ReactNode;
  onLoadMore?: () => void;
  noItem?: () => JSX.Element | string | null;
}

const ScrollInfiniteList: React.FC<ScrollInfiniteListProps> = ({
  children,
  loading,
  className,
  loadingComponent,
  noItem,
  onLoadMore,
}) => {
  const { setNode } = useScrollInfinite(onLoadMore);

  return (
    <div className={className}>
      {children}

      {(loading && loadingComponent) || null}

      {loading && !loadingComponent && (
        <div className="flex-center w-full">
          <Loading />
        </div>
      )}
      {!loading && noItem && noItem()}

      {children && !loading && onLoadMore && (
        <div ref={(suggest) => setNode(suggest)} />
      )}
    </div>
  );
};

export default ScrollInfiniteList;
