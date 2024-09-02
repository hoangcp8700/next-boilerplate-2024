import { useEffect, useRef } from 'react';

import { hasValueChanged } from '../utils/hasValueChanged';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const useHasChanged = (values: any[], skipInitialEvent = false): boolean => {
  const previousValue = usePrevious(values);
  if (!previousValue) {
    return !skipInitialEvent;
  }

  return previousValue.some((prev, i) => hasValueChanged(prev, values[i]));
};

export default useHasChanged;
