import {
  ArrowLeftIcon,
  GithubLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import logoSvg from '../../../assets/logo.svg';

export const DarkGridAuth = () => {
  return (
    <div
      className='min-h-screen py-20'
      style={{
        backgroundColor: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <Link
        to='/'
        className='absolute left-4 top-6 z-10 flex cursor-pointer items-center gap-2 text-sm transition-colors hover:opacity-80'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <ArrowLeftIcon />
        Voltar
      </Link>

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.25,
          ease: 'easeInOut',
        }}
        className='relative z-10 mx-auto w-full max-w-xl p-4'
      >
        <Heading />

        <SocialOptions />
        <Or />
        <Email />
        <Terms />
      </motion.div>

      <CornerGrid />
    </div>
  );
};

const Heading = () => (
  <div>
    <NavLogo />
    <div className='mb-9 mt-6 space-y-1.5'>
      <h1
        className='text-2xl font-semibold'
        style={{ color: 'var(--color-text-primary)' }}
      >
        Entre na sua conta
      </h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        Ainda não tem uma conta?{' '}
        <a
          href='#'
          className='cursor-pointer transition-colors hover:opacity-80'
          style={{ color: 'var(--color-primary)' }}
        >
          Crie uma.
        </a>
      </p>
    </div>
  </div>
);

const SocialOptions = () => (
  <div>
    <div className='mb-3 flex gap-3'>
      <BubbleButton className='flex w-full justify-center py-3'>
        <XLogoIcon />
      </BubbleButton>
      <BubbleButton className='flex w-full justify-center py-3'>
        <GithubLogoIcon />
      </BubbleButton>
    </div>
    <BubbleButton className='flex w-full justify-center py-3'>
      Entrar com SSO
    </BubbleButton>
  </div>
);

const Or = () => {
  return (
    <div className='my-6 flex items-center gap-3'>
      <div
        className='h-px w-full'
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />
      <span style={{ color: 'var(--color-text-secondary)' }}>OU</span>
      <div
        className='h-px w-full'
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />
    </div>
  );
};

const Email = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='mb-3'>
        <label
          htmlFor='email-input'
          className='mb-1.5 block'
          style={{ color: 'var(--color-text-secondary)' }}
        >
          E-mail
        </label>
        <input
          id='email-input'
          type='email'
          placeholder='seu.email@provedor.com'
          className='w-full rounded-md border px-3 py-2 ring-1 ring-transparent transition-shadow focus:outline-0'
          style={{
            backgroundColor: 'var(--color-background-card)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>
      <div className='mb-6'>
        <div className='mb-1.5 flex items-end justify-between'>
          <label
            htmlFor='password-input'
            className='block'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Senha
          </label>
          <a
            href='#'
            className='cursor-pointer text-sm transition-colors hover:opacity-80'
            style={{ color: 'var(--color-primary)' }}
          >
            Esqueceu?
          </a>
        </div>
        <input
          id='password-input'
          type='password'
          placeholder='••••••••••••'
          className='w-full rounded-md border px-3 py-2 ring-1 ring-transparent transition-shadow focus:outline-0'
          style={{
            backgroundColor: 'var(--color-background-card)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>
      <SplashButton type='submit' className='w-full'>
        Entrar
      </SplashButton>
    </form>
  );
};

const Terms = () => (
  <p className='mt-9 text-xs' style={{ color: 'var(--color-text-secondary)' }}>
    Ao entrar, você concorda com nossos{' '}
    <a
      href='#'
      className='cursor-pointer transition-colors hover:opacity-80'
      style={{ color: 'var(--color-primary)' }}
    >
      Termos de Uso
    </a>{' '}
    e{' '}
    <a
      href='#'
      className='cursor-pointer transition-colors hover:opacity-80'
      style={{ color: 'var(--color-primary)' }}
    >
      Política de Privacidade.
    </a>
  </p>
);

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'cursor-pointer rounded-md px-4 py-2 text-lg font-medium transition-all hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(to bottom right, var(--color-primary), #1a9d6e)',
        color: 'var(--color-background-primary)',
        outline: '2px solid rgba(32, 224, 150, 0.2)',
        outlineOffset: '2px',
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const BubbleButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex cursor-pointer items-center gap-2 overflow-hidden whitespace-nowrap rounded-md
        border px-3 py-1.5
        transition-all duration-300

        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%]
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105
        hover:before:translate-y-[0%]
        active:scale-100`,
        className,
      )}
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderColor: 'rgba(255,255,255,0.08)',
        color: 'var(--color-text-primary)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(32, 224, 150, 0.1)';
        e.currentTarget.style.borderColor = 'rgba(32, 224, 150, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-background-card)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgba(32, 224, 150, 0.15)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className='absolute right-0 top-0 z-0 size-[50vw]'
    >
      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'radial-gradient(100% 100% at 100% 0%, transparent, var(--color-background-primary))',
        }}
      />
    </div>
  );
};

const NavLogo = () => {
  return (
    <Link to='/'>
      <img
        src={logoSvg}
        alt='Runa'
        className='h-8 w-auto'
        style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
      />
    </Link>
  );
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
