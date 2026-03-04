import { motion } from 'framer-motion';
import { type ReactNode, useEffect, useState } from 'react';

export const Example = () => {
  return (
    <div
      className='flex items-center justify-center px-8 py-24'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <BlockInTextCard
        tag='/ Suporte'
        text={
          <>
            <strong style={{ color: 'var(--color-text-primary)' }}>
              Tem dúvidas?
            </strong>{' '}
            Adoraríamos ajudar! Entre em contato com nosso suporte para qualquer
            questão.
          </>
        }
        examples={[
          'O Runa funciona para autônomos?',
          'Posso pausar minha assinatura sem perder dados?',
          'Como funciona o controle de despesas?',
          'Posso categorizar minhas transações?',
        ]}
      />
    </div>
  );
};

const BlockInTextCard = ({
  tag,
  text,
  examples,
}: {
  tag: string;
  text: ReactNode;
  examples: string[];
}) => {
  return (
    <div className='w-full max-w-xl space-y-6'>
      <div>
        <p
          className='mb-1.5 text-sm font-light uppercase'
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {tag}
        </p>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      </div>
      <p
        className='max-w-lg text-xl leading-relaxed'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {text}
      </p>
      <div>
        <Typewrite examples={examples} />
        <hr style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
      </div>
      <button
        className='w-full cursor-pointer rounded-full border py-2 text-sm font-medium transition-colors'
        style={{
          borderColor: 'var(--color-primary)',
          color: 'var(--color-primary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
          e.currentTarget.style.color = 'var(--color-background-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-primary)';
        }}
      >
        Fale Conosco
      </button>
    </div>
  );
};

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const Typewrite = ({ examples }: { examples: string[] }) => {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % examples.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p
      className='mb-2.5 text-sm font-light uppercase'
      style={{ color: 'var(--color-text-secondary)' }}
    >
      <span
        className='inline-block size-2'
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <span className='ml-3'>
        EXEMPLO:{' '}
        {examples[exampleIndex].split('').map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: 'easeInOut',
            }}
            key={`${exampleIndex}-${i}`}
            className='relative'
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: 'easeInOut',
              }}
              className='absolute bottom-0.75 left-px right-0 top-0.75'
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};
