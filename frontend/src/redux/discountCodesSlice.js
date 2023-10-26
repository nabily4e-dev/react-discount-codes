import { createSlice } from '@reduxjs/toolkit';

const discountCodesSlice = createSlice({
  name: 'discountCodes',
  initialState: { codes: [], page: 0, rowsPerPage: 5 },
  reducers: {
    generateDiscountCode(state) {
      const code = Math.random().toString(36).substring(7);
      const status = Math.random() < 0.5 ? 'Active' : 'Inactive';
      const action = Math.random() < 0.5 ? 'Mark as used' : 'Delete';
      state.codes.push({ code, status, action });
    },
    markAsUsed(state, action) {
      const index = state.codes.findIndex(
        (code) => code.code === action.payload
      );
      if (index !== -1) {
        state.codes[index].status = 'Used';
        state.codes[index].action = 'Delete';
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
    fetchSuccess(state, action) {
      const { userId, brandName, codes } = action.payload;
      state.userId = userId;
      state.brandName = brandName;
      state.codes = codes;
    },
    fetchError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  generateDiscountCode,
  markAsUsed,
  deleteDiscountCode,
  changePage,
  changeRowsPerPage,
} = discountCodesSlice.actions;

export default discountCodesSlice.reducer;
