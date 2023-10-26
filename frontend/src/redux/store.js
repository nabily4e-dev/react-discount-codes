import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import registerReducer from './registerSlice';
import discountCodesReducer from './discountCodesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    discountCodes: discountCodesReducer,
  },
});

export default store;
