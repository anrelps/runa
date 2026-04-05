import {
  getLocalTimeZone,
  today,
  type CalendarDate,
} from '@internationalized/date';
import { ArrowCircleDownIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrencyBRL } from '../../../hooks/useCurrencyBRL';
import { DateField } from '../../shared/components/DateRangePicker/DateField';
import { CATEGORIES, CATEGORY_ACCENTS } from '../../../utils/consts';

// ── Constants ──────────────────────────────────────────────────────────────────

const ACCENT = 'var(--color-accent-start)';

export const EXPENSE_TYPES = [
  { value: 'single', label: 'Única' },
  { value: 'installment', label: 'Parcelada' },
  { value: 'recurring', label: 'Recorrente' },
] as const;

export type ExpenseType = (typeof EXPENSE_TYPES)[number]['value'];

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ExpenseFormData {
  type: ExpenseType;
  description: string;
  category: string;
  amount: string;
  date: CalendarDate;
  installmentCount: string;
  recurringDay: string;
}

export const defaultExpenseFormData = (): ExpenseFormData => ({
  type: 'single',
  description: '',
  category: '',
  amount: '',
  date: today(getLocalTimeZone()),
  installmentCount: '2',
  recurringDay: '1',
});

interface ExpenseFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  loading: boolean;
  initialData?: Partial<ExpenseFormData>;
  onSubmit: (data: ExpenseFormData) => void;
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const Divider = () => <div className='h-px mx-0 shrink-0 bg-border-subtle' />;

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p className='text-[10px] font-semibold uppercase tracking-widest mb-2 text-text-secondary/60'>
    {children}
  </p>
);

// ── Component ──────────────────────────────────────────────────────────────────

