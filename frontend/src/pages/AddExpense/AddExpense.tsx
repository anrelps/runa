import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExpenseForm, {
  type ExpenseFormData,
} from '../../features/expenses/components/ExpenseForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { createRecurring } from '../../redux/services/expensesService';
import { expensesCreate } from '../../redux/slices/expensesSlice';
import type { AppDispatch } from '../../redux/store';

const AddExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ExpenseFormData) => {
    setLoading(true);
    setError(null);
    try {
      if (data.type === 'recurring') {
        await createRecurring({
          description: data.description,
          amount: parseFloat(data.amount),
          due_day: parseInt(data.recurringDay),
          active: 1,
        });
      } else {
        const result = await dispatch(
          expensesCreate({
            description: data.description,
            category: data.category,
            type: data.type,
            total_amount: parseFloat(data.amount),
            installment_count:
              data.type === 'installment' ? parseInt(data.installmentCount) : undefined,
            first_due_date: data.date.toString(),
          }),
        );
        if (expensesCreate.rejected.match(result)) {
          setError((result.payload as string) ?? 'Erro ao salvar despesa');
          return;
        }
      }
      navigate('/expenses');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Erro ao salvar despesa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      {error && (
        <div className='mb-4 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20'>
          {error}
        </div>
      )}
      <ExpenseForm
        title='Adicionar Despesa'
        subtitle='Registre uma nova despesa'
        submitLabel='Salvar despesa'
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default AddExpense;
