import { ArrowRightIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { index } from '../../../redux/services/transactionsService';
import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';
import Card from '../../shared/components/Card';

// ── Types ─────────────────────────────────────────────────────────────────────

type TransactionType = 'expense' | 'income';

type Transaction = {
  id: number;
  title: string;
  category: category;
  amount: number;
  type: TransactionType;
  date: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatDateLabel = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Hoje';
  if (date.toDateString() === yesterday.toDateString()) return 'Ontem';

  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  });
};

function groupByDate(
  transactions: Transaction[],
): Record<string, Transaction[]> {
  return transactions.reduce<Record<string, Transaction[]>>((acc, t) => {
    (acc[t.date] = acc[t.date] || []).push(t);
    return acc;
  }, {});
}

function getDaySummary(transactions: Transaction[]): {
  income: number;
  expense: number;
} {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

type Props = {
  decorated?: boolean;
};

export default function RecentTransactions({ decorated = false }: Props) {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    index().then((res) => {
      const raw: any[] = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      const extractTitle = (desc: string) =>
        desc.match(/^Gasto de R\$ .+ em: (.+)$/)?.[1] ?? desc;

      const mapped: Transaction[] = raw
        .map((t) => ({
          id: t.id,
          title: extractTitle(t.description),
          category: t.category as category,
          amount: parseFloat(t.amount),
          type: t.type as TransactionType,
          date: t.date,
        }))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 8);
      setTransactions(mapped);
    });
  }, []);

  const grouped = groupByDate(transactions);
  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + t.amount, 0);

  return (
    <Card decorated={decorated}>
      {/* Header */}
      <div className='flex justify-between items-center mb-5 gap-2'>
        <div>
          <p className='text-xs font-medium uppercase tracking-widest text-text-secondary mb-1'>
            Transações Recentes
          </p>
          <p className='text-2xl font-bold leading-none tracking-tight text-text-primary'>
            {transactions.length}
            <span className='text-base font-normal text-text-secondary ml-1.5'>
              transações
            </span>
          </p>
        </div>

        <div className='flex gap-2'>
          <button
            onClick={() => navigate('/incomes')}
            className='flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border border-primary/20 bg-primary/8 text-primary hover:bg-primary/15'
          >
            Saldo <ArrowRightIcon size={11} weight='bold' />
          </button>
          <button
            onClick={() => navigate('/expenses')}
            className='flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border border-accent-start/20 bg-accent-start/8 text-accent-start hover:bg-accent-start/15'
          >
            Gastos <ArrowRightIcon size={11} weight='bold' />
          </button>
        </div>
      </div>

      {/* Summary chips */}
      <div className='grid grid-cols-2 gap-2.5 mb-5'>
        <SummaryChip label='Entradas' value={totalIncome} type='income' />
        <SummaryChip label='Saídas' value={totalExpense} type='expense' />
      </div>

      {/* Grouped transactions */}
      <div className='flex flex-col gap-5'>
        {dates.map((date) => {
          const { income, expense } = getDaySummary(grouped[date]);
          return (
            <div key={date}>
              {/* Date row */}
              <div className='flex items-center justify-between mb-2.5'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-semibold text-text-secondary'>
                    {formatDateLabel(date)}
                  </span>
                  <span className='h-px w-12 bg-border-card' />
                </div>
                <div className='flex items-center gap-2 text-[11px]'>
                  {income > 0 && (
                    <span className='text-primary font-semibold'>
                      +R$ {formatBRL(income)}
                    </span>
                  )}
                  {expense > 0 && (
                    <span className='text-accent-start font-semibold'>
                      -R$ {formatBRL(expense)}
                    </span>
                  )}
                </div>
              </div>

              {/* Transaction items */}
              <div className='flex flex-col gap-2'>
                {grouped[date].map((t) => (
                  <TransactionItem key={t.id} transaction={t} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type SummaryChipProps = {
  label: string;
  value: number;
  type: TransactionType;
};

const SummaryChip: React.FC<SummaryChipProps> = ({ label, value, type }) => {
  const isIncome = type === 'income';

  return (
    <div
      className={`flex flex-col py-3 px-4 rounded-xl border
        ${isIncome ? 'bg-primary/5 border-primary/15' : 'bg-accent-start/5 border-accent-start/15'}`}
    >
      <span className='text-[11px] tracking-wide text-text-secondary mb-1'>
        {label}
      </span>
      <span
        className={`text-base font-bold ${isIncome ? 'text-primary' : 'text-accent-start'}`}
      >
        R$ {formatBRL(value)}
      </span>
    </div>
  );
};

type TransactionItemProps = { transaction: Transaction };

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction: t,
}) => {
  const isIncome = t.type === 'income';
  const Icon = CATEGORY_ICONS[t.category];
  const accent = CATEGORY_ACCENTS[t.category];

  return (
    <div className='flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-border-card hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-200 cursor-pointer'>
      {/* Left: icon + info */}
      <div className='flex items-center gap-3 min-w-0'>
        <div
          className='w-9 h-9 rounded-xl flex items-center justify-center shrink-0'
          style={{ background: `${accent}18` }}
        >
          <Icon size={18} weight='duotone' style={{ color: accent }} />
        </div>

        <div className='flex flex-col min-w-0'>
          <div className='flex items-center gap-1.5 min-w-0'>
            <span className='truncate text-sm font-medium text-text-primary capitalize'>
              {t.title}
            </span>
          </div>
          {!isIncome && (
            <span
              className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
              style={{ background: accent, color: 'var(--color-background-primary)' }}
            >
              {t.category}
            </span>
          )}
        </div>
      </div>

      {/* Right: amount */}
      <div className='shrink-0 ml-3 text-right'>
        <p
          className={`text-sm font-bold ${isIncome ? 'text-primary' : 'text-accent-start'}`}
        >
          {isIncome ? '+' : '-'} R$ {formatBRL(t.amount)}
        </p>
      </div>
    </div>
  );
};
