import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IncomeForm, {
  type IncomeFormData,
} from '../../features/incomes/components/IncomeForm';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { addBalanceWallet, selectTransactionsLoading, transactionBalanceWallet } from '../../redux/slices/transactionsSlice';
import type { AppDispatch } from '../../redux/store';

const AddIncome = () => {
  const { t } = useTranslation();
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
    dispatch(transactionBalanceWallet());
    navigate('/incomes');
  };

  return (
    <AppLayout>
      <IncomeForm
        title={t('income.addTitle')}
        subtitle={t('income.addSubtitle')}
        submitLabel={t('income.save')}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </AppLayout>
  );
};

export default AddIncome;
