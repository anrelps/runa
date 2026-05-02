import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  CreateTransactionData,
  Transaction,
  TransactionFilters,
  UpdateTransactionData,
  WalletSummary,
} from '../services/transactionsService';
import {
  addBalance,
  destroy,
  index,
  show,
  transactionHistory,
  update,
} from '../services/transactionsService';
import type { RootState } from '../store';

interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
}

interface TransactionsState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
  wallet: WalletSummary | null;
  pagination: Pagination;
}

const initialState: TransactionsState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
  wallet: null,
  pagination: { current_page: 1, last_page: 1, total: 0 },
};

export const addBalanceWallet = createAsyncThunk<
  Transaction,
  CreateTransactionData,
  { rejectValue: string }
>('transactions/addBalance', async (data, { rejectWithValue }) => {
  try {
    const res = await addBalance(data);
    return res;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

export const transactionsIndex = createAsyncThunk<
  Transaction[],
  TransactionFilters | undefined,
  { rejectValue: string }
>('transactions/index', async (filters, { rejectWithValue }) => {
  try {
    return await index(filters);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

export const transactionShow = createAsyncThunk<
  Transaction,
  number,
  { rejectValue: string }
>('transactions/show', async (id, { rejectWithValue }) => {
  try {
    return await show(id);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

export const transactionBalanceWallet = createAsyncThunk<
  WalletSummary,
  void,
  { rejectValue: string }
>('transactions/history', async (_, { rejectWithValue }) => {
  try {
    return await transactionHistory();
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

export const transactionUpdate = createAsyncThunk<
  Transaction,
  { id: number; data: UpdateTransactionData },
  { rejectValue: string }
>('transactions/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await update(id, data);
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

export const transactionDelete = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('transactions/delete', async (id, { rejectWithValue }) => {
  try {
    await destroy(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Erro desconhecido');
  }
});

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
      .addCase(addBalanceWallet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addBalanceWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      })

      .addCase(transactionsIndex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionsIndex.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload as any;
        if (Array.isArray(payload)) {
          state.transactions = payload;
        } else if (Array.isArray(payload?.data)) {
          state.transactions = payload.data;
          state.pagination = {
            current_page: payload?.meta?.current_page ?? payload?.current_page ?? 1,
            last_page: payload?.meta?.last_page ?? payload?.last_page ?? 1,
            total: payload?.meta?.total ?? payload?.total ?? payload.data.length,
          };
        } else {
          state.transactions = [];
        }
      })
      .addCase(transactionsIndex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      })

      .addCase(transactionShow.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transaction = null;
      })
      .addCase(transactionShow.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(transactionShow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      })

      .addCase(transactionBalanceWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionBalanceWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(transactionBalanceWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      })

      .addCase(transactionUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;

        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id,
        );

        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(transactionUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      })

      .addCase(transactionDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.payload,
        );

        if (state.transaction?.id === action.payload) {
          state.transaction = null;
        }
      })
      .addCase(transactionDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Erro desconhecido';
      });
  },
});

export const selectTransactionsState = (state: RootState) => state.transactions;
export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;
export const selectTransaction = (state: RootState) =>
  state.transactions.transaction;
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loading;
export const selectTransactionsError = (state: RootState) =>
  state.transactions.error;
export const selectWallet = (state: RootState) => state.transactions.wallet;
export const selectTransactionsPagination = (state: RootState) =>
  state.transactions.pagination;

export default transactionsSlice.reducer;
