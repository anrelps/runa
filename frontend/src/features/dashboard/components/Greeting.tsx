import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import type { RootState } from '../../../redux/store';

const Greeting = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.user.user) as { name: string } | null;
  const firstName = user?.name?.split(' ')[0] ?? '';

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return t('dashboard.greeting.morning');
    if (hour >= 12 && hour < 18) return t('dashboard.greeting.afternoon');
    return t('dashboard.greeting.evening');
  };

  const getFormattedDate = (): string =>
    new Date().toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className='flex flex-col items-start sm:items-end gap-3 flex-1 sm:self-end'>
      <span
        className='text-4xl font-black uppercase leading-none tracking-tight text-left sm:text-right'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {getGreeting()},<br />{firstName}
      </span>
      <span
        className='text-xs font-medium uppercase tracking-widest'
        style={{ color: 'var(--color-text-secondary)', opacity: 0.5 }}
      >
        {getFormattedDate()}
      </span>
    </div>
  );
};

Greeting.displayName = 'Greeting';

export default Greeting;
