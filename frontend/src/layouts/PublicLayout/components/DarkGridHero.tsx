import React, { type ReactNode, useEffect, useState } from 'react';

import { motion, type Transition } from 'framer-motion';

import { ArrowRightIcon } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';

export const DarkGridHero = () => {
  return (
    <section
      className='relative overflow-hidden'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <Content />

      <Beams />

      <GradientGrid />
    </section>
  );
};

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className='relative z-20 mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 md:px-8 md:py-36'>
      <motion.div
        initial={{
          y: 25,

          opacity: 0,
        }}
        animate={{
          y: 0,

          opacity: 1,
        }}
        transition={{
          duration: 1.25,

          ease: 'easeInOut',
        }}
        className='relative'
      >
        <GlowingChip>Comece gratuitamente hoje 🌟</GlowingChip>
      </motion.div>

      <motion.h1
        initial={{
          y: 25,

          opacity: 0,
        }}
        animate={{
          y: 0,

          opacity: 1,
        }}
        transition={{
          duration: 1.25,

          delay: 0.25,

          ease: 'easeInOut',
        }}
        className='mb-3 text-center text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-7xl lg:leading-tight'
        style={{ color: 'var(--color-text-primary)' }}
      >
        Descubra o poder do Runa{' '}
      </motion.h1>

      <motion.p
        initial={{
          y: 25,

          opacity: 0,
        }}
        animate={{
          y: 0,

          opacity: 1,
        }}
        transition={{
          duration: 1.25,

          delay: 0.5,

          ease: 'easeInOut',
        }}
        className='mb-9 max-w-2xl text-center text-base leading-relaxed sm:text-lg md:text-lg md:leading-relaxed'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Runa organiza suas receitas, despesas e contas recorrentes em um só
        lugar, para que você saiba exatamente como está sua vida financeira.
      </motion.p>

      <motion.div
        initial={{
          y: 25,

          opacity: 0,
        }}
        animate={{
          y: 0,

          opacity: 1,
        }}
        transition={{
          duration: 1.25,

          delay: 0.75,

          ease: 'easeInOut',
        }}
        className='flex flex-col items-center gap-6 sm:flex-row'
      >
        <SplashButton onClick={() => navigate('/login')} className='flex items-center gap-2'>
          Teste Grátis
          <ArrowRightIcon />
        </SplashButton>

        <GhostButton className='rounded-md px-4 py-2 text-zinc-100'>
          Saiba Mais
        </GhostButton>
      </motion.div>
    </div>
  );
};

const GlowingChip = ({ children }: { children: string }) => {
  return (
    <span
      className='relative z-10 mb-4 inline-block rounded-full px-3 py-1.5 text-xs md:mb-0'
      style={{
        borderColor: 'rgba(32, 224, 150, 0.3)',
        backgroundColor: 'rgba(32, 224, 150, 0.1)',
        color: 'var(--color-text-primary)',
      }}
    >
      {children}

      <span
        className='absolute bottom-0 left-3 right-3 h-[1px]'
        style={{
          backgroundImage:
            'linear-gradient(to right, transparent, var(--color-primary), transparent)',
        }}
      />
    </span>
  );
};

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-md px-4 py-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, var(--color-primary), #1a9d6e)',
        color: 'var(--color-background-primary)',
        outline: '2px solid rgba(32, 224, 150, 0.2)',
        outlineOffset: '1px',
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const GhostButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-md px-4 py-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
        className,
      )}
      style={{
        color: 'var(--color-text-primary)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(32, 224, 150, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const Beams = () => {
  const { width } = useWindowSize();

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0;

  const placements = [
    {
      top: GRID_BOX_SIZE * 0,

      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,

      transition: {
        duration: 3.5,

        repeatDelay: 5,

        delay: 2,
      },
    },

    {
      top: GRID_BOX_SIZE * 12,

      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,

      transition: {
        duration: 3.5,

        repeatDelay: 10,

        delay: 4,
      },
    },

    {
      top: GRID_BOX_SIZE * 3,

      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },

    {
      top: GRID_BOX_SIZE * 9,

      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,

      transition: {
        duration: 2,

        repeatDelay: 7.5,

        delay: 3.5,
      },
    },

    {
      top: 0,

      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,

      transition: {
        duration: 3,

        repeatDelay: 2,

        delay: 1,
      },
    },

    {
      top: GRID_BOX_SIZE * 2,

      left: Math.floor(numColumns * 1) * GRID_BOX_SIZE - GRID_BOX_SIZE,

      transition: {
        duration: 5,

        repeatDelay: 5,

        delay: 5,
      },
    },
  ];

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  );
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,

    height: undefined,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};

const Beam = ({ top, left, transition = {} }: BeamType) => {
  return (
    <motion.div
      initial={{
        y: 0,

        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],

        y: 32 * 8,
      }}
      transition={{
        ease: 'easeInOut',

        duration: 3,

        repeat: Infinity,

        repeatDelay: 1.5,

        ...transition,
      }}
      style={{
        top,

        left,
        backgroundImage:
          'linear-gradient(to bottom, transparent, var(--color-primary))',
      }}
      className='absolute z-10 h-[64px] w-[1px]'
    />
  );
};

const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,

        ease: 'easeInOut',
      }}
      className='absolute inset-0 z-0'
    >
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgba(32, 224, 150, 0.15)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
        className='absolute inset-0 z-0'
      />

      <div
        className='absolute inset-0 z-10'
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(11, 18, 18, 0), var(--color-background-primary))',
        }}
      />
    </motion.div>
  );
};

const GRID_BOX_SIZE = 32;

const BEAM_WIDTH_OFFSET = 1;

type WindowSize = {
  width: number | undefined;

  height: number | undefined;
};

type BeamType = {
  top: number;

  left: number;

  transition?: Transition;
};

type ButtonProps = {
  children: ReactNode;

  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
