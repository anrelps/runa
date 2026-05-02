import { motion } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Example = () => {
  const { t } = useTranslation();
  return (
    <div
      className='flex items-center justify-center px-8 py-24'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <BlockInTextCard
        tag={t('about.supportTag')}
        text={
          <>
            <strong style={{ color: 'var(--color-text-primary)' }}>
              {t('about.supportQuestion')}
            </strong>{' '}
            {t('about.supportText')}
          </>
        }
        examples={[
          t('about.faq1'),
          t('about.faq2'),
          t('about.faq3'),
          t('about.faq4'),
        ]}
        ctaLabel={t('about.supportCta')}
        exampleLabel={t('about.exampleLabel')}
      />
    </div>
  );
};

const BlockInTextCard = ({
  tag,
  text,
  examples,
  ctaLabel,
  exampleLabel,
}: {
  tag: string;
  text: ReactNode;
  examples: string[];
  ctaLabel: string;
  exampleLabel: string;
}) => (
  <div className='w-full max-w-xl space-y-6'>
    <div>
      <p className='mb-1.5 text-sm font-light uppercase' style={{ color: 'var(--color-text-secondary)' }}>
        {tag}
      </p>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
    </div>
    <p className='max-w-lg text-xl leading-relaxed' style={{ color: 'var(--color-text-secondary)' }}>
      {text}
    </p>
    <div>
      <Typewrite examples={examples} exampleLabel={exampleLabel} />
      <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
    </div>
    <button
      className='w-full cursor-pointer rounded-full border py-2 text-sm font-medium transition-colors'
      style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-background-primary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)'; }}
    >
      {ctaLabel}
    </button>
  </div>
);

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples, exampleLabel }: { examples: string[]; exampleLabel: string }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);
    return () => clearInterval(intervalId);
  }, [examples.length]);

  return (
    <p className='mb-2.5 text-sm font-light uppercase' style={{ color: 'var(--color-text-secondary)' }}>
      <span className='inline-block size-2' style={{ backgroundColor: 'var(--color-primary)' }} />
      <span className='ml-3'>
        {exampleLabel}{' '}
        {examples[exampleIndex].split('').map((l, i) => (
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: FADE_DELAY, duration: MAIN_FADE_DURATION, ease: 'easeInOut' }}
            key={`${exampleIndex}-${i}`}
            className='relative'
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * LETTER_DELAY, duration: 0 }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: i * LETTER_DELAY, times: [0, 0.1, 1], duration: BOX_FADE_DURATION, ease: 'easeInOut' }}
              className='absolute bottom-0.75 left-px right-0 top-0.75'
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};
