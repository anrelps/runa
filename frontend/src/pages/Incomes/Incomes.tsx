import { PlusCircleIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import RecentIncomesList from '../../features/incomes/components/RecentIncomesList';
import { DateRangePicker } from '../../features/shared/components/DateRangePicker/DateRangePicker';
import { Pagination } from '../../features/shared/components/Pagination';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const Incomes = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/income/add')}
        className='w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl mb-4 text-sm font-bold cursor-pointer transition-all'
        style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #00e5b0 100%)',
          color: 'var(--color-background-primary)',
          boxShadow: '0 6px 20px color-mix(in srgb, var(--color-primary) 35%, transparent)',
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.filter = ''; }}
      >
        <PlusCircleIcon weight='fill' size={20} />
        Adicionar saldo
      </button>

      <div className='mb-4'>
        <DateRangePicker />
      </div>

      <RecentIncomesList />
      <Pagination pageCount={5} currentPage={1} />
    </AppLayout>
  );
};

export default Incomes;
