import { ArrowCircleUpIcon } from '@phosphor-icons/react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface Income {
  id: number;
  description: string;
  amount: number;
  date: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const MOCK_INCOMES: Income[] = [
  { id: 1, description: 'Salário',        amount: 6500.00, date: '2026-03-05' },
  { id: 2, description: 'Freelance',      amount: 1200.00, date: '2026-03-05' },
  { id: 3, description: 'Dividendos',     amount: 340.50,  date: '2026-03-10' },
  { id: 4, description: 'Consultoria',    amount: 800.00,  date: '2026-03-12' },
  { id: 5, description: 'Venda produto',  amount: 150.00,  date: '2026-03-15' },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function groupByDate(incomes: Income[]): Record<string, Income[]> {
  return incomes.reduce<Record<string, Income[]>>((acc, inc) => {
    (acc[inc.date] = acc[inc.date] || []).push(inc);
    return acc;
  }, {});
}

const formatBRL = (value: number) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ── Component ──────────────────────────────────────────────────────────────────

const RecentIncomesList = () => {
  const grouped = groupByDate(MOCK_INCOMES);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-text-primary'>Rendas recentes</h2>

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
              <span className='flex-1 h-px bg-border-card' />
            </div>

            {/* Income items */}
            <div className='flex flex-col gap-2.5'>
              {grouped[date].map((inc) => (
                <div
                  key={inc.id}
                  className='flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-border-card'
                >
                  <div className='flex items-center gap-3 min-w-0'>
                    <ArrowCircleUpIcon
                      size={20}
                      weight='duotone'
                      style={{ color: 'var(--color-primary)', flexShrink: 0 }}
                    />
                    <span className='truncate text-sm font-medium text-text-primary'>
                      {inc.description}
                    </span>
                  </div>

                  <span className='text-sm font-bold shrink-0 ml-3' style={{ color: 'var(--color-primary)' }}>
                    + R$ {formatBRL(inc.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncomesList;
