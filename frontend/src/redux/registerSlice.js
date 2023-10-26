import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isRegistered: false,
    username: '',
    error: '',
    success: '',
  },
  reducers: {
    registerSuccess(state, action) {
      state.isRegistered = true;
      state.username = action.payload.username;
      state.error = '';
      state.success = action.payload.success;
    },
    registerFailure(state, action) {
      state.isRegistered = false;
      state.username = '';
      state.error = action.payload.error;
      state.success = '';
    },
  },
});

export const { registerSuccess, registerFailure } = registerSlice.actions;

export default registerSlice.reducer;
