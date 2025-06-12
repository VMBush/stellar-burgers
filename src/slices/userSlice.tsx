import { TIngredient, TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getIngredientsApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';

export const loginUserThunk = createAsyncThunk(
  'user/login',
  ({ email, password }: { email: string; password: string }) =>
    loginUserApi({ email, password }).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return { user: data.user };
    })
);

export const registerUserThunk = createAsyncThunk(
  'user/register',
  ({
    email,
    password,
    name
  }: {
    email: string;
    password: string;
    name: string;
  }) =>
    registerUserApi({ email, name, password }).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return { user: data.user };
    })
);

export const getUserThunk = createAsyncThunk('user/get', () => getUserApi());

export const logoutThunk = createAsyncThunk('user/logout', () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const getIngredientsThunk = createAsyncThunk('ingredients/get', () =>
  getIngredientsApi()
);

export type userState = {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;

  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: userState = {
  isInit: false,
  isLoading: false,
  user: null,
  isIngredientsLoading: false,
  ingredients: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
    });

    builder.addCase(registerUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isLoading = false;
      state.isInit = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isInit = true;
      state.user = payload.user;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
    });

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
  },
  selectors: {
    selectIngredient: (state, id) =>
      state.ingredients.find((el) => el._id === id)
  }
});

export const { init } = userSlice.actions;
export const { selectIngredient } = userSlice.selectors;
export default userSlice.reducer;
