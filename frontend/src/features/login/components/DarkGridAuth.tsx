import {
  ArrowLeftIcon,
  GithubLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import logoSvg from '../../../assets/logo.svg';
import { demo, login } from '../../../redux/slices/userSlice';
import { useAppDispatch } from '../../../redux/store';

export const DarkGridAuth = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email: formData.email, password: formData.password }));
  };

  const handleDemo = () => {
    dispatch(demo());
  };

  useEffect(
    function () {
      console.log('Authentication status changed:', isAuthenticated);
      if (isAuthenticated) {
        navigate('/dashboard');
      }
    },
    [isAuthenticated, navigate],
  );

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
        {t('common.back')}
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
        <Email
          handleSubmit={handleSubmit}
          handleDemo={handleDemo}
          formData={formData}
          setFormData={setFormData}
          loading={loading}
        />
        <Terms />
      </motion.div>

      <CornerGrid />
    </div>
  );
};

const Heading = () => {
  const { t } = useTranslation();
  return (
    <div>
      <NavLogo />
      <div className='mb-9 mt-6 space-y-1.5'>
        <h1
          className='text-2xl font-semibold'
          style={{ color: 'var(--color-text-primary)' }}
        >
          {t('auth.title')}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {t('auth.noAccount')}{' '}
          <a
            href='#'
            className='cursor-pointer transition-colors hover:opacity-80'
            style={{ color: 'var(--color-primary)' }}
          >
            {t('auth.createOne')}
          </a>
        </p>
      </div>
    </div>
  );
};

const SocialOptions = () => {
  const { t } = useTranslation();
  return (
    <div className='opacity-40 cursor-not-allowed'>
      <div className='mb-3 flex gap-3 pointer-events-none'>
        <BubbleButton className='flex w-full justify-center py-3'>
          <XLogoIcon />
        </BubbleButton>
        <BubbleButton className='flex w-full justify-center py-3'>
          <GithubLogoIcon />
        </BubbleButton>
      </div>
      <BubbleButton className='flex w-full justify-center py-3 pointer-events-none'>
        {t('auth.sso')}
      </BubbleButton>
    </div>
  );
};

const Or = () => {
  const { t } = useTranslation();
  return (
    <div className='my-6 flex items-center gap-3 opacity-40'>
      <div
        className='h-px w-full'
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />
      <span style={{ color: 'var(--color-text-secondary)' }}>{t('auth.or')}</span>
      <div
        className='h-px w-full'
        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
      />
    </div>
  );
};

type EmailProps = {
  handleSubmit: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  handleDemo: () => void;
  formData: { email: string; password: string };
  setFormData: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  loading: boolean;
};

const Email = ({ handleSubmit, handleDemo, formData, setFormData, loading }: EmailProps) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label
          htmlFor='email-input'
          className='mb-1.5 block'
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {t('auth.email')}
        </label>
        <input
          id='email-input'
          type='email'
          placeholder={t('auth.emailPlaceholder')}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
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
            {t('auth.password')}
          </label>
          <a
            href='#'
            className='cursor-pointer text-sm transition-colors hover:opacity-80'
            style={{ color: 'var(--color-primary)' }}
          >
            {t('auth.forgotPassword')}
          </a>
        </div>
        <input
          id='password-input'
          type='password'
          placeholder='••••••••••••'
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className='w-full rounded-md border px-3 py-2 ring-1 ring-transparent transition-shadow focus:outline-0'
          style={{
            backgroundColor: 'var(--color-background-card)',
            borderColor: 'rgba(255,255,255,0.08)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>
      <div className='flex gap-3'>
        <BubbleButton
          type='submit'
          disabled={loading}
          className='flex flex-1 justify-center py-2.5 text-base font-medium'
        >
          {loading ? t('auth.submitting') : t('auth.submit')}
        </BubbleButton>
        <SplashButton
          type='button'
          disabled={loading}
          onClick={handleDemo}
          className='flex-1'
        >
          {loading ? t('auth.loading') : t('auth.demo')}
        </SplashButton>
      </div>
    </form>
  );
};

const Terms = () => {
  const { t } = useTranslation();
  return (
    <p className='mt-9 text-xs' style={{ color: 'var(--color-text-secondary)' }}>
      {t('auth.terms')}{' '}
      <a
        href='#'
        className='cursor-pointer transition-colors hover:opacity-80'
        style={{ color: 'var(--color-primary)' }}
      >
        {t('auth.termsLink')}
      </a>{' '}
      {t('auth.and')}{' '}
      <a
        href='#'
        className='cursor-pointer transition-colors hover:opacity-80'
        style={{ color: 'var(--color-primary)' }}
      >
        {t('auth.privacyLink')}
      </a>
    </p>
  );
};

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

const BubbleButton = ({ children, className, disabled, ...rest }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
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
        active:scale-100
        disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none`,
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
