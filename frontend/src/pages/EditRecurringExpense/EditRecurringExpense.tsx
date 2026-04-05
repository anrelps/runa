import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm, {
  defaultExpenseFormData,
  type ExpenseFormData,
} from '../../features/expenses/components/ExpenseForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { showRecurring, updateRecurring } from '../../redux/services/expensesService';

const EditRecurringExpense = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Partial<ExpenseFormData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    showRecurring(Number(id)).then((rec) => {
      setInitialData({
        ...defaultExpenseFormData(),
        type: 'recurring',
        description: rec.description ?? '',
        amount: String(parseFloat(String(rec.amount ?? 0))),
        recurringDay: String(rec.due_day ?? 1),
      });
    });
  }, [id]);

  const handleSubmit = async (data: ExpenseFormData) => {
    setLoading(true);
    setError(null);
    try {
      await updateRecurring(Number(id), {
        description: data.description,
        amount: parseFloat(data.amount),
        due_day: parseInt(data.recurringDay),
        active: 1,
      });
      navigate('/commitments');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return (
      <AppLayout>
        <div className='flex items-center justify-center h-40'>
          <p className='text-sm text-text-secondary'>Carregando...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {error && (
        <div className='mb-4 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20'>
          {error}
        </div>
      )}
      <ExpenseForm
        title='Editar Recorrente'
        subtitle='Atualize os dados da despesa recorrente'
        submitLabel='Salvar alterações'
        loading={loading}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default EditRecurringExpense;
