import api from '../../utils/api';

export interface Filters {
  category?: string;
  type?: string;
  total_amount?: number;
  from_date?: string;
  to_date?: string;
  page?: number;
  per_page?: number;
}

export interface ExpenseData {
  description: string;
  category: string;
  type: string;
  total_amount: number;
  installment_count?: number;
  first_due_date?: string;
  recurring_day?: number;
}

export interface RecurringExpenseData {
  description: string;
  amount: number;
  due_day: number;
  active: number;
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

export const show = async (id: number) => {
  const res = await api.get(`/expenses/${id}`);
  return res.data.data;
};

export const update = async (id: number, data: Partial<ExpenseData>) => {
  const res = await api.put(`/expenses/${id}`, data);
  return res.data.data;
};

export const destroy = async (id: number) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};

export const updateInstallment = async (installmentId: number) => {
  const res = await api.put(`/expenses/update-installment/${installmentId}`);
  return res.data;
};

export const createRecurring = async (data: RecurringExpenseData) => {
  const res = await api.post('/recurring-expenses', data);
  return res.data;
};

export const indexRecurring = async () => {
  const res = await api.get('/recurring-expenses');
  return res.data;
};

export const showRecurring = async (id: number) => {
  const res = await api.get(`/recurring-expenses/${id}`);
  return res.data.data;
};

export const updateRecurring = async (id: number, data: Partial<RecurringExpenseData>) => {
  const res = await api.put(`/recurring-expenses/${id}`, data);
  return res.data;
};

export const destroyRecurring = async (id: number) => {
  const res = await api.delete(`/recurring-expenses/${id}`);
  return res.data;
};
