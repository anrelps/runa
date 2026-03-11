import SpendingByCategoryPieChart from '../../features/charts/SpendingByCategoryPieChart';
import WeeklySpendingBarChart from '../../features/charts/WeeklySpendingBarChart';
import CategoryFilterButtons from '../../features/expenses/components/CategoryFilterButtons';
import RecentExpensesList from '../../features/expenses/components/RecentExpensesList';
import { DateRangePicker } from '../../features/shared/components/DateRangePicker/DateRangePicker';
import { Pagination } from '../../features/shared/components/Pagination';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const Expenses = () => {
  return (
    <AppLayout>
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
