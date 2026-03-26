import { ArrowCircleUpIcon, ArrowLeftIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout/AppLayout';

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

const AddIncome = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: parseFloat(amount),
      description: description.trim() || 'Saldo adicionado',
      date: date || new Date().toISOString().slice(0, 10),
    };

    console.log(payload);
    navigate('/dashboard');
  };

  return (
    <AppLayout>
      <div className='max-w-lg'>
        {/* Header */}
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
                Adicionar Saldo
              </h1>
              <p className='text-xs text-text-secondary mt-1'>
                Registre um novo saldo
              </p>
            </div>
            <span className='flex items-center justify-center w-8 h-8 rounded-xl shrink-0' style={{ color: ACCENT }}>
              <ArrowCircleUpIcon weight='fill' size={17} />
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          {/* Valor */}
          <div className='relative overflow-hidden rounded-2xl border' style={cardStyle}>
            <span
              className='pointer-events-none absolute inset-0 opacity-[0.04]'
              style={{
                backgroundImage: 'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
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
                Valor do saldo
              </p>
              <div className='flex items-baseline gap-2'>
                <span className='text-xl font-semibold text-text-secondary'>R$</span>
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

          {/* Card toggle — campos opcionais */}
          <div
            className='rounded-2xl border overflow-hidden transition-all'
            style={{
              ...cardStyle,
              borderColor: expanded ? 'var(--color-primary)' : 'var(--color-border-subtle)',
              boxShadow: expanded
                ? `0 0 0 1px color-mix(in srgb, ${ACCENT} 30%, transparent), 0 8px 32px var(--color-card-shadow)`
                : cardStyle.boxShadow,
            }}
          >
            {/* Toggle header */}
            <button
              type='button'
              onClick={() => setExpanded((v) => !v)}
              className='w-full flex items-center justify-between px-5 py-4 cursor-pointer'
            >
              <div className='flex flex-col items-start gap-0.5'>
                <span className='text-sm font-semibold text-text-primary'>
                  Personalizar
                </span>
                <span className='text-xs text-text-secondary/60'>
                  {expanded ? 'Descrição e data personalizadas' : 'Usar "Saldo adicionado" e data atual'}
                </span>
              </div>

              {/* Toggle switch */}
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

            {/* Campos expansíveis */}
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
                    <div
                      className='h-px w-full'
                      style={{ background: 'var(--color-border-subtle)' }}
                    />

                    {/* Descrição */}
                    <div>
                      <FieldLabel>Descrição</FieldLabel>
                      <input
                        type='text'
                        placeholder='Ex: Salário, Freelance...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full rounded-xl px-4 py-3 text-sm font-medium text-text-primary placeholder:text-text-secondary/30 outline-none transition-all'
                        style={{
                          background: 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                          border: `1px solid ${description ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
                        }}
                      />
                    </div>

                    {/* Data */}
                    <div>
                      <FieldLabel>Data</FieldLabel>
                      <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='w-full rounded-xl px-4 py-3 text-sm font-medium text-text-primary outline-none transition-all'
                        style={{
                          background: 'color-mix(in srgb, var(--color-text-primary) 5%, transparent)',
                          border: `1px solid ${date ? 'var(--color-border-medium)' : 'var(--color-border-subtle)'}`,
                          colorScheme: 'dark',
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
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
            Salvar saldo
          </motion.button>
        </form>
      </div>
    </AppLayout>
  );
};

export default AddIncome;
