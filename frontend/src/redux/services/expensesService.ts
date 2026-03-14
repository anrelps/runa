import api from '../../features/utils/api';

export interface Filters {
  category: string;
  type: string;
  total_amount: number;
  from_date: string;
  to_date: string;
}

export interface ExpenseData {
  description: string;
  category: string;
  type: string;
  total_amount: number;
  installment_count: number;
  first_due_date: string;
}

export interface CreateExpenseData {
  data: ExpenseData;
}

export const index = async (filters: Filters) => {
  const res = await api.get('/expenses', { params: filters });
  return res.data;
};

export const create = async ({ data }: CreateExpenseData) => {
  const res = await api.post('/expenses', data);
  return res.data;
};
