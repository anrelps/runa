import { PlusCircleIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import SpendingByCategoryPieChart from '../../features/charts/SpendingByCategoryPieChart';
import WeeklySpendingBarChart from '../../features/charts/WeeklySpendingBarChart';
import CategoryFilterButtons from '../../features/expenses/components/CategoryFilterButtons';
import RecentExpensesList from '../../features/expenses/components/RecentExpensesList';
import { DateRangePicker } from '../../features/shared/components/DateRangePicker/DateRangePicker';
import { Pagination } from '../../features/shared/components/Pagination';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const Expenses = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <button
        onClick={() => navigate('/expenses/add')}
        className='w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl mb-4 text-sm font-bold cursor-pointer transition-all'
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-start) 0%, #ff4a4a 100%)',
          color: '#fff',
          boxShadow: '0 6px 20px color-mix(in srgb, var(--color-accent-start) 35%, transparent)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.filter = 'brightness(1.1)';
          e.currentTarget.style.boxShadow = '0 8px 28px color-mix(in srgb, var(--color-accent-start) 50%, transparent)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.filter = '';
          e.currentTarget.style.boxShadow = '0 6px 20px color-mix(in srgb, var(--color-accent-start) 35%, transparent)';
        }}
      >
        <PlusCircleIcon weight='fill' size={20} />
        Adicionar despesa
      </button>
      <div className='flex flex-col md:flex-row w-full gap-4'>
        <WeeklySpendingBarChart />
        <SpendingByCategoryPieChart />
      </div>
      <div className='flex flex-col sm:flex-row items-start gap-3 mb-4'>
        <DateRangePicker />
        <CategoryFilterButtons />
      </div>
      <RecentExpensesList />
      <Pagination pageCount={5} currentPage={1} />
      <div className='mt-10 p-10'></div>
    </AppLayout>
  );
};

export default Expenses;
