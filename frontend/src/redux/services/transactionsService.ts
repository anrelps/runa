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
  formatted_balance: string;
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
  return res.data.data; // { data: [...], links: {}, meta: {} }
};

export const addBalance = async (
  data: CreateTransactionData,
): Promise<Transaction> => {
  const res = await api.post('/transactions', data);
  return res.data;
};

export const transactionHistory = async (): Promise<WalletSummary> => {
  const res = await api.get<WalletHistoryResponse>('/transactions/history');

  return {
    balance: res.data.data.balance,
    incomeMonth: res.data.data.total_income,
    expenseMonth: res.data.data.total_expense,
    formatted_balance: res.data.data.formatted_balance,
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
