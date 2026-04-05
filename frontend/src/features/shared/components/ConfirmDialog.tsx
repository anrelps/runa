import { WarningIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Remover',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
            onClick={onCancel}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className='fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(340px,90vw)]'
          >
            <div
              className='flex flex-col gap-5 p-5 rounded-2xl border'
              style={{
                background: 'var(--color-background-card)',
                borderColor: 'var(--color-border-subtle)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Icon + Text */}
              <div className='flex items-start gap-3'>
                <div
                  className='shrink-0 w-9 h-9 rounded-xl flex items-center justify-center'
                  style={{ background: 'color-mix(in srgb, #ef4444 15%, transparent)' }}
                >
                  <WarningIcon size={18} weight='fill' style={{ color: '#ef4444' }} />
                </div>
                <div className='flex flex-col gap-1 min-w-0'>
                  <span className='text-sm font-bold text-text-primary'>{title}</span>
                  {description && (
                    <span className='text-xs text-text-secondary'>{description}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-2'>
                <button
                  type='button'
                  onClick={onCancel}
                  className='flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors'
                  style={{
                    background: 'color-mix(in srgb, var(--color-text-primary) 6%, transparent)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  type='button'
                  onClick={onConfirm}
                  className='flex-1 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors'
                  style={{
                    background: 'color-mix(in srgb, #ef4444 15%, transparent)',
                    border: '1px solid color-mix(in srgb, #ef4444 30%, transparent)',
                    color: '#ef4444',
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
