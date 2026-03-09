import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { TrendDownIcon, TrendUpIcon, WalletIcon } from '@phosphor-icons/react';

const UserCards = () => {
  return (
    <div className='grid gap-2 grid-cols-1 sm:grid-cols-3 max-w-2xl'>
      <Card
        title='Gastos do mês'
        value='R$ 3.250,00'
        Icon={TrendDownIcon}
        color='red'
      />
      <Card
        title='Ganhos do mês'
        value='R$ 8.500,00'
        Icon={TrendUpIcon}
        color='green'
      />
      <Card
        title='Saldo restante'
        value='R$ 5.250,00'
        Icon={WalletIcon}
        color='blue'
      />
    </div>
  );
};

const colorMap = {
  red: {
    gradient: 'from-red-600 to-rose-500',
    icon: 'text-red-400',
    iconBg: 'text-red-400/20',
    hoverText: 'text-rose-200',
  },
  green: {
    gradient: 'from-emerald-600 to-primary',
    icon: 'text-primary',
    iconBg: 'text-primary/20',
    hoverText: 'text-emerald-200',
  },
  blue: {
    gradient: 'from-sky-600 to-blue-500',
    icon: 'text-sky-400',
    iconBg: 'text-sky-400/20',
    hoverText: 'text-sky-200',
  },
};

const Card = ({
  title,
  value,
  Icon,
  color,
}: {
  title: string;
  value: string;
  Icon: PhosphorIcon;
  color: keyof typeof colorMap;
}) => {
  const colors = colorMap[color];

  return (
    <div className='group w-full px-3 py-2 rounded-lg border border-white/10 relative overflow-hidden bg-background-card cursor-default'>
      <div
        className={`absolute inset-0 bg-linear-to-r ${colors.gradient} translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
      />

      <Icon
        weight='duotone'
        className={`absolute z-10 -top-4 -right-4 ${colors.iconBg} group-hover:text-white/20 group-hover:rotate-12 transition-all duration-300`}
        size={64}
      />

      <div className='relative z-10 flex items-center gap-2'>
        <Icon
          weight='duotone'
          className={`${colors.icon} group-hover:text-white transition-colors duration-300 shrink-0`}
          size={18}
        />
        <div className='min-w-0'>
          <p className='text-xs text-text-secondary group-hover:text-white/70 duration-300 leading-tight'>
            {title}
          </p>
          <p
            className={`text-sm font-bold text-text-primary group-hover:${colors.hoverText} duration-300 leading-tight`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCards;
