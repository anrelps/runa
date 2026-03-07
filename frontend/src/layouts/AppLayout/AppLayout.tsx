import type { ReactNode } from 'react';
import IconSideNav from './components/IconSideNav';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className='flex h-screen bg-background-primary text-text-primary'>
      <IconSideNav />
      <main className='flex-1 overflow-auto'>{children}</main>
    </div>
  );
};

export default AppLayout;
