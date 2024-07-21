'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counterSlices';
import { usersApi } from './services';

const rootReducer = combineReducers({
  counter: counterReducer,
  // add all your reducers here
  [usersApi.reducerPath]: usersApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([usersApi.middleware]),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
