import { WalletIcon } from '@phosphor-icons/react';
import Button from '../../../features/shared/components/Button';
import DarkToggle from './DarkToggle';
import UserCards from './UserCards';
import UserInfo from './UserInfo';

const UserSection = () => {
  return (
    <div
      className='flex flex-col gap-2 border border-primary/10 w-full relative overflow-hidden rounded-lg p-2'
      style={{
        background:
          'linear-gradient(120deg, rgba(32,224,150,0.13) 0%, rgba(33,45,45,0.10) 50%, rgba(20,31,31,0.13) 100%)',
      }}
    >
      <div className='flex flex-row items-center justify-between w-full gap-2'>
        <div className='flex items-center gap-2 flex-1'>
          <UserInfo />
          <div className='hidden sm:block'>
            <UserCards />
          </div>
        </div>
        <div className='flex gap-2'>
          <DarkToggle />
          <Button icon={WalletIcon}>
            <span className='hidden md:inline'>Carteira</span>
          </Button>
        </div>
      </div>
      <div className='block sm:hidden w-full'>
        <UserCards />
      </div>
    </div>
  );
};

export default UserSection;
