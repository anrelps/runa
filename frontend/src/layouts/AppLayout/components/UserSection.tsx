import { useTheme } from '../../../contexts/ThemeContext';
import DarkToggle from './DarkToggle';
import UserCards from './UserCards';
import UserInfo from './UserInfo';
import Wallet from './Wallet';

const UserSection = () => {
  const { theme } = useTheme();

  const background = theme === 'light'
    ? 'linear-gradient(120deg, color-mix(in srgb, var(--color-primary) 22%, white) 0%, white 100%)'
    : 'linear-gradient(120deg, rgba(32,224,150,0.13) 0%, rgba(33,45,45,0.10) 50%, rgba(20,31,31,0.13) 100%)';

  return (
    <div
      className='flex flex-col gap-2 border border-primary/10 w-full relative overflow-hidden rounded-lg p-2'
      style={{ background }}
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
          <Wallet />
        </div>
      </div>
      <div className='block sm:hidden w-full'>
        <UserCards />
      </div>
    </div>
  );
};

export default UserSection;
