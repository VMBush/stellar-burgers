import { TUser } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../utils/cookie';
import { RootState } from '../services/store';

export const loginUserThunk = createAsyncThunk(
  'user/login',
  (loginData: TLoginData) =>
    loginUserApi(loginData).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return { user: data.user };
    })
);

export const registerUserThunk = createAsyncThunk(
  'user/register',
  (userData: TRegisterData) =>
    registerUserApi(userData).then((data) => {
      localStorage.setItem('refreshToken', data.refreshToken);
      setCookie('accessToken', data.accessToken);
      return { user: data.user };
    })
);

export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPassword',
  (email: string) => forgotPasswordApi({ email })
);

export const getUserThunk = createAsyncThunk('user/get', () => getUserApi());

export const logoutThunk = createAsyncThunk('user/logout', () =>
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  })
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  (userData: Partial<TRegisterData>) => updateUserApi(userData)
);

export type userState = {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
};

const initialState: userState = {
  isInit: false,
  isLoading: false,
  user: null
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

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
    });
  }
});

export const selectUserName = (state: RootState) => state.user.user?.name;
export const selectUser = (state: RootState) => state.user.user;

export const { init } = userSlice.actions;

export default userSlice.reducer;
