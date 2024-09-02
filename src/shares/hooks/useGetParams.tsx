import { useSearchParams } from 'next/navigation';

// Custom hook to get all query parameters
export function useAllQueryParams() {
  const searchParams = useSearchParams();
  return Object.fromEntries(searchParams.entries());
}

// Custom hook to get a specific query parameter
export function useQueryParam(paramName: string) {
  const searchParams = useSearchParams();
  return searchParams.get(paramName);
}
