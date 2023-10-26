import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    isLoggedIn: false,
    username: '',
    error: null,
    authToken: null,
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        error: '',
        authToken: action.payload.authToken,
      };
    },
    loginFailure(state, action) {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        error: action.payload.error,
        authToken: '',
      };
    },
    logout(state) {
      return {
        ...state,
        isLoggedIn: false,
        username: '',
        error: '',
        authToken: '',
      };
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
