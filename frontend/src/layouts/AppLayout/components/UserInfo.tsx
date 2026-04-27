import { SignOutIcon } from '@phosphor-icons/react';
import { useDispatch, useSelector } from 'react-redux';
import avatarJpg from '../../../assets/avatar.jpg';
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
      <img
        src={avatarJpg}
        alt='Avatar'
        className='w-10 h-10 rounded-full border-2 border-primary/50 object-cover shrink-0'
      />
      <div className='lg:block xs:block sm:hidden md:hidden max-w-35'>
        <p className='text-sm font-medium text-text-primary leading-tight truncate'>
          {user?.name ?? '—'}
        </p>
        <p className='text-xs text-text-secondary leading-tight truncate'>
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
