import { GiftIcon } from '@phosphor-icons/react';

import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';
import Card from '../../shared/components/Card';

// ── Types ────────────────────────────────────────────────────────────────────

type Bill = {
  title: string;
  category: category;
  amount: number;
  due: number;
};

// ── Data ─────────────────────────────────────────────────────────────────────

const bills: Bill[] = [
  { title: 'Aluguel', category: 'Outros', amount: 1850, due: -3 },
  { title: 'Cartão Nubank', category: 'Outros', amount: 632.4, due: 0 },
  { title: 'Energia Elétrica', category: 'Outros', amount: 189.9, due: 3 },
  { title: 'Plano de Saúde', category: 'Saúde', amount: 420, due: 5 },
  { title: 'Internet', category: 'Outros', amount: 119.9, due: 8 },
  { title: 'Streaming', category: 'Lazer', amount: 55.9, due: 12 },
];

const PAID_COUNT = 3;

// ── Helpers ───────────────────────────────────────────────────────────────────

const dueLabel = (d: number): string => {
  if (d < 0)
    return `Atrasada há ${Math.abs(d)} dia${Math.abs(d) > 1 ? 's' : ''}`;
  if (d === 0) return 'Vence hoje';
  if (d === 1) return 'Vence amanhã';
  return `Vence em ${d} dias`;
};

const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Component ─────────────────────────────────────────────────────────────────

type Props = {
  decorated?: boolean;
};

export default function PendingBills({ decorated = false }: Props) {
  const totalAmount = bills.reduce((s, b) => s + b.amount, 0);
  const total = bills.length + PAID_COUNT;
  const pct = Math.round((PAID_COUNT / total) * 100);
  const overdueCount = bills.filter((b) => b.due < 0).length;
  const todayCount = bills.filter((b) => b.due === 0).length;
  const upcomingCount = bills.filter((b) => b.due > 0).length;

  return (
    <Card decorated={decorated}>
      {/* Header */}
      <div className='flex justify-between items-center mb-4 gap-2'>
        <div>
          <p className='text-xs font-medium uppercase tracking-widest text-text-secondary mb-1'>
            Contas Pendentes
          </p>
          <p className='text-2xl font-bold leading-none tracking-tight text-text-primary'>
            <span className='text-lg font-normal text-text-secondary mr-1'>
              R$
            </span>
            {formatBRL(totalAmount)}
          </p>
        </div>

        <div
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                        bg-accent-start/15 border border-accent-start/30 text-accent-start'
        >
          <span className='w-1.5 h-1.5 rounded-full bg-accent-start animate-pulse' />
          {bills.length} contas
        </div>
      </div>

      {/* Summary chips */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        <StatChip
          value={overdueCount}
          label='Atrasadas'
          valueColor='text-accent-start'
        />
        <StatChip
          value={todayCount}
          label='Hoje'
          valueColor='text-accent-orange'
        />
        <StatChip
          value={upcomingCount}
          label='Próx.'
          valueColor='text-primary'
        />
      </div>

      {/* Progress bar */}
      <div className='mb-4'>
        <div className='flex justify-between text-xs text-text-secondary mb-1.5'>
          <span>Pago este mês</span>
          <strong className='text-primary'>{pct}%</strong>
        </div>
        <div className='h-1.5 rounded-full bg-border-subtle overflow-hidden'>
          <div
            className='h-full rounded-full bg-gradient-to-r from-accent-start to-accent-orange
                       transition-all duration-700'
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Bills list */}
      <div className='flex flex-col gap-2'>
        {bills.map((bill) => (
          <BillItem key={bill.title} bill={bill} />
        ))}
      </div>
    </Card>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

type StatChipProps = { value: number; label: string; valueColor: string };

const StatChip: React.FC<StatChipProps> = ({ value, label, valueColor }) => (
  <div
    className='flex flex-col items-center py-3 px-2 rounded-xl text-center
                  bg-white/5 border border-border-card'
  >
    <span className={`text-xl font-bold leading-none mb-1 ${valueColor}`}>
      {value}
    </span>
    <span className='text-[11px] tracking-wide text-text-secondary'>
      {label}
    </span>
  </div>
);

type BillItemProps = { bill: Bill };

const BillItem: React.FC<BillItemProps> = ({ bill }) => {
  const isOverdue = bill.due < 0;
  const isToday = bill.due === 0;

  const Icon = CATEGORY_ICONS[bill.category] ?? GiftIcon;
  const accent =
    CATEGORY_ACCENTS[bill.category] ?? 'var(--color-text-secondary)';

  const borderColor = isOverdue
    ? 'border-accent-start/60'
    : isToday
      ? 'border-accent-orange/60'
      : 'border-border-card';

  const bgColor = isOverdue
    ? 'bg-accent-start/10'
    : isToday
      ? 'bg-accent-orange/10'
      : 'bg-white/5';

  const amountColor = isOverdue
    ? 'text-accent-start'
    : isToday
      ? 'text-accent-orange'
      : 'text-text-primary';

  const dueColor = isOverdue
    ? 'text-accent-start font-semibold'
    : isToday
      ? 'text-accent-orange font-semibold'
      : 'text-text-secondary';

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl border ${borderColor} ${bgColor}`}
    >
      <div className='flex items-center gap-3 min-w-0'>
        <Icon size={20} weight='duotone' style={{ color: accent }} />

        <div className='flex flex-col min-w-0'>
          <span className='truncate text-sm font-medium text-text-primary'>
            {bill.title}
          </span>
          <span
            className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
            style={{ background: accent, color: 'var(--color-background-primary)' }}
          >
            {bill.category}
          </span>
        </div>
      </div>

      <div className='flex flex-col items-end shrink-0 ml-3'>
        <span className={`text-sm font-bold ${amountColor}`}>
          R$ {formatBRL(bill.amount)}
        </span>
        <span className={`text-xs ${dueColor}`}>{dueLabel(bill.due)}</span>
      </div>
    </div>
  );
};
