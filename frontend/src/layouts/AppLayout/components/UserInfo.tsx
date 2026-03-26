import { SignOutIcon, UserCircleIcon } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import type { AppDispatch, RootState } from '../../../redux/store';

const UserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user) as {
    name: string;
    email: string;
  } | null;

  return (
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center shrink-0'>
        <UserCircleIcon size={24} weight='duotone' className='text-primary' />
      </div>
      <div className='lg:block xs:block sm:hidden md:hidden'>
        <p className='text-sm font-medium text-text-primary leading-tight'>
          {user?.name ?? '—'}
        </p>
        <p className='text-xs text-text-secondary leading-tight'>
          {user?.email ?? '—'}
        </p>
      </div>
      <button
        onClick={() => dispatch(logout())}
        className='p-1 text-text-secondary hover:text-red-500 transition-colors cursor-pointer'
        title='Sair'
      >
        <SignOutIcon size={16} />
      </button>
    </div>
  );
};

export default UserInfo;
