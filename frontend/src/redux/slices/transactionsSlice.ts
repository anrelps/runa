import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addBalance, type Transaction } from '../services/transactionsService';

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

export const addBalanceWallet = createAsyncThunk(
  'transactions/addBalance',
  async (data: Parameters<typeof addBalance>[0], { rejectWithValue }) => {
    try {
      const res = await addBalance(data);
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Erro desconhecido');
    }
  },
);

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBalanceWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBalanceWallet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBalanceWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionsSlice.reducer;
