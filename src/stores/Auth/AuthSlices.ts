import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errMsg: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: (builder) => {
  },
});

export const { clearState } = authSlice.actions;
export const authSelector = (state: any) => state.auth;

export default authSlice.reducer;
