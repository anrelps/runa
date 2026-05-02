import { CheckIcon, XIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { type CSSProperties, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

export const DarkGradientPricing = () => {
  const { t } = useTranslation();
  return (
    <section
      className='relative overflow-hidden'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <div className='relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-8'>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='mb-12 space-y-3'
        >
          <h2
            className='text-center text-3xl font-semibold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight'
            style={{ color: 'var(--color-text-primary)' }}
          >
            {t('pricing.title')}
          </h2>
          <p
            className='text-center text-base md:text-lg'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
          className='grid grid-cols-1 gap-6 md:grid-cols-3'
        >
          <PriceCard
            tier={t('pricing.free.tier')}
            price={t('pricing.free.price')}
            period={t('pricing.period')}
            bestFor={t('pricing.free.bestFor')}
            CTA={<GhostButton className='w-full'>{t('pricing.free.cta')}</GhostButton>}
            benefits={[
              { text: t('pricing.free.b1'), checked: true },
              { text: t('pricing.free.b2'), checked: true },
              { text: t('pricing.free.b3'), checked: true },
              { text: t('pricing.free.b4'), checked: false },
              { text: t('pricing.free.b5'), checked: false },
              { text: t('pricing.free.b6'), checked: false },
            ]}
          />
          <PriceCard
            tier={t('pricing.pro.tier')}
            price={t('pricing.pro.price')}
            period={t('pricing.period')}
            bestFor={t('pricing.pro.bestFor')}
            highlighted
            CTA={<SplashButton className='w-full'>{t('pricing.pro.cta')}</SplashButton>}
            benefits={[
              { text: t('pricing.pro.b1'), checked: true },
              { text: t('pricing.pro.b2'), checked: true },
              { text: t('pricing.pro.b3'), checked: true },
              { text: t('pricing.pro.b4'), checked: true },
              { text: t('pricing.pro.b5'), checked: true },
              { text: t('pricing.pro.b6'), checked: false },
            ]}
          />
          <PriceCard
            tier={t('pricing.family.tier')}
            price={t('pricing.family.price')}
            period={t('pricing.period')}
            bestFor={t('pricing.family.bestFor')}
            CTA={<GhostButton className='w-full'>{t('pricing.family.cta')}</GhostButton>}
            benefits={[
              { text: t('pricing.family.b1'), checked: true },
              { text: t('pricing.family.b2'), checked: true },
              { text: t('pricing.family.b3'), checked: true },
              { text: t('pricing.family.b4'), checked: true },
              { text: t('pricing.family.b5'), checked: true },
              { text: t('pricing.family.b6'), checked: true },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

const PriceCard = ({ tier, price, period, bestFor, CTA, benefits, highlighted }: PriceCardProps) => {
  return (
    <Card highlighted={highlighted}>
      <div className='flex flex-col items-center border-b pb-6' style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <span
          className='mb-6 inline-block text-sm font-semibold uppercase tracking-wider'
          style={{ color: highlighted ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
        >
          {tier}
        </span>
        <div className='mb-3 flex items-baseline gap-1'>
          <span className='text-3xl font-medium sm:text-4xl' style={{ color: 'var(--color-text-primary)' }}>
            {price}
          </span>
          <span className='text-sm' style={{ color: 'var(--color-text-secondary)' }}>
            {period}
          </span>
        </div>
        <span className='text-center text-xs sm:text-sm' style={{ color: 'var(--color-text-secondary)' }}>
          {bestFor}
        </span>
      </div>

      <div className='space-y-4 py-9'>
        {benefits.map((b, i) => <Benefit {...b} key={i} />)}
      </div>

      {CTA}
    </Card>
  );
};

const Benefit = ({ text, checked }: BenefitType) => (
  <div className='flex items-center gap-3'>
    {checked ? (
      <span
        className='grid size-5 place-content-center rounded-full text-sm'
        style={{ backgroundColor: 'rgba(32, 224, 150, 0.15)', color: 'var(--color-primary)' }}
      >
        <CheckIcon />
      </span>
    ) : (
      <span
        className='grid size-5 place-content-center rounded-full text-sm'
        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)' }}
      >
        <XIcon />
      </span>
    )}
    <span className='text-sm' style={{ color: 'var(--color-text-secondary)' }}>{text}</span>
  </div>
);

const Card = ({ className, children, style = {}, highlighted }: CardProps) => (
  <motion.div
    initial={{ filter: 'blur(2px)' }}
    whileInView={{ filter: 'blur(0px)' }}
    transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.25 }}
    style={{
      backgroundColor: 'var(--color-background-card)',
      borderColor: highlighted ? 'rgba(32, 224, 150, 0.3)' : 'rgba(255,255,255,0.06)',
      boxShadow: highlighted ? '0 0 30px rgba(32, 224, 150, 0.08)' : undefined,
      ...style,
    }}
    className={twMerge('relative h-full w-full overflow-hidden rounded-2xl border p-6', className)}
  >
    {children}
  </motion.div>
);

const GhostButton = ({ children, className, ...rest }: GhostButtonProps) => (
  <button
    className={twMerge('rounded-md px-4 py-2 text-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer', className)}
    style={{ color: 'var(--color-text-primary)' }}
    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(32, 224, 150, 0.1)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
    {...rest}
  >
    {children}
  </button>
);

const SplashButton = ({ children, className, ...rest }: GhostButtonProps) => (
  <button
    className={twMerge('rounded-md px-4 py-2 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer', className)}
    style={{
      backgroundImage: 'linear-gradient(to bottom right, var(--color-primary), #1a9d6e)',
      color: 'var(--color-background-primary)',
      outline: '2px solid rgba(32, 224, 150, 0.2)',
      outlineOffset: '1px',
    }}
    {...rest}
  >
    {children}
  </button>
);

type PriceCardProps = { tier: string; price: string; period: string; bestFor: string; CTA: ReactNode; benefits: BenefitType[]; highlighted?: boolean };
type CardProps = { className?: string; children?: ReactNode; style?: CSSProperties; highlighted?: boolean };
type BenefitType = { text: string; checked: boolean };
type GhostButtonProps = { children: ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>;
