'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setAuth: (state, action: PayloadAction<UserStateType | undefined>) => {
      state.user = action?.payload;
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
