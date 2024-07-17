'use client';
import { Provider } from 'react-redux';
import { PropsWithChildren, useRef } from 'react';

import { AppStore, makeStore } from './store';

export function RTKProvider({ children }: PropsWithChildren) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // initialize data in here (dispatch anything)
    // storeRef.current.dispatch(initializeCount(count));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
