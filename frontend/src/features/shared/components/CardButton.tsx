import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { ArrowRightIcon } from '@phosphor-icons/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardButtonProps {
  label: string;
  icon?: PhosphorIcon;
  accent?: string;
  onClick?: () => void;
  className?: string;
}

const CardButton = ({
  label,
  icon: Icon,
  accent = 'var(--color-primary)',
  onClick,
  className,
}: CardButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useSpring(rawX, { stiffness: 130, damping: 22 });
  const glowY = useSpring(rawY, { stiffness: 130, damping: 22 });

  const mix = (pct: number) =>
    `color-mix(in srgb, ${accent} ${pct}%, transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial='idle'
      whileHover='hover'
      whileTap={{ scale: 0.96 }}
      className={twMerge(
        'group relative flex flex-col overflow-hidden cursor-pointer',
        'w-72 rounded-2xl border',
        className,
      )}
      style={{
        height: '11rem',
        background: `linear-gradient(160deg, var(--color-background-card) 0%, var(--color-background-primary) 100%)`,
        borderColor: mix(14),
        boxShadow: `0 24px 64px var(--color-card-shadow), 0 0 0 1px ${mix(8)}`,
      }}
    >
      {/* Mouse-tracking glow */}
      <motion.span
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className='pointer-events-none absolute w-40 h-40 rounded-full'
        style={{
          left: glowX,
          top: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: `radial-gradient(circle, ${mix(35)} 0%, transparent 65%)`,
        }}
        aria-hidden='true'
      />

      {/* Dot grid texture */}
      <span
        className='pointer-events-none absolute inset-0 opacity-[0.06]'
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
        aria-hidden='true'
      />

      {/* Top-edge shine */}
      <span
        className='pointer-events-none absolute top-0 left-0 right-0 h-px'
        style={{
          background: `linear-gradient(to right, transparent, ${mix(60)} 40%, color-mix(in srgb, var(--color-text-primary) 30%, transparent) 55%, transparent)`,
        }}
        aria-hidden='true'
      />

      {/* Icon zone */}
      <div className='relative flex-1 flex items-center justify-center'>
        {/* Outer dashed orbit */}
        <motion.span
          variants={{
            idle: { opacity: 0.08, scale: 1, rotate: 0 },
            hover: { opacity: 0.25, scale: 1.1, rotate: 30 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='absolute w-24 h-24 rounded-full border border-dashed'
          style={{ borderColor: accent }}
          aria-hidden='true'
        />
        {/* Inner solid ring */}
        <motion.span
          variants={{
            idle: { opacity: 0.14, scale: 1 },
            hover: { opacity: 0.32, scale: 1.06 },
          }}
          transition={{ duration: 0.4 }}
          className='absolute w-16 h-16 rounded-full border'
          style={{ borderColor: accent }}
          aria-hidden='true'
        />
        {/* Soft glow disc */}
        <span
          className='absolute w-10 h-10 rounded-full'
          style={{ background: `radial-gradient(circle, ${mix(20)} 0%, transparent 70%)` }}
          aria-hidden='true'
        />

        {Icon && (
          <motion.span
            variants={{
              idle: { y: 0, scale: 1 },
              hover: { y: -4, scale: 1.18 },
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            className='relative z-10'
            style={{
              color: accent,
              filter: `drop-shadow(0 0 10px ${mix(55)})`,
            }}
          >
            <Icon weight='fill' size={32} />
          </motion.span>
        )}
      </div>

      {/* Gradient divider */}
      <div
        className='mx-5 h-px shrink-0'
        style={{ background: `linear-gradient(to right, transparent, ${mix(22)}, transparent)` }}
      />

      {/* Label zone */}
      <div className='flex items-center justify-between px-4 py-3.5 shrink-0'>
        <span
          className='text-xs font-bold tracking-widest uppercase leading-tight whitespace-pre-line text-left'
          style={{ color: 'var(--color-text-primary)' }}
        >
          {label}
        </span>
        <motion.span
          variants={{ idle: { x: 0, opacity: 0.7 }, hover: { x: 4, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          style={{ color: accent }}
        >
          <ArrowRightIcon weight='bold' size={13} />
        </motion.span>
      </div>
    </motion.button>
  );
};

CardButton.displayName = 'CardButton';

export default CardButton;
