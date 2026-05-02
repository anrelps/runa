import { ArrowsClockwiseIcon, GiftIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '../../../features/shared/components/ConfirmDialog';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCurrencyBRL } from '../../../hooks/useCurrencyBRL';
import { indexRecurring } from '../../../redux/services/expensesService';
import {
  expensesDelete,
  expensesIndex,
  selectExpenses,
} from '../../../redux/slices/expensesSlice';
import { useAppDispatch, type RootState } from '../../../redux/store';
import api from '../../../utils/api';
import type { category } from '../../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../../utils/consts';

interface Expense {
  id: number;
  description?: string;
  category?: category;
  total_amount?: number;
  first_due_date?: string;
  installment_count?: number;
  created_at?: string;
  isRecurring?: boolean;
  recurringId?: number;
  due_day?: number;
  [key: string]: any;
}

const currentMonthDate = (day: number): string => {
  const now = new Date();
  const d = String(day).padStart(2, '0');
  const m = String(now.getMonth() + 1).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
};

const groupByDate = (expenses: Expense[]): Record<string, Expense[]> =>
  expenses.reduce<Record<string, Expense[]>>((acc, exp) => {
    const key = exp.first_due_date ?? 'Sem data';
    if (!acc[key]) acc[key] = [];
    acc[key].push(exp);
    return acc;
  }, {});

interface ExpenseItemProps {
  exp: Expense;
  isActive: boolean;
  onActivate: (id: number) => void;
  onClose: () => void;
  onRecurringDeleted?: (id: number) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({
  exp,
  isActive,
  onActivate,
  onClose,
  onRecurringDeleted,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const safeCategory = exp.category;
  const Icon = exp.isRecurring
    ? ArrowsClockwiseIcon
    : safeCategory
      ? (CATEGORY_ICONS[safeCategory] ?? GiftIcon)
      : GiftIcon;

  const formattedAmount = useCurrencyBRL(exp.total_amount ?? 0);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isActive, onClose]);

