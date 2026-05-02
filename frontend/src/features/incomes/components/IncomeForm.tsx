import { ArrowCircleUpIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCurrencyBRL } from '../../../hooks/useCurrencyBRL';

const ACCENT = 'var(--color-primary)';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p className='text-[10px] font-semibold uppercase tracking-widest mb-2 text-text-secondary/60'>
    {children}
  </p>
);

const cardStyle = {
  background:
    'linear-gradient(160deg, var(--color-background-card) 0%, var(--color-background-primary) 100%)',
  borderColor: 'var(--color-border-subtle)',
  boxShadow: '0 8px 32px var(--color-card-shadow)',
};

export interface IncomeFormData {
  amount: string;
  description: string;
  date: string;
}

export const defaultIncomeFormData = (): IncomeFormData => ({
  amount: '',
  description: '',
  date: '',
});

interface IncomeFormProps {
  title: string;
  subtitle: string;
  submitLabel: string;
  loading: boolean;
  initialData?: Partial<IncomeFormData>;
  onSubmit: (data: IncomeFormData) => void;
}

const IncomeForm = ({
  title,
  subtitle,
  submitLabel,
  loading,
  initialData,
  onSubmit,
}: IncomeFormProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const merged: IncomeFormData = { ...defaultIncomeFormData(), ...initialData };

  const [data, setData] = useState<IncomeFormData>(merged);
  const [expanded, setExpanded] = useState(!!(merged.description || merged.date));

  const formattedAmount = useCurrencyBRL(parseFloat(data.amount) || 0);
  const displayValue = data.amount ? formattedAmount.replace(/^R\$\s*/, '') : '';

  const set = <K extends keyof IncomeFormData>(key: K, value: IncomeFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) {
      set('amount', '');
      return;
    }
    set('amount', String(parseInt(digits, 10) / 100));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
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
            <h1 className='text-base font-bold text-text-primary leading-none'>{title}</h1>
            <p className='text-xs text-text-secondary mt-1'>{subtitle}</p>
          </div>
          <span
            className='flex items-center justify-center w-8 h-8 rounded-xl shrink-0'
            style={{ color: ACCENT }}
          >
            <ArrowCircleUpIcon weight='fill' size={17} />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {/* ── Hero: Valor ── */}
        <div className='relative overflow-hidden rounded-2xl border' style={cardStyle}>
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
              {t('income.form.amount')}
            </p>
            <div className='flex items-baseline gap-2'>
              <span className='text-xl font-semibold text-text-secondary'>R$</span>
              <input
                type='text'
                inputMode='decimal'
                placeholder='0,00'
                value={displayValue}
                onChange={handleAmountChange}
                required
                className='bg-transparent text-5xl font-black text-text-primary placeholder:text-text-secondary/20 outline-none w-64 text-center'
              />
            </div>
          </div>
        </div>

        {/* ── Personalizar (opcional) ── */}
        <div
          className='rounded-2xl border overflow-hidden transition-all'
          style={{
            ...cardStyle,
            borderColor: expanded
              ? 'var(--color-primary)'
              : 'var(--color-border-subtle)',
            boxShadow: expanded
              ? `0 0 0 1px color-mix(in srgb, ${ACCENT} 30%, transparent), 0 8px 32px var(--color-card-shadow)`
              : cardStyle.boxShadow,
          }}
        >
          <button
            type='button'
            onClick={() => setExpanded((v) => !v)}
            className='w-full flex items-center justify-between px-5 py-4 cursor-pointer'
          >
            <div className='flex flex-col items-start gap-0.5'>
              <span className='text-sm font-semibold text-text-primary'>{t('income.form.customize')}</span>
              <span className='text-xs text-text-secondary/60'>
                {expanded
                  ? t('income.form.customizeDesc')
                  : t('income.form.defaultDesc')}
              </span>
            </div>
            <div
              className='relative w-10 h-5.5 rounded-full transition-colors duration-200 shrink-0'
              style={{ background: expanded ? ACCENT : 'var(--color-border-medium)' }}
            >
              <motion.div
                className='absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow'
                animate={{ left: expanded ? '1.375rem' : '0.125rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key='optional-fields'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <div className='flex flex-col gap-4 px-5 pb-5 pt-1'>
                  <div className='h-px w-full' style={{ background: 'var(--color-border-subtle)' }} />

                  <div>
                    <FieldLabel>{t('income.form.description')}</FieldLabel>
                    <input
                      type='text'
                      placeholder={t('income.form.descriptionPlaceholder')}
                      value={data.description}
                      onChange={(e) => set('description', e.target.value)}
                      className='w-full rounded-xl px-4 py-3 text-sm font-medium text-text-primary placeholder:text-text-secondary/30 outline-none transition-all'
                      style={{
                        background:
                          'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                        border: `1px solid ${data.description ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
                      }}
                    />
                  </div>

                  <div>
                    <FieldLabel>{t('income.form.date')}</FieldLabel>
                    <input
                      type='date'
                      value={data.date}
                      onChange={(e) => set('date', e.target.value)}
                      className='w-full rounded-xl px-4 py-3 text-sm font-medium text-text-primary outline-none transition-all'
                      style={{
                        background:
                          'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                        border: `1px solid ${data.date ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
                        colorScheme: 'dark',
                      }}
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
            background: `linear-gradient(135deg, ${ACCENT} 0%, #00e5b0 100%)`,
            color: '#0b1212',
            boxShadow: `0 8px 24px color-mix(in srgb, ${ACCENT} 35%, transparent)`,
          }}
        >
          {loading ? t('common.saving') : submitLabel}
        </motion.button>
      </form>
    </div>
  );
};

export default IncomeForm;
