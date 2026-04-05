import { ArrowsClockwiseIcon, GiftIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useCurrencyBRL } from '../../../hooks/useCurrencyBRL';
import { index, indexRecurring } from '../../../redux/services/expensesService';
import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';
import Card from '../../shared/components/Card';

// ── Types ─────────────────────────────────────────────────────────────────────

type BillKind = 'recurring' | 'installment';

type Bill = {
  id: string;
  title: string;
  amount: number;
  due: number;
  kind: BillKind;
  badge?: string;
  category?: category;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const todayMidnight = (): Date => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const daysUntilRecurring = (dueDay: number): number => {
  const today = todayMidnight();
  const candidate = new Date(today.getFullYear(), today.getMonth(), dueDay);
  if (candidate < today) candidate.setMonth(candidate.getMonth() + 1);
  return Math.round((candidate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const currentInstallmentNum = (firstDueDate: string, count: number): number => {
  const start = new Date(`${firstDueDate}T00:00:00`);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.min(Math.max(months + 1, 1), count);
};

const daysUntilInstallmentByDate = (firstDueDate: string, count: number): number => {
  const current = currentInstallmentNum(firstDueDate, count);
  const due = new Date(`${firstDueDate}T00:00:00`);
  due.setMonth(due.getMonth() + current - 1);
  return Math.round((due.getTime() - todayMidnight().getTime()) / (1000 * 60 * 60 * 24));
};


const dueLabel = (d: number): string => {
  if (d === 0) return 'Hoje';
  if (d === 1) return 'Amanhã';
  if (d < 0) return `Há ${Math.abs(d)} dia${Math.abs(d) > 1 ? 's' : ''}`;
  return `Em ${d} dias`;
};

const formatBRL = (v: number) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Component ─────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

export default function PendingBills({ decorated = false }: Props) {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [recRes, instRes] = await Promise.all([
        indexRecurring(),
        index({ type: 'installment' }),
      ]);

      const recRaw: any[] = Array.isArray(recRes) ? recRes : Array.isArray(recRes?.data) ? recRes.data : [];
      const instRaw: any[] = Array.isArray(instRes) ? instRes : Array.isArray(instRes?.data) ? instRes.data : [];

      const recurring: Bill[] = recRaw
        .filter((r) => r.active)
        .map((r) => ({
          id: `rec-${r.id}`,
          title: r.description,
          amount: parseFloat(r.amount),
          due: daysUntilRecurring(r.due_day),
          kind: 'recurring' as BillKind,
          badge: `dia ${r.due_day}`,
        }));

      const installments: Bill[] = instRaw.flatMap((e) => {
        // com dados detalhados de parcelas vindos do backend
        if (e.installments?.length) {
          const sorted = [...(e.installments as any[])].sort(
            (a, b) => a.installment_number - b.installment_number,
          );
          const next = sorted.find((inst) => !inst.paid_at);
          if (!next) return [];
          const due = new Date(`${next.due_date}T00:00:00`);
          const diff = Math.round((due.getTime() - todayMidnight().getTime()) / 86400000);
          return [{
            id: `inst-${e.id}`,
            title: e.description ?? 'Sem descrição',
            amount: parseFloat(next.amount),
            due: diff,
            kind: 'installment' as BillKind,
            badge: `${next.installment_number}/${e.installment_count}`,
            category: e.category as category,
          }];
        }
        // fallback sem dados detalhados
        if (!e.first_due_date || !e.installment_count) return [];
        const current = currentInstallmentNum(e.first_due_date, e.installment_count);
        if (current > e.installment_count) return [];
        return [{
          id: `inst-${e.id}`,
          title: e.description ?? 'Sem descrição',
          amount: parseFloat(e.total_amount) / e.installment_count,
          due: daysUntilInstallmentByDate(e.first_due_date, e.installment_count),
          kind: 'installment' as BillKind,
          badge: `${current}/${e.installment_count}`,
          category: e.category as category,
        }];
      });

      const all = [...recurring, ...installments].sort((a, b) => a.due - b.due);
      setBills(all);
    };

    fetchAll();
  }, []);

  const totalAmount = bills.reduce((s, b) => s + b.amount, 0);
  const recurringCount = bills.filter((b) => b.kind === 'recurring').length;
  const installmentCount = bills.filter((b) => b.kind === 'installment').length;
  const todayCount = bills.filter((b) => b.due === 0).length;

  return (
    <Card decorated={decorated}>
      {/* Header */}
      <div className='flex justify-between items-center mb-4 gap-2'>
        <div>
          <p className='text-xs font-medium uppercase tracking-widest text-text-secondary mb-1'>
            Contas Pendentes
          </p>
          <p className='text-2xl font-bold leading-none tracking-tight text-text-primary'>
            <span className='text-lg font-normal text-text-secondary mr-1'>R$</span>
            {formatBRL(totalAmount)}
          </p>
        </div>

        {todayCount > 0 && (
          <div className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-accent-start/15 border border-accent-start/30 text-accent-start'>
            <span className='w-1.5 h-1.5 rounded-full bg-accent-start animate-pulse' />
            {todayCount} hoje
          </div>
        )}
      </div>

      {/* Summary chips */}
      <div className='grid grid-cols-3 gap-2 mb-4'>
        <StatChip value={bills.length} label='Total' valueColor='text-text-primary' />
        <StatChip value={recurringCount} label='Recorrentes' valueColor='text-primary' />
        <StatChip value={installmentCount} label='Parceladas' valueColor='text-accent-start' />
      </div>

      {/* Bills list */}
      {bills.length === 0 ? (
        <p className='text-sm text-text-secondary text-center py-4'>
          Nenhuma conta pendente.
        </p>
      ) : (
        <div className='flex flex-col gap-2'>
          {bills.map((bill) => (
            <BillItem key={bill.id} bill={bill} />
          ))}
        </div>
      )}
    </Card>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

const StatChip: React.FC<{ value: number; label: string; valueColor: string }> = ({
  value,
  label,
  valueColor,
}) => (
  <div className='flex flex-col items-center py-3 px-2 rounded-xl text-center bg-white/5 border border-border-card'>
    <span className={`text-xl font-bold leading-none mb-1 ${valueColor}`}>{value}</span>
    <span className='text-[11px] tracking-wide text-text-secondary'>{label}</span>
  </div>
);

const BillItem: React.FC<{ bill: Bill }> = ({ bill }) => {
  const isToday = bill.due === 0;
  const isSoon = bill.due > 0 && bill.due <= 3;
  const formatted = useCurrencyBRL(bill.amount);

  const safeCategory = bill.category;
  const Icon =
    bill.kind === 'recurring'
      ? ArrowsClockwiseIcon
      : safeCategory
        ? (CATEGORY_ICONS[safeCategory] ?? GiftIcon)
        : GiftIcon;

  const iconColor =
    bill.kind === 'recurring'
      ? 'var(--color-primary)'
      : safeCategory
        ? CATEGORY_ACCENTS[safeCategory]
        : 'var(--color-text-secondary)';

  const borderColor = isToday
    ? 'border-accent-orange/60'
    : isSoon
      ? 'border-primary/30'
      : 'border-border-card';

  const bgColor = isToday ? 'bg-accent-orange/10' : isSoon ? 'bg-primary/5' : 'bg-white/5';

  const dueColor = isToday
    ? 'text-accent-orange font-semibold'
    : isSoon
      ? 'text-primary font-semibold'
      : 'text-text-secondary';

  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border ${borderColor} ${bgColor}`}>
      <div className='flex items-center gap-3 min-w-0'>
        <div
          className='w-9 h-9 rounded-xl flex items-center justify-center shrink-0'
          style={{ background: `${iconColor}18` }}
        >
          <Icon size={18} weight='duotone' style={{ color: iconColor }} />
        </div>
        <div className='flex flex-col min-w-0'>
          <div className='flex items-center gap-1.5'>
            <span className='truncate text-sm font-medium text-text-primary capitalize'>
              {bill.title}
            </span>
            {bill.badge && (
              <span className='shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-border-subtle text-text-secondary border border-border-subtle'>
                {bill.badge}
              </span>
            )}
          </div>
          {bill.kind === 'installment' && safeCategory && (
            <span
              className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
              style={{ background: iconColor, color: 'var(--color-background-primary)' }}
            >
              {safeCategory}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col items-end shrink-0 ml-3'>
        <span className='text-sm font-bold text-text-primary'>{formatted}</span>
        <span className={`text-xs ${dueColor}`}>{dueLabel(bill.due)}</span>
      </div>
    </div>
  );
};
