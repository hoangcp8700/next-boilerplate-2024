'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counterSlice';
import { usersApi, authApi } from './services';
import authReducer from './features/authSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  // add all your reducers here
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        usersApi.middleware,
        authApi.middleware,
      ]),
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
