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
      <main className='flex-1 overflow-auto m-4'>
        <UserSection />
        <div className='mt-10'>{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