const ExpenseForm = ({
  title,
  subtitle,
  submitLabel,
  loading,
  initialData,
  onSubmit,
}: ExpenseFormProps) => {
  const navigate = useNavigate();

  const [data, setData] = useState<ExpenseFormData>({
    ...defaultExpenseFormData(),
    ...initialData,
  });

  const formattedAmount = useCurrencyBRL(parseFloat(data.amount) || 0);
  const amountDisplay = data.amount ? formattedAmount.replace(/^R\$\s*/, '') : '';

  const set = <K extends keyof ExpenseFormData>(key: K, value: ExpenseFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) {
      set('amount', '');
      return;
    }
    set('amount', String(parseInt(digits, 10) / 100));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data);
  };

  const cardStyle = {
    background:
      'linear-gradient(160deg, var(--color-background-card) 0%, var(--color-background-primary) 100%)',
    borderColor: 'var(--color-border-subtle)',
    boxShadow: '0 8px 32px var(--color-card-shadow)',
  };

  return (
    <div className='max-w-lg'>
      {/* ── Header ── */}
      <div className='flex items-center gap-4 mb-8'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='flex items-center justify-center w-9 h-9 rounded-xl border cursor-pointer transition-colors'
          style={cardStyle}
        >
          <ArrowLeftIcon size={17} className='text-text-secondary' />
        </button>
        <div className='flex items-center gap-3'>
          <div>
            <h1 className='text-base font-bold text-text-primary leading-none'>
              {title}
            </h1>
            <p className='text-xs text-text-secondary mt-1'>{subtitle}</p>
          </div>
          <span
            className='flex items-center justify-center w-8 h-8 rounded-xl shrink-0'
            style={{ color: ACCENT }}
          >
            <ArrowCircleDownIcon weight='fill' size={17} />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {/* ── Hero: Valor ── */}
        <div
          className='relative overflow-hidden rounded-2xl border'
          style={cardStyle}
        >
          <span
            className='pointer-events-none absolute inset-0 opacity-[0.04]'
            style={{
              backgroundImage:
                'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
              backgroundSize: '10px 10px',
            }}
            aria-hidden='true'
          />
          <span
            className='pointer-events-none absolute top-0 left-0 right-0 h-px'
            style={{
              background: `linear-gradient(to right, transparent, color-mix(in srgb, ${ACCENT} 50%, transparent) 40%, rgba(255,255,255,0.2) 55%, transparent)`,
            }}
            aria-hidden='true'
          />
          <span
            className='pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-20'
            style={{
              background: `radial-gradient(circle, color-mix(in srgb, ${ACCENT} 80%, transparent) 0%, transparent 65%)`,
            }}
            aria-hidden='true'
          />

          <div className='relative px-6 pt-5 pb-6 flex flex-col items-center gap-1'>
            <p className='text-[10px] font-semibold uppercase tracking-widest mb-1 text-text-secondary/60'>
              Valor da despesa
            </p>
            <div className='flex items-baseline gap-2'>
              <span className='text-xl font-semibold text-text-secondary'>R$</span>
              <input
                type='text'
                inputMode='numeric'
                placeholder='0,00'
                value={amountDisplay}
                onChange={handleAmountChange}
                required
                className='bg-transparent text-5xl font-black text-text-primary placeholder:text-text-secondary/20 outline-none w-64 text-center'
              />
            </div>
          </div>
        </div>

        {/* ── Descrição + Categoria ── */}
        <div className='rounded-2xl border overflow-hidden' style={cardStyle}>
          <div className='px-5 pt-4 pb-5'>
            <FieldLabel>Descrição</FieldLabel>
            <input
              type='text'
              placeholder='Dê um nome para essa despesa...'
              value={data.description}
              onChange={(e) => set('description', e.target.value)}
              required
              className='w-full rounded-xl px-4 py-3 mt-1 text-sm font-medium text-text-primary placeholder:text-text-secondary/30 outline-none transition-all'
              style={{
                background: 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                border: `1px solid ${data.description ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
              }}
            />
          </div>
          <Divider />
          <div className='px-5 py-4'>
            <FieldLabel>Categoria</FieldLabel>
            <div className='flex flex-wrap gap-2 mt-1'>
              {CATEGORIES.map((cat) => {
                const color = CATEGORY_ACCENTS[cat];
                const selected = data.category === cat;
                return (
                  <button
                    key={cat}
                    type='button'
                    onClick={() => set('category', cat)}
                    className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer'
                    style={{
                      borderColor: selected ? color : 'var(--color-border-subtle)',
                      color: selected ? color : 'var(--color-text-secondary)',
                      background: selected
                        ? `color-mix(in srgb, ${color} 12%, transparent)`
                        : 'transparent',
                    }}
                  >
                    <span
                      className='w-1.5 h-1.5 rounded-full shrink-0'
                      style={{ background: color }}
                    />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Tipo + Parcelas / Dia recorrente ── */}
        <div className='rounded-2xl border overflow-hidden' style={cardStyle}>
          <div className='px-5 py-4'>
            <FieldLabel>Tipo de despesa</FieldLabel>
            <div
              className='flex gap-1.5 mt-1 p-1 rounded-xl'
              style={{
                background: 'color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
              }}
            >
              {EXPENSE_TYPES.map((t) => (
                <button
                  key={t.value}
                  type='button'
                  onClick={() => set('type', t.value)}
                  className='relative flex-1 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer'
                  style={{
                    color: data.type === t.value ? ACCENT : 'var(--color-text-secondary)',
                  }}
                >
                  {data.type === t.value && (
                    <motion.span
                      layoutId='type-bg'
                      className='absolute inset-0 rounded-lg'
                      style={{
                        background: `color-mix(in srgb, ${ACCENT} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${ACCENT} 25%, transparent)`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className='relative z-10'>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {data.type === 'single' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='overflow-hidden'
              >
                <Divider />
                <div className='px-5 py-4'>
                  <FieldLabel>Data da despesa</FieldLabel>
                  <DateField
                    value={data.date}
                    onChange={(val) => val && set('date', val)}
                    maxValue={today(getLocalTimeZone())}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {data.type === 'installment' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='overflow-hidden'
              >
                <Divider />
                <div className='px-5 py-4'>
                  <FieldLabel>Vencimento da 1ª parcela</FieldLabel>
                  <DateField
                    value={data.date}
                    onChange={(val) => val && set('date', val)}
                  />
                </div>
                <Divider />
                <div className='px-5 py-4'>
                  <FieldLabel>Número de parcelas</FieldLabel>
                  <div className='flex items-center gap-2 mt-1 flex-wrap'>
                    {[2, 3, 6, 12, 24].map((n) => (
                      <button
                        key={n}
                        type='button'
                        onClick={() => set('installmentCount', String(n))}
                        className='h-9 px-4 rounded-lg text-xs font-bold border transition-all cursor-pointer'
                        style={{
                          borderColor:
                            data.installmentCount === String(n)
                              ? ACCENT
                              : 'var(--color-border-subtle)',
                          color:
                            data.installmentCount === String(n)
                              ? ACCENT
                              : 'var(--color-text-secondary)',
                          background:
                            data.installmentCount === String(n)
                              ? `color-mix(in srgb, ${ACCENT} 10%, transparent)`
                              : 'transparent',
                        }}
                      >
                        {n}x
                      </button>
                    ))}
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                    <span className='text-xs text-text-secondary/50 shrink-0'>Outro</span>
                    <input
                      type='number'
                      min='2'
                      max='48'
                      value={
                        [2, 3, 6, 12, 24].includes(Number(data.installmentCount))
                          ? ''
                          : data.installmentCount
                      }
                      onChange={(e) => set('installmentCount', e.target.value)}
                      placeholder='Nº de parcelas'
                      className='flex-1 h-9 px-3 rounded-lg text-xs font-semibold border bg-transparent text-text-primary placeholder:text-text-secondary/30 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      style={{ borderColor: 'var(--color-border-subtle)' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {data.type === 'recurring' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='overflow-hidden'
              >
                <Divider />
                <div className='px-5 py-4'>
                  <FieldLabel>Dia da recorrência (todo mês)</FieldLabel>
                  <div className='flex items-center gap-2 mt-1 flex-wrap'>
                    {[1, 5, 10, 15, 20, 25].map((d) => (
                      <button
                        key={d}
                        type='button'
                        onClick={() => set('recurringDay', String(d))}
                        className='h-9 px-4 rounded-lg text-xs font-bold border transition-all cursor-pointer'
                        style={{
                          borderColor:
                            data.recurringDay === String(d)
                              ? ACCENT
                              : 'var(--color-border-subtle)',
                          color:
                            data.recurringDay === String(d)
                              ? ACCENT
                              : 'var(--color-text-secondary)',
                          background:
                            data.recurringDay === String(d)
                              ? `color-mix(in srgb, ${ACCENT} 10%, transparent)`
                              : 'transparent',
                        }}
                      >
                        dia {d}
                      </button>
                    ))}
                  </div>
                  <div className='flex items-center gap-3 mt-3'>
                    <span className='text-xs text-text-secondary/50 shrink-0'>Outro dia</span>
                    <input
                      type='number'
                      min='1'
                      max='31'
                      value={
                        [1, 5, 10, 15, 20, 25].includes(Number(data.recurringDay))
                          ? ''
                          : data.recurringDay
                      }
                      onChange={(e) => set('recurringDay', e.target.value)}
                      placeholder='1 – 31'
                      className='flex-1 h-9 px-3 rounded-lg text-xs font-semibold border bg-transparent text-text-primary placeholder:text-text-secondary/30 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                      style={{ borderColor: 'var(--color-border-subtle)' }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Submit ── */}
        <motion.button
          type='submit'
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className='w-full py-4 rounded-2xl font-bold text-sm tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mt-1'
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, #ff4a4a 100%)`,
            color: '#fff',
            boxShadow: `0 8px 24px color-mix(in srgb, ${ACCENT} 35%, transparent)`,
          }}
        >
          {loading ? 'Salvando...' : submitLabel}
        </motion.button>
      </form>
    </div>
  );
};

export default ExpenseForm;
