import avatarImg from '../../../assets/images/user/test.jpg';

const UserInfo = () => {
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
    </div>
  );
};

export default UserInfo;
