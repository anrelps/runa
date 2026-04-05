import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IncomeForm, {
  type IncomeFormData,
} from '../../features/incomes/components/IncomeForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { addBalanceWallet, selectTransactionsLoading } from '../../redux/slices/transactionsSlice';
import type { AppDispatch } from '../../redux/store';

const AddIncome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectTransactionsLoading);

  const handleSubmit = async (data: IncomeFormData) => {
    await dispatch(
      addBalanceWallet({
        type: 'income',
        amount: parseFloat(data.amount),
        description: data.description.trim() || 'Saldo adicionado',
        category: 'Outros' as any,
        date: data.date || new Date().toISOString().slice(0, 10),
      }),
    );
    navigate('/incomes');
  };

  return (
    <AppLayout>
      <IncomeForm
        title='Adicionar Saldo'
        subtitle='Registre um novo saldo'
        submitLabel='Salvar saldo'
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default AddIncome;
