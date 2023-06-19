import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer from './Auth/AuthSlices';
import videoReducer from './ShareVideo/ShareVideoSlices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
