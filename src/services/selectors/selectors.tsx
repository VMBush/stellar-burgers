import { selectIngredient } from '../../slices/userSlice';
import { RootState } from '../store';

export const selectIngredientById = (id: string) => (state: RootState) =>
  selectIngredient({ user: state }, id);
