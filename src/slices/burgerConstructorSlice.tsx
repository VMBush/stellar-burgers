import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../services/store';
import { postOrderThunk } from './orderSlice';
import { v4 as uuidv4 } from 'uuid';

function generateId() {
  return Math.random().toString(36).substring(2);
}

export type constructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: constructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, { payload }: PayloadAction<TIngredient>) => {
      const ingredient = { ...payload, id: uuidv4() };
      if (payload.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.ingredients.findLastIndex(
        (el) => el.id === payload.id
      );
      if (index != -1) {
        state.ingredients.splice(index, 1);
      }
    },
    moveIngredient: (
      { ingredients },
      {
        payload: { direction, ingredient }
      }: PayloadAction<{
        ingredient: TConstructorIngredient;
        direction: 'up' | 'down';
      }>
    ) => {
      const index = ingredients.findLastIndex((el) => el.id === ingredient.id);
      if (index === -1) return;

      if (direction === 'up' && index > 0) {
        ingredients[index] = ingredients[index - 1];
        ingredients[index - 1] = ingredient;
      } else if (direction == 'down' && index < ingredients.length) {
        ingredients[index] = ingredients[index + 1];
        ingredients[index + 1] = ingredient;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrderThunk.fulfilled, (state) => {
      Object.assign(state, initialState);
    });
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;

export const selectConstructor = (state: RootState) => state.burgerConstructor;
export default constructorSlice.reducer;
