import { createAsyncThunk } from '@reduxjs/toolkit';

import httpRequest from '../../services/httpRequest';

export const signin = createAsyncThunk(
  'auth/signinStatus',
  async (payload: any, thunkAPI) => {
    const {formValue, cbSuccess, cbFailure} = payload;
    try {
      const response = await httpRequest.post('/auth/signin', formValue);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        cbSuccess && cbSuccess();
      }
      return response.data;
    } catch (err) {
      cbFailure && cbFailure(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signupStatus',
  async (payload: any, thunkAPI) => {
    const {formValue, cbSuccess, cbFailure} = payload;
    try {
      const response = await httpRequest.post('/auth/signup', formValue);
      cbSuccess && cbSuccess(response);
      return response.data;
    } catch (err) {
      cbFailure && cbFailure(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
