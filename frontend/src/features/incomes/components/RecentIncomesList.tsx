import { GiftIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCurrencyBRL } from '../../../hooks/useCurrencyBRL';
import {
  selectTransactions,
  transactionDelete,
  transactionsIndex,
} from '../../../redux/slices/transactionsSlice';
import { useAppDispatch, type RootState } from '../../../redux/store';
import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';

interface Income {
  id: number;
  description?: string;
  category?: category;
  amount?: number;
  date?: string;
  [key: string]: any;
}

const groupByDate = (incomes: Income[]): Record<string, Income[]> =>
  incomes.reduce<Record<string, Income[]>>((acc, income) => {
    const key = income.date ?? 'Sem data';
    if (!acc[key]) acc[key] = [];
    acc[key].push(income);
    return acc;
  }, {});

interface IncomeItemProps {
  income: Income;
  isActive: boolean;
  onActivate: (id: number) => void;
  onClose: () => void;
}

const IncomeItem: React.FC<IncomeItemProps> = ({
  income,
  isActive,
  onActivate,
  onClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const safeCategory = income.category;
  const Icon = safeCategory
    ? (CATEGORY_ICONS[safeCategory] ?? GiftIcon)
    : GiftIcon;
  const formattedAmount = useCurrencyBRL(income.amount ?? 0);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, onClose]);

  const handleDelete = async () => {
    onClose();
    await dispatch(transactionDelete(income.id));
    dispatch(transactionsIndex({ type: 'income' }));
  };

  return (
    <div
      ref={ref}
      className='relative flex items-center justify-between p-3 rounded-xl bg-white/3 border border-border-card overflow-hidden'
    >
      <div className='flex items-center gap-3 min-w-0'>
        <Icon
          size={20}
          weight='duotone'
          style={{
            color: safeCategory
              ? CATEGORY_ACCENTS[safeCategory]
              : 'var(--color-text-secondary)',
          }}
        />

        <div className='flex flex-col min-w-0'>
          <span className='truncate text-sm font-medium text-text-primary capitalize'>
            {income.description ?? 'Sem descrição'}
          </span>

          {safeCategory && (
            <span
              className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
              style={{
                background: CATEGORY_ACCENTS[safeCategory],
                color: 'var(--color-background-primary)',
              }}
            >
              {safeCategory}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col items-end shrink-0 ml-3'>
        <span className='text-sm font-bold text-accent-start'>
          {formattedAmount}
        </span>
        <span className='text-xs text-text-secondary'>
          {income.date
            ? new Date(`${income.date}T00:00:00`).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
              })
            : '--/--'}
        </span>
      </div>

      {!isActive && (
        <button
          type='button'
          aria-label='Opções'
          onClick={() => onActivate(income.id)}
          className='absolute inset-0 cursor-pointer'
        />
      )}

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='absolute inset-0 flex items-center justify-center gap-3 rounded-xl'
            style={{
              background:
                'color-mix(in srgb, var(--color-background-card) 85%, transparent)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <motion.button
              type='button'
              onClick={() => navigate(`/incomes/${income.id}/edit`)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors'
              style={{
                background:
                  'color-mix(in srgb, var(--color-accent-start) 15%, transparent)',
                border:
                  '1px solid color-mix(in srgb, var(--color-accent-start) 30%, transparent)',
                color: 'var(--color-accent-start)',
              }}
            >
              <PencilSimpleIcon size={14} weight='bold' />
              Editar
            </motion.button>

            <motion.button
              type='button'
              onClick={handleDelete}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors'
              style={{
                background: 'color-mix(in srgb, #ef4444 15%, transparent)',
                border:
                  '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
                color: '#ef4444',
              }}
            >
              <TrashIcon size={14} weight='bold' />
              Remover
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecentIncomesList: React.FC = () => {
  const incomes = useSelector((state: RootState) =>
    selectTransactions(state),
  ) as Income[];
  const [activeId, setActiveId] = useState<number | null>(null);

  const grouped = groupByDate(incomes);

  const dates = Object.keys(grouped).sort((a, b) => {
    if (a === 'Sem data') return 1;
    if (b === 'Sem data') return -1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  if (!incomes.length) {
    return (
      <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
        <h2 className='text-lg font-semibold mb-4 text-text-primary'>
          Últimos Saldos
        </h2>
        <p className='text-sm text-text-secondary'>
          Nenhum saldo encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-text-primary'>
        Últimos Saldos
      </h2>

      <div className='flex flex-col gap-6'>
        {dates.map((date) => (
          <div key={date}>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-semibold text-text-secondary'>
                {date === 'Sem data'
                  ? 'Sem data'
                  : new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
              </span>
              <span className='flex-1 h-px bg-border-card' />
            </div>

            <div className='flex flex-col gap-2.5'>
              {grouped[date].map((income) => (
                <IncomeItem
                  key={income.id}
                  income={income}
                  isActive={activeId === income.id}
                  onActivate={setActiveId}
                  onClose={() => setActiveId(null)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncomesList;
