import { ArrowsClockwiseIcon, CaretDownIcon, CaretUpIcon, CheckCircleIcon, GiftIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../features/shared/components/ConfirmDialog';
import { useCurrencyBRL } from '../../hooks/useCurrencyBRL';
import AppLayout from '../../layouts/AppLayout/AppLayout';
import { destroy, destroyRecurring, index, indexRecurring, updateInstallment } from '../../redux/services/expensesService';
import type { category } from '../../utils/consts';
import { CATEGORY_ACCENTS, CATEGORY_ICONS } from '../../utils/consts';

// ── Types ───────────────────────────────────────────────────────────────────

interface Installment {
  id: number;
  installment_number: number;
  amount: number;
  due_date: string;
  paid_at: string | null;
}

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
  installments?: Installment[];
  [key: string]: any;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const isOverdue = (inst: Installment) =>
  !inst.paid_at && new Date(`${inst.due_date}T00:00:00`) < today();

const daysLabel = (inst: Installment): { text: string; color: string } => {
  if (inst.paid_at) return { text: 'Pago', color: 'text-green-400' };
  const due = new Date(`${inst.due_date}T00:00:00`);
  const diff = Math.round((due.getTime() - today().getTime()) / 86400000);
  if (diff < 0) return { text: `Vencida há ${Math.abs(diff)}d`, color: 'text-accent-start font-semibold' };
  if (diff === 0) return { text: 'Vence hoje', color: 'text-yellow-400 font-semibold' };
  return { text: `Vence em ${diff}d`, color: 'text-text-secondary' };
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

const RecurringCard = ({
  item,
  onDeleted,
}: {
  item: RecurringExpense;
  onDeleted: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const formatted = useCurrencyBRL(item.amount);

  useEffect(() => {
    if (!active) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setActive(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [active]);

  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    setConfirming(false);
    setActive(false);
    await destroyRecurring(item.id);
    onDeleted(item.id);
  };

  return (
    <div
      ref={ref}
      className='relative flex items-center justify-between p-3 rounded-xl bg-white/3 border border-border-card overflow-hidden'
    >
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

      {!active && (
        <button
          type='button'
          aria-label='Opções'
          onClick={() => setActive(true)}
          className='absolute inset-0 cursor-pointer'
        />
      )}

      <AnimatePresence>
        {active && (
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
            <motion.button
              type='button'
              onClick={() => navigate(`/recurring-expenses/${item.id}/edit`)}
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
              Editar
            </motion.button>
            <motion.button
              type='button'
              onClick={() => setConfirming(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.08 }}
              className='flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors'
              style={{
                background: 'color-mix(in srgb, #ef4444 15%, transparent)',
                border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
                color: '#ef4444',
              }}
            >
              <TrashIcon size={14} weight='bold' />
              Remover
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirming}
        title='Remover recorrente'
        description={`Tem certeza que deseja remover "${item.description}"?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
};

const InstallmentRow = ({
  inst,
  onToggle,
}: {
  inst: Installment;
  onToggle: (id: number) => void;
}) => {
  const formatted = useCurrencyBRL(inst.amount);
  const { text, color } = daysLabel(inst);
  const overdue = isOverdue(inst);
  const paid = !!inst.paid_at;

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg border ${
        paid
          ? 'border-border-card bg-white/3 opacity-60'
          : overdue
            ? 'border-accent-start/40 bg-accent-start/5'
            : 'border-border-card bg-white/3'
      }`}
    >
      <div className='flex items-center gap-2 min-w-0'>
        <span className='text-xs font-semibold text-text-secondary shrink-0 w-5 text-center'>
          {inst.installment_number}
        </span>
        <div className='flex flex-col min-w-0'>
          <span className='text-sm font-medium text-text-primary'>{formatted}</span>
          <span className={`text-[11px] ${color}`}>{text}</span>
        </div>
      </div>
      <button
        onClick={() => onToggle(inst.id)}
        className='shrink-0 ml-3 flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer'
        style={{
          background: paid
            ? 'color-mix(in srgb, var(--color-text-secondary) 10%, transparent)'
            : 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
          color: paid ? 'var(--color-text-secondary)' : 'var(--color-primary)',
        }}
      >
        <CheckCircleIcon size={13} weight={paid ? 'fill' : 'regular'} />
        {paid ? 'Pago' : 'Marcar pago'}
      </button>
    </div>
  );
};

const InstallmentCard = ({
  item,
  onInstallmentToggle,
  onDeleted,
}: {
  item: InstallmentExpense;
  onInstallmentToggle: (expenseId: number, installmentId: number) => void;
  onDeleted: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const count = item.installment_count ?? 1;
  const installments = [...(item.installments ?? [])].sort(
    (a, b) => a.installment_number - b.installment_number,
  );
  const paidCount = installments.filter((i) => i.paid_at).length;
  const progress = count > 0 ? (paidCount / count) * 100 : 0;

  const safeCategory = item.category;
  const Icon = safeCategory ? (CATEGORY_ICONS[safeCategory] ?? GiftIcon) : GiftIcon;
  const accentColor = safeCategory ? CATEGORY_ACCENTS[safeCategory] : 'var(--color-text-secondary)';

  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    setConfirming(false);
    await destroy(item.id);
    onDeleted(item.id);
  };

  return (
    <div className='flex flex-col gap-2 p-3 rounded-xl bg-white/3 border border-border-card'>
      {/* Header */}
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
                {paidCount}/{count}
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
        <div className='flex items-center gap-1 shrink-0 ml-2'>
          <button
            type='button'
            onClick={() => navigate(`/expenses/${item.id}/edit`)}
            className='p-1.5 rounded-lg transition-colors cursor-pointer'
            style={{ color: 'var(--color-accent-start)' }}
            title='Editar'
          >
            <PencilSimpleIcon size={14} weight='bold' />
          </button>
          <button
            type='button'
            onClick={() => setConfirming(true)}
            className='p-1.5 rounded-lg transition-colors cursor-pointer'
            style={{ color: '#ef4444' }}
            title='Remover'
          >
            <TrashIcon size={14} weight='bold' />
          </button>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className='p-1.5 rounded-lg text-text-secondary hover:bg-white/10 transition-colors cursor-pointer'
            title={collapsed ? 'Expandir parcelas' : 'Recolher parcelas'}
          >
            {collapsed ? <CaretDownIcon size={14} /> : <CaretUpIcon size={14} />}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className='flex items-center gap-2'>
        <div className='flex-1 h-1.5 rounded-full bg-white/8 overflow-hidden'>
          <div
            className='h-full rounded-full transition-all'
            style={{ width: `${progress}%`, background: 'var(--color-accent-start)' }}
          />
        </div>
        <span className='text-[10px] text-text-secondary shrink-0'>
          {count - paidCount} restante{count - paidCount !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Installments list */}
      {!collapsed && installments.length > 0 && (
        <div className='flex flex-col gap-1.5 mt-1'>
          {installments.map((inst) => (
            <InstallmentRow
              key={inst.id}
              inst={inst}
              onToggle={(id) => onInstallmentToggle(item.id, id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirming}
        title='Remover parcelada'
        description={`Tem certeza que deseja remover "${item.description ?? 'esta compra'}" e todas as suas parcelas?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const Commitments = () => {
  const [recurring, setRecurring] = useState<RecurringExpense[]>([]);
  const [installments, setInstallments] = useState<InstallmentExpense[]>([]);

  const loadData = () => {
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
      setInstallments(raw);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInstallmentToggle = async (_expenseId: number, installmentId: number) => {
    await updateInstallment(installmentId);
    loadData();
  };

  const handleRecurringDeleted = (id: number) => {
    setRecurring((prev) => prev.filter((r) => r.id !== id));
  };

  const handleInstallmentDeleted = (id: number) => {
    setInstallments((prev) => prev.filter((e) => e.id !== id));
  };

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
                <RecurringCard key={item.id} item={item} onDeleted={handleRecurringDeleted} />
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title='Parceladas' count={installments.length} />
          {installments.length === 0 ? (
            <p className='text-sm text-text-secondary'>Nenhuma despesa parcelada.</p>
          ) : (
            <div className='flex flex-col gap-2.5'>
              {installments.map((item) => (
                <InstallmentCard
                  key={item.id}
                  item={item}
                  onInstallmentToggle={handleInstallmentToggle}
                  onDeleted={handleInstallmentDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Commitments;
