import { ArrowsClockwiseIcon, GiftIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useCurrencyBRL } from '../../hooks/useCurrencyBRL';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { indexRecurring } from '../../redux/services/expensesService';
import { index } from '../../redux/services/expensesService';
import type { category } from '../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../utils/consts';

// ── Types ───────────────────────────────────────────────────────────────────

interface RecurringExpense {
  id: number;
  description: string;
  amount: number;
  due_day: number;
  active: boolean | number;
}

interface InstallmentExpense {
  id: number;
  description?: string;
  category?: category;
  total_amount?: number;
  first_due_date?: string;
  installment_count?: number;
  [key: string]: any;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const currentInstallment = (firstDueDate: string, count: number): number => {
  const start = new Date(`${firstDueDate}T00:00:00`);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.min(Math.max(months + 1, 1), count);
};

const nextDueDate = (firstDueDate: string, current: number): string => {
  const start = new Date(`${firstDueDate}T00:00:00`);
  start.setMonth(start.getMonth() + current - 1);
  return start.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
};

// ── Sub-components ───────────────────────────────────────────────────────────

const SectionHeader = ({ title, count }: { title: string; count: number }) => (
  <div className='flex items-center gap-3 mb-3'>
    <h2 className='text-base font-bold text-text-primary'>{title}</h2>
    <span className='text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 text-text-secondary'>
      {count}
    </span>
    <span className='flex-1 h-px bg-border-card' />
  </div>
);

const RecurringCard = ({ item }: { item: RecurringExpense }) => {
  const formatted = useCurrencyBRL(item.amount);
  return (
    <div className='flex items-center justify-between p-3 rounded-xl bg-white/3 border border-border-card'>
      <div className='flex items-center gap-3 min-w-0'>
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
          style={{ background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)' }}
        >
          <ArrowsClockwiseIcon size={16} weight='duotone' className='text-primary' />
        </div>
        <div className='flex flex-col min-w-0'>
          <span className='text-sm font-medium text-text-primary capitalize truncate'>
            {item.description}
          </span>
          <span className='text-xs text-text-secondary'>todo dia {item.due_day}</span>
        </div>
      </div>
      <div className='flex flex-col items-end shrink-0 ml-3'>
        <span className='text-sm font-bold text-accent-start'>{formatted}</span>
        <span
          className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5'
          style={{
            background: item.active
              ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
              : 'color-mix(in srgb, var(--color-text-secondary) 12%, transparent)',
            color: item.active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          }}
        >
          {item.active ? 'ativa' : 'inativa'}
        </span>
      </div>
    </div>
  );
};

const InstallmentCard = ({ item }: { item: InstallmentExpense }) => {
  const count = item.installment_count ?? 1;
  const current = item.first_due_date ? currentInstallment(item.first_due_date, count) : 1;
  const remaining = count - current + 1;
  const amountPerInstallment = (item.total_amount ?? 0) / count;
  const formattedInstallment = useCurrencyBRL(amountPerInstallment);
  const formattedTotal = useCurrencyBRL(item.total_amount ?? 0);
  const progress = ((current - 1) / count) * 100;

  const safeCategory = item.category;
  const Icon = safeCategory ? (CATEGORY_ICONS[safeCategory] ?? GiftIcon) : GiftIcon;
  const accentColor = safeCategory ? CATEGORY_ACCENTS[safeCategory] : 'var(--color-text-secondary)';

  const nextDate = item.first_due_date
    ? nextDueDate(item.first_due_date, current)
    : null;

  return (
    <div className='flex flex-col gap-2 p-3 rounded-xl bg-white/3 border border-border-card'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3 min-w-0'>
          <div
            className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
            style={{ background: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
          >
            <Icon size={16} weight='duotone' style={{ color: accentColor }} />
          </div>
          <div className='flex flex-col min-w-0'>
            <div className='flex items-center gap-2'>
              <span className='text-sm font-medium text-text-primary capitalize truncate'>
                {item.description ?? 'Sem descrição'}
              </span>
              <span className='shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-border-subtle text-text-secondary border border-border-subtle'>
                {current}/{count}
              </span>
            </div>
            {safeCategory && (
              <span
                className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
                style={{ background: accentColor, color: 'var(--color-background-primary)' }}
              >
                {safeCategory}
              </span>
            )}
          </div>
        </div>
        <div className='flex flex-col items-end shrink-0 ml-3'>
          <span className='text-sm font-bold text-accent-start'>{formattedInstallment}</span>
          <span className='text-[10px] text-text-secondary'>total {formattedTotal}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className='flex items-center gap-2'>
        <div className='flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden'>
          <div
            className='h-full rounded-full transition-all'
            style={{
              width: `${progress}%`,
              background: 'var(--color-accent-start)',
            }}
          />
        </div>
        <span className='text-[10px] text-text-secondary shrink-0'>
          {remaining} restante{remaining !== 1 ? 's' : ''}
          {nextDate ? ` · vence ${nextDate}` : ''}
        </span>
      </div>
    </div>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const Commitments = () => {
  const [recurring, setRecurring] = useState<RecurringExpense[]>([]);
  const [installments, setInstallments] = useState<InstallmentExpense[]>([]);

  useEffect(() => {
    indexRecurring().then((res) => {
      const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      setRecurring(data);
    });

    index({ type: 'installment' }).then((res) => {
      const raw: InstallmentExpense[] = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : [];
      // only show those with pending installments
      const pending = raw.filter((e) => {
        if (!e.first_due_date || !e.installment_count) return false;
        const current = currentInstallment(e.first_due_date, e.installment_count);
        return current <= e.installment_count;
      });
      setInstallments(pending);
    });
  }, []);

  return (
    <AppLayout>
      <div className='flex flex-col gap-8'>
        <div>
          <SectionHeader title='Recorrentes' count={recurring.length} />
          {recurring.length === 0 ? (
            <p className='text-sm text-text-secondary'>Nenhuma despesa recorrente.</p>
          ) : (
            <div className='flex flex-col gap-2.5'>
              {recurring.map((item) => (
                <RecurringCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title='Parceladas pendentes' count={installments.length} />
          {installments.length === 0 ? (
            <p className='text-sm text-text-secondary'>Nenhuma parcela pendente.</p>
          ) : (
            <div className='flex flex-col gap-2.5'>
              {installments.map((item) => (
                <InstallmentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Commitments;
