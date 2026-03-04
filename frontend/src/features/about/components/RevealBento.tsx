import {
  ArrowRightIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import logoSvg from '../../../assets/logo.svg';

export const RevealBento = () => {
  return (
    <div
      className='px-4 pt-12 pb-4'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <motion.div
        initial='initial'
        animate='animate'
        transition={{
          staggerChildren: 0.05,
        }}
        className='mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4'
      >
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
  );
};

type BlockProps = {
  className?: string;
} & MotionProps;

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge('col-span-4 rounded-lg border p-6', className)}
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className='col-span-12 row-span-2 md:col-span-6'>
    <img
      src={logoSvg}
      alt='Runa logo'
      className='mb-4 h-14 w-14'
      style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
    />
    <h1
      className='mb-12 text-4xl font-medium leading-tight'
      style={{ color: 'var(--color-text-primary)' }}
    >
      Conheça o Runa.{' '}
      <span style={{ color: 'var(--color-text-secondary)' }}>
        Uma ferramenta inteligente para organizar suas finanças.
      </span>
    </h1>
    <a
      href='#'
      className='flex items-center gap-1 hover:underline transition-colors'
      style={{ color: 'var(--color-primary)' }}
    >
      Comece agora <ArrowRightIcon size={20} />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: '2.5deg',
        scale: 1.1,
      }}
      className='col-span-6 md:col-span-3'
      style={{
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    >
      <a
        href='#'
        className='grid h-full place-content-center text-3xl transition-colors'
        style={{ color: '#FFFFFF' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#E0E0E0')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
      >
        <XLogoIcon weight='fill' />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1,
      }}
      className='col-span-6 md:col-span-3'
      style={{
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(217, 56, 141, 0.1)',
      }}
    >
      <a
        href='#'
        className='grid h-full place-content-center text-3xl transition-colors'
        style={{ color: '#D9388D' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#D9388Daa')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#D9388D')}
      >
        <InstagramLogoIcon weight='fill' />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: '-2.5deg',
        scale: 1.1,
      }}
      className='col-span-6 md:col-span-3'
      style={{
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(0, 119, 181, 0.1)',
      }}
    >
      <a
        href='#'
        className='grid h-full place-content-center text-3xl transition-colors'
        style={{ color: '#0077B5' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#0077B5aa')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#0077B5')}
      >
        <LinkedinLogoIcon weight='fill' />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: '2.5deg',
        scale: 1.1,
      }}
      className='col-span-6 md:col-span-3'
      style={{
        borderColor: 'rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(88, 96, 105, 0.15)',
      }}
    >
      <a
        href='#'
        className='grid h-full place-content-center text-3xl transition-colors'
        style={{ color: '#C0C0C0' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#E0E0E0')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#C0C0C0')}
      >
        <GithubLogoIcon weight='fill' />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className='col-span-12 text-3xl leading-snug'>
    <p style={{ color: 'var(--color-text-primary)' }}>
      Nossa Missão.{' '}
      <span style={{ color: 'var(--color-text-secondary)' }}>
        Acreditamos que todos merecem ter controle total sobre suas finanças,
        independentemente de sua experiência. Runa foi criada para democratizar
        a educação financeira, tornando a gestão de dinheiro simples, intuitiva
        e acessível a todos. Queremos empoderar você a tomar decisões
        financeiras melhores e construir um futuro mais seguro.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className='col-span-12 flex flex-col items-center gap-4 md:col-span-3'>
    <div style={{ color: 'var(--color-primary)' }}>
      <MapPinIcon size={32} />
    </div>
    <p
      className='text-center text-lg'
      style={{ color: 'var(--color-text-secondary)' }}
    >
      Brasil
    </p>
  </Block>
);

const EmailListBlock = () => (
  <Block className='col-span-12 md:col-span-9'>
    <p className='mb-3 text-lg' style={{ color: 'var(--color-text-primary)' }}>
      Junte-se à nossa lista
    </p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className='flex items-center gap-2'
    >
      <input
        type='email'
        placeholder='Seu e-mail'
        className='w-full rounded border px-3 py-1.5 transition-colors focus:outline-0'
        style={{
          backgroundColor: 'var(--color-background-primary)',
          borderColor: 'rgba(255,255,255,0.08)',
          color: 'var(--color-text-primary)',
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = 'var(--color-primary)')
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')
        }
      />
      <button
        type='submit'
        className='flex items-center gap-2 whitespace-nowrap rounded px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90'
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-background-primary)',
        }}
      >
        <EnvelopeIcon size={20} /> Inscrever
      </button>
    </form>
  </Block>
);

export default RevealBento;
