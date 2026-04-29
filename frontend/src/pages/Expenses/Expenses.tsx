import { PlusCircleIcon } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SpendingByCategoryPieChart from '../../features/charts/SpendingByCategoryPieChart';
import WeeklySpendingBarChart from '../../features/charts/WeeklySpendingBarChart';
import CategoryFilterButtons from '../../features/expenses/components/CategoryFilterButtons';
import RecentExpensesList from '../../features/expenses/components/RecentExpensesList';
import { DateRangePicker } from '../../features/shared/components/DateRangePicker/DateRangePicker';
import { Pagination } from '../../features/shared/components/Pagination';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import {
  expensesIndex,
  selectPagination,
} from '../../redux/slices/expensesSlice';
import { useAppDispatch } from '../../redux/store';
import type { category } from '../../utils/consts';

const Expenses = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pagination = useSelector(selectPagination);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState<category | null>(null);
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const loadExpenses = useCallback(
    (page: number) => {
      const filters: Record<string, any> = { page, per_page: 12 };

      if (category) filters.category = category;
      if (dateRange?.start) filters.from_date = dateRange.start;
      if (dateRange?.end) filters.to_date = dateRange.end;

      dispatch(expensesIndex(filters));
    },
    [dispatch, category, dateRange],
  );

  useEffect(() => {
    loadExpenses(currentPage);
  }, [loadExpenses, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (cat: category | null) => {
    setCategory(cat);
    setCurrentPage(1);
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
      {/* Botão principal */}
      <button
        onClick={() => navigate('/expenses/add')}
        className='w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl mb-4 text-sm font-bold cursor-pointer transition-all'
        style={{
          background:
            'linear-gradient(135deg, var(--color-accent-start) 0%, #ff4a4a 100%)',
          color: '#fff',
          boxShadow:
            '0 6px 20px color-mix(in srgb, var(--color-accent-start) 35%, transparent)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = 'brightness(1.1)';
          e.currentTarget.style.boxShadow =
            '0 8px 28px color-mix(in srgb, var(--color-accent-start) 50%, transparent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = '';
          e.currentTarget.style.boxShadow =
            '0 6px 20px color-mix(in srgb, var(--color-accent-start) 35%, transparent)';
        }}
      >
        <PlusCircleIcon weight='fill' size={20} />
        Adicionar despesa
      </button>

      <div className='flex flex-col md:flex-row w-full gap-4'>
        <WeeklySpendingBarChart />
        <SpendingByCategoryPieChart />
      </div>

      <div className='flex flex-col gap-3 mb-4'>
        <DateRangePicker onChange={handleDateChange} />
        <CategoryFilterButtons
          selected={category}
          onSelect={handleCategorySelect}
        />
      </div>

      <RecentExpensesList activeCategory={category} />

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

export default Expenses;
