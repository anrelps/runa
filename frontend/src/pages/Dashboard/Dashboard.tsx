import PendingBills from '../../features/dashboard/components/PendingBills';
import RecentTransactions from '../../features/dashboard/components/RecentTransactions';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const Dashboard = () => {
  return (
    <>
      <AppLayout>
        <div className='flex gap-4 justify-between flex-col lg:flex-row'>
          <PendingBills />
          <RecentTransactions />
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
