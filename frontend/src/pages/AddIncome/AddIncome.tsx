import {
  getLocalTimeZone,
  today,
  type CalendarDate,
} from '@internationalized/date';
import { ArrowCircleUpIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateField } from '../../features/shared/components/DateRangePicker/DateField';
import AppLayout from '../../layouts/AppLayout/AppLayout';

// ── Constants ──────────────────────────────────────────────────────────────────

const ACCENT = 'var(--color-primary)';

// ── Sub-components ─────────────────────────────────────────────────────────────

const Divider = () => <div className='h-px shrink-0 bg-border-subtle' />;

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p className='text-[10px] font-semibold uppercase tracking-widest mb-2 text-text-secondary/60'>
    {children}
  </p>
);

// ── Component ──────────────────────────────────────────────────────────────────

const AddIncome = () => {
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState<CalendarDate>(today(getLocalTimeZone()));

  const cardStyle = {
    background:
      'linear-gradient(160deg, var(--color-background-card) 0%, var(--color-background-primary) 100%)',
    borderColor: 'var(--color-border-subtle)',
    boxShadow: '0 8px 32px var(--color-card-shadow)',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: dispatch action
    navigate('/dashboard');
  };

  return (
    <AppLayout>
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
                Adicionar Renda
              </h1>
              <p className='text-xs text-text-secondary mt-1'>
                Registre uma nova renda
              </p>
            </div>
            <span
              className='flex items-center justify-center w-8 h-8 rounded-xl shrink-0'
              style={{
                color: ACCENT,
              }}
            >
              <ArrowCircleUpIcon weight='fill' size={17} />
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          {/* ── Hero: Valor ── */}
          <div
            className='relative overflow-hidden rounded-2xl border'
            style={cardStyle}
          >
            {/* Dot grid */}
            <span
              className='pointer-events-none absolute inset-0 opacity-[0.04]'
              style={{
                backgroundImage:
                  'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
                backgroundSize: '10px 10px',
              }}
              aria-hidden='true'
            />
            {/* Top shine */}
            <span
              className='pointer-events-none absolute top-0 left-0 right-0 h-px'
              style={{
                background: `linear-gradient(to right, transparent, color-mix(in srgb, ${ACCENT} 50%, transparent) 40%, rgba(255,255,255,0.2) 55%, transparent)`,
              }}
              aria-hidden='true'
            />
            {/* Corner glow */}
            <span
              className='pointer-events-none absolute -bottom-10 -right-10 w-36 h-36 rounded-full opacity-20'
              style={{
                background: `radial-gradient(circle, color-mix(in srgb, ${ACCENT} 80%, transparent) 0%, transparent 65%)`,
              }}
              aria-hidden='true'
            />

            <div className='relative px-6 pt-5 pb-6 flex flex-col items-center gap-1'>
              <p className='text-[10px] font-semibold uppercase tracking-widest mb-1 text-text-secondary/60'>
                Valor da renda
              </p>
              <div className='flex items-baseline gap-2'>
                <span className='text-xl font-semibold text-text-secondary'>
                  R$
                </span>
                <input
                  type='number'
                  step='0.01'
                  min='0'
                  placeholder='0,00'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className='bg-transparent text-5xl font-black text-text-primary placeholder:text-text-secondary/20 outline-none w-52 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                />
              </div>
            </div>
          </div>

          {/* ── Descrição ── */}
          <div className='rounded-2xl border overflow-hidden' style={cardStyle}>
            <div className='px-5 pt-4 pb-5'>
              <FieldLabel>Descrição</FieldLabel>
              <input
                type='text'
                placeholder='Dê um nome para essa renda...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className='w-full rounded-xl px-4 py-3 mt-1 text-sm font-medium text-text-primary placeholder:text-text-secondary/30 outline-none transition-all'
                style={{
                  background:
                    'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                  border: `1px solid ${description ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
                }}
              />
            </div>
            <Divider />

            {/* ── Data ── */}
            <div className='px-5 py-4'>
              <FieldLabel>Data</FieldLabel>
              <DateField value={date} onChange={(val) => val && setDate(val)} />
            </div>
          </div>

          {/* ── Submit ── */}
          <motion.button
            type='submit'
            whileTap={{ scale: 0.98 }}
            className='w-full py-4 rounded-2xl font-bold text-sm tracking-wide cursor-pointer transition-opacity mt-1'
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${ACCENT} 100%, transparent) 0%, #00e5b0 100%)`,
              color: '#0b1212',
              boxShadow: `0 8px 24px color-mix(in srgb, ${ACCENT} 35%, transparent)`,
            }}
          >
            Salvar renda
          </motion.button>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddIncome;
