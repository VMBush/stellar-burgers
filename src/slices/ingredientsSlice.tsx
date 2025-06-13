import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

export const getIngredientsThunk = createAsyncThunk('ingredients/get', () =>
  getIngredientsApi()
);

export type ingredientsState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: ingredientsState = {
  isIngredientsLoading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
      state.isIngredientsLoading = false;
    });
  }
});

export const selectIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((el) => el._id === id);

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIsIngredientsLoading = (state: RootState) =>
  state.ingredients.isIngredientsLoading;

export default ingredientsSlice.reducer;
