import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IncomeForm, {
  defaultIncomeFormData,
  type IncomeFormData,
} from '../../features/incomes/components/IncomeForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import {
  selectTransaction,
  selectTransactionsLoading,
  transactionShow,
  transactionUpdate,
} from '../../redux/slices/transactionsSlice';
import type { AppDispatch } from '../../redux/store';

const EditIncome = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectTransactionsLoading);
  const transaction = useSelector(selectTransaction);

  const [initialData, setInitialData] = useState<Partial<IncomeFormData> | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(transactionShow(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!transaction) return;
    setInitialData({
      ...defaultIncomeFormData(),
      amount: String(transaction.amount ?? ''),
      description: transaction.description ?? '',
      date: transaction.date ? transaction.date.substring(0, 10) : '',
    });
  }, [transaction]);

  const handleSubmit = async (data: IncomeFormData) => {
    await dispatch(
      transactionUpdate({
        id: Number(id),
        data: {
          amount: parseFloat(data.amount),
          description: data.description.trim() || 'Saldo adicionado',
          date: data.date || new Date().toISOString().slice(0, 10),
        },
      }),
    );
    navigate('/incomes');
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
      <IncomeForm
        title='Editar Saldo'
        subtitle='Atualize os dados do saldo'
        submitLabel='Salvar alterações'
        loading={loading}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default EditIncome;
