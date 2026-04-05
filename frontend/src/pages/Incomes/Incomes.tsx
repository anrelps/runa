import { PlusCircleIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RecentIncomesList from '../../features/incomes/components/RecentIncomesList';
import { DateRangePicker } from '../../features/shared/components/DateRangePicker/DateRangePicker';
import { Pagination } from '../../features/shared/components/Pagination';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import {
  selectTransactionsPagination,
  transactionsIndex,
} from '../../redux/slices/transactionsSlice';
import { useAppDispatch } from '../../redux/store';

const Incomes = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pagination = useSelector(selectTransactionsPagination);

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null);

  const loadIncomes = useCallback(
    (page: number) => {
      const filters: Record<string, any> = { type: 'income', page };

      if (dateRange?.start) filters.from_date = dateRange.start;
      if (dateRange?.end) filters.to_date = dateRange.end;

      dispatch(transactionsIndex(filters));
    },
    [dispatch, dateRange],
  );

  useEffect(() => {
    loadIncomes(currentPage);
  }, [loadIncomes, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDateChange = (range: any) => {
    if (!range) {
      setDateRange(null);
      setCurrentPage(1);
      return;
    }

    setDateRange({
      start: range.start.toString(),
      end: range.end.toString(),
    });
    setCurrentPage(1);
  };

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
        <DateRangePicker onChange={handleDateChange} />
      </div>

      <RecentIncomesList />

      <div className='mb-12'>
        <Pagination
          pageCount={pagination.last_page || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
};

export default Incomes;
