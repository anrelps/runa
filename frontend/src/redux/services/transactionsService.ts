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

export interface TransactionFilters {
  type?: TransactionType;
  min_amount?: number;
  max_amount?: number;
  from_date?: string;
  to_date?: string;
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

export const index = async (
  filters?: TransactionFilters,
): Promise<Transaction[]> => {
  const res = await api.get('/transactions', { params: filters });
  return res.data;
};

export const addBalance = async (
  data: CreateTransactionData,
): Promise<Transaction> => {
  const res = await api.post('/transactions', data);
  return res.data;
};
