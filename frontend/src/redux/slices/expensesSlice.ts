import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  create,
  type ExpenseData,
  type Filters,
  index,
} from '../services/expensesService';

interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
}

interface ExpensesState {
  expenses: any[];
  expense: any | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

const initialState: ExpensesState = {
  expenses: [],
  expense: null,
  loading: false,
  error: null,
  pagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
  },
};

export const expensesIndex = createAsyncThunk<any, Filters>(
  'expenses/index',
  async (filters, { rejectWithValue }) => {
    try {
      const res = await index(filters);
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Erro desconhecido');
    }
  },
);

export const expensesCreate = createAsyncThunk<any, ExpenseData>(
  'expenses/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await create({ data });
      return res;
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Erro desconhecido');
    }
  },
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(expensesIndex.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expensesIndex.fulfilled, (state, action) => {
        state.loading = false;
        const items = action.payload?.data ?? [];
        const currentPage = action.meta.arg?.page ?? 1;
        const PER_PAGE = 20;
        const hasMore = items.length >= PER_PAGE;

        state.expenses = items;
        state.pagination = {
          current_page: currentPage,
          last_page:    hasMore ? currentPage + 1 : currentPage,
          total:        0,
        };
      })
      .addCase(expensesIndex.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro desconhecido';
      })
      .addCase(expensesCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expensesCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
      })
      .addCase(expensesCreate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro desconhecido';
      });
  },
});

export const selectExpenses   = (state: { expenses: ExpensesState }) => state.expenses.expenses;
export const selectExpense    = (state: { expenses: ExpensesState }) => state.expenses.expense;
export const selectLoading    = (state: { expenses: ExpensesState }) => state.expenses.loading;
export const selectError      = (state: { expenses: ExpensesState }) => state.expenses.error;
export const selectPagination = (state: { expenses: ExpensesState }) => state.expenses.pagination;

export default expensesSlice.reducer;
