import { createSlice } from '@reduxjs/toolkit';

const discountCodesSlice = createSlice({
  name: 'discountCodes',
  initialState: {
    codes: [],
    page: 0,
    rowsPerPage: 5,
    loading: false,
    error: null,
  },
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess(state, action) {
      const { userId, brandName, codes } = action.payload;
      state.loading = false;
      state.userId = userId;
      state.brandName = brandName;
      state.codes = codes;
    },
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    markAsUsed(state, action) {
      console.log(action.payload);
      const index = state.codes.findIndex((code) => {
        code.value === action.payload;
        console.log(code.value);
      });
      console.log(index);
      if (index !== -1) {
        state.codes[index].isUSed = true;
        state.codes[index].value = action.payload;
      }
    },
    deleteDiscountCode(state, action) {
      state.codes = state.codes.filter((code) => code.code !== action.payload);
    },
    changePage(state, action) {
      state.page = action.payload;
    },
    changeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchError,
  markAsUsed,
  deleteDiscountCode,
  changePage,
  changeRowsPerPage,
} = discountCodesSlice.actions;

export default discountCodesSlice.reducer;
