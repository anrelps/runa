import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import Greeting from '../../features/dashboard/components/Greeting';
import PendingBills from '../../features/dashboard/components/PendingBills';
import RecentTransactions from '../../features/dashboard/components/RecentTransactions';
import CardButton from '../../features/shared/components/CardButton';
import AppLayout from '../../layouts/AppLayout/AppLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppLayout>
        <div className='flex items-center gap-4 mb-6 w-full'>
          <CardButton
            label={'Saldo\nAdicionar'}
            icon={ArrowCircleUpIcon}
            accent='var(--color-primary)'
            onClick={() => navigate('/income/add')}
          />
          <CardButton
            label={'Despesa\nAdicionar'}
            icon={ArrowCircleDownIcon}
            accent='var(--color-accent-start)'
            onClick={() => navigate('/expenses/add')}
          />
          <Greeting />
        </div>

        <div className='flex gap-4 justify-between flex-col lg:flex-row'>
          <PendingBills />
          <RecentTransactions />
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
