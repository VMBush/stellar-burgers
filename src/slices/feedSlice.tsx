import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';
import { getFeedsApi, getOrdersApi } from '@api';

export const getFeedsThunk = createAsyncThunk('feeds/get', () => getFeedsApi());
export const getUserOrdersThunk = createAsyncThunk('userOrders/get', () =>
  getOrdersApi()
);

export type TFeedState = {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    });

    builder.addCase(getUserOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrdersThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserOrdersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userOrders = payload;
    });
  }
});

export const selectFeeds = (state: RootState) => state.feed.orders;

export const selectFeedByNumber = (number: string) => (state: RootState) =>
  state.feed.orders.find((el) => el.number.toString() === number);

export const selectFeedCount = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const selectUserOrders = (state: RootState) => state.feed.userOrders;
export const selectUserOrderByNumber = (number: string) => (state: RootState) =>
  state.feed.userOrders.find((el) => el.number.toString() === number);

export const selectIsLoading = (state: RootState) => state.feed.isLoading;

export default feedSlice.reducer;
