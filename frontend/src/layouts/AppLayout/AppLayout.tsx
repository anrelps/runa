import type { ReactNode } from 'react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import IconSideNav from './components/IconSideNav';
import UserSection from './components/UserSection';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayoutInner = ({ children }: AppLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'light' ? 'light' : ''} flex h-screen bg-background-primary text-text-primary`}>
      <IconSideNav />
      <main className='flex-1 overflow-auto'>
        <div className='mx-auto mt-4 px-6 w-full max-w-6xl'>
          <UserSection />
          <div className='mt-10'>{children}</div>
        </div>
      </main>
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => (
  <ThemeProvider>
    <AppLayoutInner>{children}</AppLayoutInner>
  </ThemeProvider>
);

export default AppLayout;
