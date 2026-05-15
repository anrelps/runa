import api from '../../utils/api';
import type { category } from '../../utils/consts';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  user_id: number;
  type: TransactionType;
  amount: number;
  description: string;
  category: category;
  date: string;
}

export interface WalletSummary {
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  monthlyBalance: number;
  formatted_balance: string;
  formatted_monthly_balance: string;
}

export interface WalletHistoryResponse {
  success: boolean;
  data: {
    total_income: number;
    total_expense: number;
    balance: number;
    formatted_balance: string;
  };
}

export interface TransactionFilters {
  type?: TransactionType;
  min_amount?: number;
  max_amount?: number;
  from_date?: string;
  to_date?: string;
  page?: number;
  per_page?: number;
}

export interface CreateTransactionData {
  type: TransactionType;
  amount: number;
  description: string;
  category: category;
  date: string;
  transactionable_type?: string | null;
  transactionable_id?: number | null;
}

export interface UpdateTransactionData {
  amount?: number;
  description?: string;
  date?: string;
}

export const index = async (
  filters?: TransactionFilters,
): Promise<any> => {
  const res = await api.get('/transactions', { params: filters });
  return res.data.data;
};

export const addBalance = async (
  data: CreateTransactionData,
): Promise<Transaction> => {
  const res = await api.post('/transactions', data);
  return res.data;
};

const currentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  return {
    from_date: `${year}-${month}-01`,
    to_date: `${year}-${month}-${String(lastDay).padStart(2, '0')}`,
  };
};

export const transactionHistory = async (): Promise<WalletSummary> => {
  const [allTime, thisMonth] = await Promise.all([
    api.get<WalletHistoryResponse>('/transactions/history'),
    api.get<WalletHistoryResponse>('/transactions/history', {
      params: currentMonthRange(),
    }),
  ]);

  return {
    balance: allTime.data.data.balance,
    formatted_balance: allTime.data.data.formatted_balance,
    incomeMonth: thisMonth.data.data.total_income,
    expenseMonth: thisMonth.data.data.total_expense,
    monthlyBalance: thisMonth.data.data.balance,
    formatted_monthly_balance: thisMonth.data.data.formatted_balance,
  };
};

export const show = async (id: number): Promise<Transaction> => {
  const res = await api.get(`/transactions/${id}`);
  return res.data.data;
};

export const update = async (
  id: number,
  data: UpdateTransactionData,
): Promise<Transaction> => {
  const res = await api.put(`/transactions/${id}`, data);
  return res.data.data;
};

export const destroy = async (id: number): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};
