import { parseDate } from '@internationalized/date';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm, {
  defaultExpenseFormData,
  type ExpenseFormData,
} from '../../features/expenses/components/ExpenseForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import {
  expensesShow,
  expensesUpdate,
  selectError,
  selectExpense,
  selectExpenses,
  selectLoading,
} from '../../redux/slices/expensesSlice';
import type { AppDispatch } from '../../redux/store';

const EditExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const expenseFromShow = useSelector(selectExpense);
  const expenses = useSelector(selectExpenses);

  const expenseFromList = useMemo(
    () => expenses.find((e) => e.id === Number(id)) ?? null,
    [expenses, id],
  );

  const expense = expenseFromList ?? expenseFromShow;

  const [initialData, setInitialData] = useState<Partial<ExpenseFormData> | null>(null);

  useEffect(() => {
    if (!expenseFromList && id) {
      dispatch(expensesShow(Number(id)));
    }
  }, [dispatch, id, expenseFromList]);

  useEffect(() => {
    if (!expense) return;
    setInitialData({
      ...defaultExpenseFormData(),
      type: expense.type ?? 'single',
      description: expense.description ?? '',
      category: expense.category ?? '',
      amount: String(parseFloat(String(expense.total_amount ?? 0))),
      date: expense.first_due_date
        ? parseDate(expense.first_due_date.substring(0, 10))
        : defaultExpenseFormData().date,
      installmentCount: String(expense.installment_count ?? 2),
    });
  }, [expense]);

  const handleSubmit = async (data: ExpenseFormData) => {
    const action = await dispatch(
      expensesUpdate({
        id: Number(id),
        data: {
          description: data.description,
          category: data.category,
          total_amount: parseFloat(data.amount),
        },
      }),
    );
    if (expensesUpdate.fulfilled.match(action)) {
      navigate('/expenses');
    }
  };

  if (!initialData) {
    return (
      <AppLayout>
        <div className='flex items-center justify-center h-40'>
          <p className='text-sm text-text-secondary'>
            {!loading ? 'Despesa não encontrada.' : 'Carregando...'}
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {error && (
        <p className='text-sm text-red-400 mb-4 px-1'>{error}</p>
      )}
      <ExpenseForm
        title='Editar Despesa'
        subtitle='Atualize os dados da despesa'
        submitLabel='Salvar alterações'
        loading={loading}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default EditExpense;