  const handleDelete = async () => {
    setConfirming(false);
    onClose();
    if (exp.isRecurring && exp.recurringId != null) {
      await api.delete(`/recurring-expenses/${exp.recurringId}`);
      onRecurringDeleted?.(exp.recurringId);
    } else {
      await dispatch(expensesDelete(exp.id));
      dispatch(expensesIndex({ page: 1, per_page: 12 }));
    }
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
            color: exp.isRecurring
              ? 'var(--color-primary)'
              : safeCategory
                ? CATEGORY_ACCENTS[safeCategory]
                : 'var(--color-text-secondary)',
          }}
        />

        <div className='flex flex-col min-w-0'>
          <div className='flex items-center gap-2 min-w-0'>
            <span className='truncate text-sm font-medium text-text-primary capitalize'>
              {exp.description ?? t('common.noDescription')}
            </span>

            {(exp.installment_count ?? 0) > 1 && exp.first_due_date && (
              <span className='shrink-0 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-border-subtle text-text-secondary border border-border-subtle'>
                {exp.installment_count}x
              </span>
            )}

            {exp.isRecurring && (
              <span
                className='shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded'
                style={{
                  background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                  color: 'var(--color-primary)',
                }}
              >
                {t('expense.recurring.dayPrefix')} {exp.due_day}
              </span>
            )}
          </div>

          {!exp.isRecurring && safeCategory && (
            <span
              className='text-[10px] font-semibold px-1.5 py-0.5 rounded mt-0.5 w-fit'
              style={{
                background: CATEGORY_ACCENTS[safeCategory],
                color: 'var(--color-background-primary)',
              }}
            >
              {t(`categories.${safeCategory}`)}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col items-end shrink-0 ml-3'>
        <span className='text-sm font-bold text-accent-start'>{formattedAmount}</span>
        <span className='text-xs text-text-secondary'>
          {exp.isRecurring
            ? t('expense.recurring.monthly')
            : exp.created_at
              ? new Date(exp.created_at).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '--:--'}
        </span>
      </div>

      {!isActive && (
        <button
          type='button'
          aria-label='Opções'
          onClick={() => onActivate(exp.id)}
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
              background: 'color-mix(in srgb, var(--color-background-card) 85%, transparent)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {!exp.isRecurring && (
              <motion.button
                type='button'
                onClick={() => navigate(`/expenses/${exp.id}/edit`)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15, delay: 0.05 }}
                className='flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors'
                style={{
                  background: 'color-mix(in srgb, var(--color-accent-start) 15%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent-start) 30%, transparent)',
                  color: 'var(--color-accent-start)',
                }}
              >
                <PencilSimpleIcon size={14} weight='bold' />
                {t('common.edit')}
              </motion.button>
            )}

            <motion.button
              type='button'
              onClick={() => setConfirming(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, delay: exp.isRecurring ? 0.05 : 0.08 }}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors'
              style={{
                background: 'color-mix(in srgb, #ef4444 15%, transparent)',
                border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
                color: '#ef4444',
              }}
            >
              <TrashIcon size={14} weight='bold' />
                {t('common.remove')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirming}
        title={t('expense.removeTitle')}
        description={`${t('expense.removeConfirm')} "${exp.description ?? t('expense.removeThis')}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
};

const RecentExpensesList: React.FC<{ activeCategory?: string | null }> = ({ activeCategory }) => {
  const { t } = useTranslation();
  const expenses = useSelector((state: RootState) => selectExpenses(state)) as Expense[];
  const [recurring, setRecurring] = useState<Expense[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    indexRecurring().then((res) => {
      const raw: any[] = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
      const normalized: Expense[] = raw.map((r) => ({
        id: -r.id,
        recurringId: r.id,
        description: r.description,
        total_amount: r.amount,
        first_due_date: currentMonthDate(r.due_day),
        due_day: r.due_day,
        isRecurring: true,
      }));
      setRecurring(normalized);
    });
  }, []);

  const handleRecurringDeleted = (id: number) => {
    setRecurring((prev) => prev.filter((r) => r.recurringId !== id));
  };

  const visibleRecurring = activeCategory ? [] : recurring;
  const allExpenses = [...expenses, ...visibleRecurring];

  const grouped = groupByDate(allExpenses);

  const dates = Object.keys(grouped).sort((a, b) => {
    if (a === 'Sem data') return 1;
    if (b === 'Sem data') return -1;
    return new Date(b).getTime() - new Date(a).getTime();
  });

  if (!allExpenses.length) {
    return (
      <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
        <h2 className='text-lg font-semibold mb-4 text-text-primary'>{t('expense.recentTitle')}</h2>
        <p className='text-sm text-text-secondary'>{t('expense.empty')}</p>
      </div>
    );
  }

  return (
    <div className='rounded-2xl p-4 bg-background-card border border-border-card w-full mb-8'>
      <h2 className='text-lg font-semibold mb-4 text-text-primary'>{t('expense.recentTitle')}</h2>

      <div className='flex flex-col gap-6'>
        {dates.map((date) => (
          <div key={date}>
            <div className='flex items-center gap-2 mb-2'>
              <span className='text-xs font-semibold text-text-secondary'>
                {date === 'Sem data'
                  ? t('common.noDate')
                  : new Date(`${date}T00:00:00`).toLocaleDateString(t('common.locale'), {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })}
              </span>
              <span className='flex-1 h-px bg-border-card' />
            </div>

            <div className='flex flex-col gap-2.5'>
              {grouped[date].map((exp) => (
                <ExpenseItem
                  key={exp.isRecurring ? `recurring-${exp.recurringId}` : exp.id}
                  exp={exp}
                  isActive={activeId === exp.id}
                  onActivate={setActiveId}
                  onClose={() => setActiveId(null)}
                  onRecurringDeleted={handleRecurringDeleted}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpensesList;
