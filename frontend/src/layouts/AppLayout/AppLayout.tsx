import type { ReactNode } from 'react';
import IconSideNav from './components/IconSideNav';
import UserSection from './components/UserSection';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className='flex h-screen bg-background-primary text-text-primary'>
      <IconSideNav />
      <main className='flex-1 overflow-auto'>
        <div className='mx-auto mt-4 px-4 w-full'>
          <UserSection />
          <div className='mt-10'>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
