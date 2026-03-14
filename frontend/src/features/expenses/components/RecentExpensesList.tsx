import { GiftIcon } from '@phosphor-icons/react';
import React from 'react';

import type { category } from '../../../utils/consts';
import { CATEGORY_ICONS } from '../../../utils/consts';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Expense {
  id: number;
  title: string;
  category: category;
  amount: number;
  date: string;
  accent: string;
  isInstallment?: boolean;
  installmentInfo?: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    title: 'Supermercado',
    category: 'Alimentação',
    amount: 120.5,
    date: '2026-03-09',
    accent: 'var(--color-accent-start, #ff6b4a)',
    isInstallment: true,
    installmentInfo: '2/6',
  },
  {
    id: 2,
    title: 'Uber',
    category: 'Transporte',
    amount: 32.0,
    date: '2026-03-09',
    accent: 'var(--color-primary, #20e096)',
  },
  {
    id: 3,
    title: 'Cinema',
    category: 'Lazer',
    amount: 45.0,
    date: '2026-03-08',
    accent: 'var(--color-accent-orange, #ff9a4a)',
  },
  {
    id: 4,
    title: 'Farmácia',
    category: 'Saúde',
    amount: 60.0,
    date: '2026-03-08',
    accent: 'var(--color-accent-end, #00c6ff)',
  },
  {
    id: 5,
    title: 'Café',
    category: 'Outros',
    amount: 15.0,
    date: '2026-03-07',
    accent: 'var(--color-text-secondary, #6e8a85)',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupByDate(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce<Record<string, Expense[]>>((acc, exp) => {
    (acc[exp.date] = acc[exp.date] || []).push(exp);
    return acc;
  }, {});
}

const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// ── Component ─────────────────────────────────────────────────────────────────

const RecentExpensesList: React.FC = () => {
  const grouped = groupByDate(MOCK_EXPENSES);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-text-primary'>
        Últimos Gastos
      </h2>

      <div className='flex flex-col gap-6'>
        {dates.map((date) => (
          <div key={date}>
            {/* Date divider */}
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-semibold text-text-secondary whitespace-nowrap'>
                {new Date(date).toLocaleDateString('pt-BR', {
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
            <div className='flex flex-col gap-2.5'>
              {grouped[date].map((exp) => {
                const Icon = CATEGORY_ICONS[exp.category] ?? GiftIcon;

                return (
                  <div
                    key={exp.id}
                    className='flex items-center justify-between p-3 rounded-xl
                               bg-white/[0.03] border border-border-card'
                  >
                    <div className='flex items-center gap-3 min-w-0'>
                      <Icon
                        size={20}
                        weight='duotone'
                        style={{ color: exp.accent }}
                      />

                      <div className='flex flex-col min-w-0'>
                        <span className='truncate text-sm font-medium text-text-primary'>
                          {exp.title}
                          {exp.isInstallment && (
                            <span
                              className='ml-2 px-1.5 py-0.5 rounded text-[10px] font-semibold
                                         align-middle bg-white/10 text-text-secondary
                                         border border-white/10 inline-flex items-center leading-tight'
                            >
                              {exp.installmentInfo
                                ? `Parcela ${exp.installmentInfo}`
                                : 'Parcelado'}
                            </span>
                          )}
                        </span>
                        <span
                          className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
                          style={{ background: exp.accent, color: '#0b1212' }}
                        >
                          {exp.category}
                        </span>
                      </div>
                    </div>

                    <div className='flex flex-col items-end shrink-0 ml-3'>
                      <span className='text-sm font-bold text-accent-start'>
                        R$ {formatBRL(exp.amount)}
                      </span>
                      <span className='text-xs text-text-secondary'>
                        {new Date(exp.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpensesList;
