import { SignOutIcon } from '@phosphor-icons/react';
import { useDispatch } from 'react-redux';
import avatarImg from '../../../assets/images/user/test.jpg';
import { logout } from '../../../redux/slices/userSlice';
import type { AppDispatch } from '../../../redux/store';

const UserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='flex items-center gap-3'>
      <img
        src={avatarImg}
        alt='Avatar'
        className='w-10 h-10 rounded-full object-cover border border-primary/50'
      />
      <div className='lg:block xs:block sm:hidden md:hidden'>
        <p className='text-sm font-medium text-text-primary leading-tight'>
          João Silva
        </p>
        <p className='text-xs text-text-secondary leading-tight'>
          joao.silva@email.com
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
