import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../services/store';

export const postOrderThunk = createAsyncThunk(
  'orderss/order',
  (ingredients: string[]) => orderBurgerApi(ingredients)
);

export type orderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: orderState = {
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderThunk.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(postOrderThunk.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(postOrderThunk.fulfilled, (state, { payload }) => {
      state.orderRequest = false;
      state.orderModalData = payload.order;
    });
  }
});

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const { clearOrderModalData } = orderSlice.actions;

export default orderSlice.reducer;
