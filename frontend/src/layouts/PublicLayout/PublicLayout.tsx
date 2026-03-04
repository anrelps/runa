import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import PublicNavBar from './components/PublicNavBar';

interface PublicLayoutProps {
  children?: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className='bg-background-primary text-text-primary min-h-screen flex flex-col'>
      <PublicNavBar />
      <main>{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
