'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

import { removeSession } from '@/shares/utils/session';
import { cookieKeys, sessionKeys } from '@/shares/constants';

import { UserStateType } from '../services/users/type';

type AuthState = {
  user?: UserStateType;
};

const initialState = {
  user: undefined,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserStateType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
      removeSession(sessionKeys.auth);
      deleteCookie(cookieKeys.refreshToken);
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
