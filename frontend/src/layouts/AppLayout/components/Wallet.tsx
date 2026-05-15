import { PlusCircleIcon, WalletIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { selectWallet } from '../../../redux/slices/transactionsSlice';

const Wallet = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const wallet = useSelector(selectWallet);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updateCoords = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
    });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const formatted = wallet?.formatted_balance ?? 'R$ 0,00';

  return (
    <div className='relative'>
      <motion.button
        ref={buttonRef}
        onClick={() => { updateCoords(); setOpen((v) => !v); }}
        whileTap={{ scale: 0.96 }}
        className='relative flex items-center justify-center gap-2 rounded-md text-sm font-medium overflow-hidden cursor-pointer transition-all w-10 h-10 p-0 md:w-auto md:h-auto md:px-4 md:py-2'
        style={{
          background: open
            ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
            : 'var(--color-primary)',
          color: open ? 'var(--color-primary)' : 'var(--color-background-primary)',
          border: open ? '1px solid color-mix(in srgb, var(--color-primary) 40%, transparent)' : '1px solid transparent',
        }}
      >
        <span className='shrink-0 flex items-center justify-center'>
          <WalletIcon weight='fill' size={18} />
        </span>
        <span className='hidden md:inline whitespace-nowrap'>{t('wallet.label')}</span>
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={popoverRef}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`fixed w-72 rounded-2xl border z-9999 overflow-hidden${theme === 'light' ? ' light' : ''}`}
              style={{
                top: coords.top,
                right: coords.right,
                background: 'linear-gradient(160deg, var(--color-background-card) 0%, var(--color-background-primary) 100%)',
                borderColor: 'var(--color-border-subtle)',
                boxShadow: '0 16px 48px var(--color-card-shadow), 0 0 0 1px var(--color-border-card)',
              }}
          >
            <span
              className='pointer-events-none absolute top-0 left-0 right-0 h-px'
              style={{
                background: 'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-primary) 50%, transparent) 50%, transparent)',
              }}
            />

            <div className='px-5 pt-5 pb-4'>
              <div className='flex items-center gap-2 mb-4'>
                <span
                  className='flex items-center justify-center w-7 h-7 rounded-lg'
                  style={{ background: 'color-mix(in srgb, var(--color-primary) 12%, transparent)', color: 'var(--color-primary)' }}
                >
                  <WalletIcon weight='fill' size={15} />
                </span>
                <p className='text-xs font-bold uppercase tracking-widest text-text-secondary/60'>
                  {t('wallet.balanceTitle')}
                </p>
              </div>

              <div className='flex items-baseline gap-2 mb-4'>
                <span className='text-lg font-semibold text-text-secondary shrink-0'>R$</span>
                <span className='text-3xl font-black text-text-primary'>
                  {formatted.replace(/^R\$\s*/, '')}
                </span>
              </div>

              <div className='flex gap-2'>
                <button
                  onClick={() => { setOpen(false); navigate('/income/add'); }}
                  className='flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all'
                  style={{
                    borderColor: 'var(--color-border-subtle)',
                    color: 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-primary) 40%, transparent)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-subtle)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  <PlusCircleIcon weight='bold' size={12} />
                  {t('wallet.addBalance')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default Wallet;
