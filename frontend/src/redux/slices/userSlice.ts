import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type LoginResponse, userLogin } from '../services/userService';

interface LoginArgs {
  email: string;
  password: string;
}

interface UserState {
  user: LoginResponse['user'] | null;
  token: string | null;
  loading: boolean;
  error: string | null | undefined;
  isAuthenticated: boolean;
  authChecked: boolean;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token') ?? null,
  loading: false,
  error: null,
  isAuthenticated: false,
  authChecked: false,
};

export const login = createAsyncThunk<LoginResponse, LoginArgs>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await userLogin({ email, password });

      if (!res) {
        return rejectWithValue('Resposta vazia do servidor');
      }

      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Erro desconhecido');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.authChecked = true;
      state.user = null;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (!action.payload) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.authChecked = true;
          state.error = 'Missing payload from login response';
          localStorage.removeItem('token');
          return;
        }

        state.user = action.payload.user ?? null;
        state.isAuthenticated = true;
        state.authChecked = true;
        state.token = action.payload.token ?? null;

        if (action.payload.token) {
          localStorage.setItem('token', action.payload.token);
        }
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
        state.token = null;
        state.error =
          (action.payload as string) ??
          action.error.message ??
          'Erro ao fazer login';
        localStorage.removeItem('token');
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
