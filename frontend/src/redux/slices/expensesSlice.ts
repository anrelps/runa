import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  create,
  destroy,
  type ExpenseData,
  type Filters,
  index,
  show,
  update,
} from '../services/expensesService';

interface Pagination {
  current_page: number;
  last_page: number;
  total: number;
}

export interface Expense {
  id: number;
  description?: string;
  category?: string;
  total_amount?: number;
  first_due_date?: string;
  installment_count?: number;
  created_at?: string;
  [key: string]: any;
}

interface ExpensesState {
  expenses: Expense[];
  expense: Expense | null;
  loading: boolean;
  error: string | null;
  pagination: Pagination;
}

interface IndexResponse {
  data?: Expense[];
  pagination?: Partial<Pagination>;
  meta?: {
    current_page?: number;
    last_page?: number;
    total?: number;
    per_page?: number;
  };
  current_page?: number;
  last_page?: number;
  total?: number;
  per_page?: number;
  [key: string]: any;
}

const DEFAULT_PER_PAGE = 12;

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

const getErrorMessage = (error: any): string => {
  return (
    error?.response?.data?.message || error?.message || 'Erro desconhecido'
  );
};

const normalizeIndexResponse = (
  payload: IndexResponse | Expense[] | null | undefined,
  fallbackPage = 1,
): { items: Expense[]; pagination: Pagination } => {
  if (Array.isArray(payload)) {
    const hasMore = payload.length >= DEFAULT_PER_PAGE;

    return {
      items: payload,
      pagination: {
        current_page: fallbackPage,
        last_page: hasMore ? fallbackPage + 1 : fallbackPage,
        total: payload.length,
      },
    };
  }

  const items = Array.isArray(payload?.data) ? payload.data : [];

  const current_page =
    payload?.pagination?.current_page ??
    payload?.meta?.current_page ??
    payload?.current_page ??
    fallbackPage;

  const total =
    payload?.pagination?.total ??
    payload?.meta?.total ??
    payload?.total ??
    items.length;

  const per_page =
    payload?.meta?.per_page ?? payload?.per_page ?? DEFAULT_PER_PAGE;

  const apiLastPage =
    payload?.pagination?.last_page ??
    payload?.meta?.last_page ??
    payload?.last_page;

  const fallbackLastPage =
    items.length >= per_page ? current_page + 1 : current_page;

  return {
    items,
    pagination: {
      current_page,
      last_page: apiLastPage ?? fallbackLastPage,
      total,
    },
  };
};

export const expensesIndex = createAsyncThunk<
  IndexResponse | Expense[],
  Filters | undefined,
  { rejectValue: string }
>('expenses/index', async (filters, { rejectWithValue }) => {
  try {
    const res = await index(filters ?? {});
    return res;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const expensesCreate = createAsyncThunk<
  Expense,
  ExpenseData,
  { rejectValue: string }
>('expenses/create', async (data, { rejectWithValue }) => {
  try {
    const res = await create({ data });
    return res;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const expensesShow = createAsyncThunk<
  Expense,
  number,
  { rejectValue: string }
>('expenses/show', async (id, { rejectWithValue }) => {
  try {
    const res = await show(id);
    return res;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const expensesUpdate = createAsyncThunk<
  Expense,
  { id: number; data: Partial<ExpenseData> },
  { rejectValue: string }
>('expenses/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await update(id, data);
    return res;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const expensesDelete = createAsyncThunk<
  { id: number; [key: string]: any },
  number,
  { rejectValue: string }
>('expenses/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await destroy(id);
    return { id, ...res };
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

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

        const fallbackPage = action.meta.arg?.page ?? 1;
        const { items, pagination } = normalizeIndexResponse(
          action.payload,
          fallbackPage,
        );

        state.expenses = items;
        state.pagination = pagination;
      })
      .addCase(expensesIndex.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Erro desconhecido';
      })

      .addCase(expensesCreate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        expensesCreate.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.loading = false;
          state.expense = action.payload;
        },
      )
      .addCase(expensesCreate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Erro desconhecido';
      })

      .addCase(expensesShow.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.expense = null;
      })
      .addCase(
        expensesShow.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.loading = false;
          state.expense = action.payload;
        },
      )
      .addCase(expensesShow.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Erro desconhecido';
      })

      .addCase(expensesUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        expensesUpdate.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.loading = false;
          state.expense = action.payload;

          const idx = state.expenses.findIndex(
            (e) => e.id === action.payload.id,
          );
          if (idx !== -1) {
            state.expenses[idx] = action.payload;
          }
        },
      )
      .addCase(expensesUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Erro desconhecido';
      })

      .addCase(expensesDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(expensesDelete.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (e) => e.id !== action.payload.id,
        );
        state.pagination.total = Math.max(0, state.pagination.total - 1);
      })
      .addCase(expensesDelete.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Erro desconhecido';
      });
  },
});

export const selectExpenses = (state: { expenses: ExpensesState }) =>
  state.expenses.expenses;
export const selectExpense = (state: { expenses: ExpensesState }) =>
  state.expenses.expense;
export const selectLoading = (state: { expenses: ExpensesState }) =>
  state.expenses.loading;
export const selectError = (state: { expenses: ExpensesState }) =>
  state.expenses.error;
export const selectPagination = (state: { expenses: ExpensesState }) =>
  state.expenses.pagination;

export default expensesSlice.reducer;
