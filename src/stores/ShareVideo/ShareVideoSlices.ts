import { createSlice } from '@reduxjs/toolkit'

import { IShareVideoState } from '../../types/userType';
import { fetchVideos, shareNewVideo } from './ShareVideoAPIs';

const initialState: IShareVideoState = {
  errMsg: '',
  isError: false,
  isFetching: false,
  sharedVideos: [],
}

export const ShareVideoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    clearState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchVideos.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.sharedVideos = payload;
      })
      .addCase(fetchVideos.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errMsg = payload || '';
      });

    builder
      .addCase(shareNewVideo.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(shareNewVideo.fulfilled, (state, { payload }) => {
        state.isFetching = false;
      })
      .addCase(shareNewVideo.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.isError = true;
        state.errMsg = payload || '';
      });
  },
})

export const { clearState } = ShareVideoSlice.actions

export default ShareVideoSlice.reducer