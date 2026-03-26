import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

// ── Helpers ───────────────────────────────────────────────────────────────────

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'Bom dia';
  if (hour >= 12 && hour < 18) return 'Boa tarde';
  return 'Boa noite';
};

const getFormattedDate = (): string =>
  new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

// ── Component ─────────────────────────────────────────────────────────────────

const Greeting = () => {
  const user = useSelector((state: RootState) => state.user.user) as { name: string } | null;
  const firstName = user?.name?.split(' ')[0] ?? '';

  return (
    <div className='flex flex-col items-end gap-3 flex-1 self-end'>
      <span
        className='text-4xl font-black uppercase leading-none tracking-tight text-right'
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
