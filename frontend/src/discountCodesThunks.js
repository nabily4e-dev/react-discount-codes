import axios from 'axios';
import {
  fetchError,
  fetchStart,
  markAsUsed,
  deleteDiscountCode,
  fetchSuccess,
} from './redux/discountCodesSlice';

const API_BASE_URL = 'http://localhost:3000';
const API_DISCOUNT_CODES_URL = `${API_BASE_URL}/discount-codes`;
const API_GENERATE_URL = `${API_DISCOUNT_CODES_URL}/generate`;
const API_MARK_AS_USED_URL = `${API_DISCOUNT_CODES_URL}/mark-as-used`;
const AUTH_HEADER_NAME = 'Authorization';
const AUTH_HEADER_PREFIX = 'Bearer';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { [AUTH_HEADER_NAME]: `${AUTH_HEADER_PREFIX} ${token}` };
};

export const fetchDiscountCodes = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await axios.get(
      'http://localhost:3000/discount-codes/generate',
      {
        headers: getAuthHeader(),
      }
    );
    dispatch(fetchStart(response.data));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export const markDiscountCodeAsUsed =
  (discountCodeValue) => async (dispatch) => {
    dispatch(fetchStart());
    try {
      await axios.post(
        API_MARK_AS_USED_URL,
        { discountCodeValue },
        {
          headers: getAuthHeader(),
        }
      );
      dispatch(markAsUsed(discountCodeValue));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };

export const removeDiscountCode = (discountCodeValue) => async (dispatch) => {
  dispatch(fetchStart());
  try {
    await axios.delete(`${API_DISCOUNT_CODES_URL}/${discountCodeValue}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    dispatch(deleteDiscountCode(discountCodeValue));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};

export const generateDiscountCodes = (amount) => async (dispatch) => {
  dispatch(fetchStart()); // dispatch the fetchStart action to indicate the loading state
  try {
    const response = await axios.post(
      API_GENERATE_URL,
      { amount },
      { headers: getAuthHeader() }
    );
    console.log(response.data);
    dispatch(fetchSuccess({ codes: response.data }));
  } catch (error) {
    dispatch(fetchError(error.message));
  }
};
