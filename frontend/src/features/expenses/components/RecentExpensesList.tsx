import {
  CarIcon,
  ForkKnifeIcon,
  GiftIcon,
  HeartbeatIcon,
  SparkleIcon,
} from '@phosphor-icons/react';
import React from 'react';

type Category = 'Alimentação' | 'Transporte' | 'Lazer' | 'Saúde' | 'Outros';

const CATEGORY_ICONS: Record<Category, React.ElementType> = {
  Alimentação: ForkKnifeIcon,
  Transporte: CarIcon,
  Lazer: SparkleIcon,
  Saúde: HeartbeatIcon,
  Outros: GiftIcon,
};

interface Expense {
  id: number;
  title: string;
  category: Category;
  amount: number;
  date: string;
  color: string;
  accent: string;
}

const MOCK_EXPENSES: Expense[] = [
  {
    id: 1,
    title: 'Supermercado',
    category: 'Alimentação',
    amount: 120.5,
    date: '2026-03-09',
    color: 'var(--color-accent-start, #ff6b4a)',
    accent: 'var(--color-accent-start, #ff6b4a)',
  },
  {
    id: 2,
    title: 'Uber',
    category: 'Transporte',
    amount: 32.0,
    date: '2026-03-09',
    color: 'var(--color-primary, #20e096)',
    accent: 'var(--color-primary, #20e096)',
  },
  {
    id: 3,
    title: 'Cinema',
    category: 'Lazer',
    amount: 45.0,
    date: '2026-03-08',
    color: 'var(--color-accent-orange, #ff9a4a)',
    accent: 'var(--color-accent-orange, #ff9a4a)',
  },
  {
    id: 4,
    title: 'Farmácia',
    category: 'Saúde',
    amount: 60.0,
    date: '2026-03-08',
    color: 'var(--color-accent-end, #00c6ff)',
    accent: 'var(--color-accent-end, #00c6ff)',
  },
  {
    id: 5,
    title: 'Café',
    category: 'Outros',
    amount: 15.0,
    date: '2026-03-07',
    color: 'var(--color-text-secondary, #6e8a85)',
    accent: 'var(--color-text-secondary, #6e8a85)',
  },
];

function groupByDate(expenses: Expense[]): Record<string, Expense[]> {
  return expenses.reduce<Record<string, Expense[]>>((acc, exp) => {
    (acc[exp.date] = acc[exp.date] || []).push(exp);
    return acc;
  }, {});
}

const RecentExpensesList: React.FC = () => {
  const grouped = groupByDate(MOCK_EXPENSES);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-(--color-border-card,rgba(32,224,150,0.08)) w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-(--color-text-primary,#fff)'>
        Últimos Gastos
      </h2>
      <div className='flex flex-col gap-10'>
        {dates.map((date) => (
          <div key={date}>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-semibold text-(--color-text-tertiary,#b6d1c9) whitespace-nowrap'>
                {new Date(date).toLocaleDateString('pt-BR', {
                  weekday: 'short',
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })}
              </span>
              <span
                className='flex-1 h-px bg-(--color-border-divider,#b6d1c922)'
                style={{ minWidth: 24 }}
              />
            </div>
            <div className='flex flex-col gap-3'>
              {grouped[date].map((exp) => {
                const Icon = CATEGORY_ICONS[exp.category] ?? GiftIcon;
                return (
                  <div
                    key={exp.id}
                    className='flex items-center justify-between p-3 rounded-xl shadow-sm'
                    style={{
                      background: 'rgba(255,255,255,0.01)',
                      border:
                        '1px solid var(--color-border-card, rgba(32,224,150,0.06))',
                    }}
                  >
                    <div className='flex items-center gap-3 min-w-0'>
                      <Icon
                        size={20}
                        weight='duotone'
                        style={{ color: exp.accent }}
                      />
                      <div className='flex flex-col min-w-0'>
                        <span className='truncate text-sm font-medium text-(--color-text-primary,#fff)'>
                          {exp.title}
                        </span>
                        <span
                          className='truncate text-xs font-semibold px-2 py-0.5 rounded-md mt-1 w-fit'
                          style={{
                            background: exp.accent,
                            color: '#fff',
                            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.08)',
                          }}
                        >
                          {exp.category}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col items-end'>
                      <span
                        className='text-base font-bold'
                        style={{ color: 'var(--color-accent-start, #ff6b4a)' }}
                      >
                        R$ {exp.amount.toFixed(2)}
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
