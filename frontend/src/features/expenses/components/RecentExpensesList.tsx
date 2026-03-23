import { GiftIcon } from '@phosphor-icons/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { expensesIndex } from '../../../redux/slices/expensesSlice';
import { useAppDispatch } from '../../../redux/store';
import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Expense {
  id: number;
  description: string;
  category: category;
  total_amount: number;
  first_due_date: string;
  installment_count: number;
}

const groupByDate = (expenses: Expense[]): Record<string, Expense[]> =>
  expenses.reduce<Record<string, Expense[]>>((acc, exp) => {
    (acc[exp.first_due_date] = acc[exp.first_due_date] || []).push(exp);
    return acc;
  }, {});

const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const RecentExpensesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { expenses } = useSelector((state: any) => state.expenses);

  useEffect(() => {
    dispatch(expensesIndex({} as any));
  }, [dispatch]);

  const grouped = groupByDate(expenses);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const dateNodes: React.ReactNode[] = [];
  dates.forEach((date) => {
    const expenseNodes: React.ReactNode[] = [];
    grouped[date].forEach((exp) => {
      const Icon = CATEGORY_ICONS[exp.category] ?? GiftIcon;
      expenseNodes.push(
        <div
          key={exp.id}
          className='flex items-center justify-between p-3 rounded-xl
                     bg-white/3 border border-border-card'
        >
          <div className='flex items-center gap-3 min-w-0'>
            <Icon
              size={20}
              weight='duotone'
              style={{ color: CATEGORY_ACCENTS[exp.category] }}
            />

            <div className='flex flex-col min-w-0'>
              <span className='truncate text-sm font-medium text-text-primary'>
                {exp.description}
                {exp.installment_count > 1 && (
                  <span
                    className='ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold
                               align-middle bg-border-subtle text-text-secondary
                               border border-border-subtle inline-flex items-center leading-tight'
                  >
                    {exp.installment_count}x
                  </span>
                )}
              </span>
              <span
                className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
                style={{
                  background: CATEGORY_ACCENTS[exp.category],
                  color: 'var(--color-background-primary)',
                }}
              >
                {exp.category}
              </span>
            </div>
          </div>

          <div className='flex flex-col items-end shrink-0 ml-3'>
            <span className='text-sm font-bold text-accent-start'>
              R$ {formatBRL(exp.total_amount)}
            </span>
            <span className='text-xs text-text-secondary'>
              {new Date(exp.first_due_date).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
      );
    });

    dateNodes.push(
      <div key={date}>
        {/* Date divider */}
        <div className='flex items-center gap-2 mb-2'>
          <span className='text-xs font-semibold text-text-secondary whitespace-nowrap'>
            {new Date(date + 'T00:00:00').toLocaleDateString('pt-BR', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </span>
          <span
            className='flex-1 h-px bg-border-card'
            style={{ minWidth: 24 }}
          />
        </div>

        {/* Expense items */}
        <div className='flex flex-col gap-2.5'>{expenseNodes}</div>
      </div>
    );
  });

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-text-primary'>
        Últimos Gastos
      </h2>

      <div className='flex flex-col gap-6'>{dateNodes}</div>
    </div>
  );
};

export default RecentExpensesList;
