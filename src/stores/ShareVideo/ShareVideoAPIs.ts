import { createAsyncThunk } from '@reduxjs/toolkit';

import httpRequest from '../../services/httpRequest';

export const fetchVideos = createAsyncThunk(
  'video/fetchVideosStatus',
  async (cb: () => void, thunkAPI) => {
    try {
      const {data} = await httpRequest.get('/video/shared-videos');
      cb && cb();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const shareNewVideo = createAsyncThunk(
  'video/shareNewVideoStatus',
  async (payload: any, thunkAPI) => {
    const {params, cbSuccess, cbFailure} = payload;
    try {
      const response = await httpRequest.post('/video/share-video', {params});
      cbSuccess && cbSuccess(response);
      // return response;
    } catch (err) {
      cbFailure && cbFailure(err);
      return thunkAPI.rejectWithValue(err);
    }
  },
);
