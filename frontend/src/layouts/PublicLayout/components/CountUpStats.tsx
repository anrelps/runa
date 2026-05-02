import { animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const CountUpStats = () => {
  const { t } = useTranslation();
  return (
    <div className='mx-auto max-w-3xl px-4 py-20 md:py-24'>
      <h2
        className='mb-8 text-center text-base sm:text-lg md:mb-16'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {t('landing.stats.heading')}
        <span style={{ color: 'var(--color-primary)' }}>
          {' '}
          {t('landing.stats.headingHighlight')}
        </span>
      </h2>

      <div className='flex flex-col items-center justify-center sm:flex-row'>
        <Stat num={20} suffix='%' subheading={t('landing.stats.stat1')} />
        <div
          className='h-px w-12 sm:h-12 sm:w-px'
          style={{ backgroundColor: 'rgba(32, 224, 150, 0.3)' }}
        />
        <Stat num={2.3} decimals={1} suffix='K+' subheading={t('landing.stats.stat2')} />
        <div
          className='h-px w-12 sm:h-12 sm:w-px'
          style={{ backgroundColor: 'rgba(32, 224, 150, 0.3)' }}
        />
        <Stat num={320} suffix='K+' subheading={t('landing.stats.stat3')} />
      </div>
    </div>
  );
};

interface Props {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading }: Props) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;
    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;
        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className='flex w-72 flex-col items-center py-8 sm:py-0'>
      <p
        className='mb-2 text-center text-7xl font-semibold sm:text-6xl'
        style={{ color: 'var(--color-text-primary)' }}
      >
        <span ref={ref}></span>
        {suffix}
      </p>
      <p
        className='max-w-48 text-center'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {subheading}
      </p>
    </div>
  );
};
