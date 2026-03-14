import { CheckIcon, XIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { type CSSProperties, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const DarkGradientPricing = () => {
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
            Planos
          </h2>
          <p
            className='text-center text-base md:text-lg'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Comece gratuitamente e evolua conforme sua necessidade. Organize
            suas finanças do seu jeito.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
          className='grid grid-cols-1 gap-6 md:grid-cols-3'
        >
          <PriceCard
            tier='Gratuito'
            price='R$ 0'
            period='/mês'
            bestFor='Ideal para começar a organizar suas finanças'
            CTA={<GhostButton className='w-full'>Começar grátis</GhostButton>}
            benefits={[
              { text: 'Receitas e despesas', checked: true },
              { text: 'Até 50 lançamentos/mês', checked: true },
              { text: 'Relatórios básicos', checked: true },
              { text: 'Contas recorrentes', checked: false },
              { text: 'Exportação de dados', checked: false },
              { text: 'Suporte prioritário', checked: false },
            ]}
          />
          <PriceCard
            tier='Pro'
            price='R$ 19,90'
            period='/mês'
            bestFor='Controle total das suas finanças'
            highlighted
            CTA={
              <SplashButton className='w-full'>
                Testar grátis 14 dias
              </SplashButton>
            }
            benefits={[
              { text: 'Lançamentos ilimitados', checked: true },
              { text: 'Contas recorrentes', checked: true },
              { text: 'Relatórios avançados', checked: true },
              { text: 'Exportação CSV/PDF', checked: true },
              { text: 'Metas financeiras', checked: true },
              { text: 'Suporte prioritário', checked: false },
            ]}
          />
          <PriceCard
            tier='Família'
            price='R$ 34,90'
            period='/mês'
            bestFor='Finanças de toda a família'
            CTA={<GhostButton className='w-full'>Fale conosco</GhostButton>}
            benefits={[
              { text: 'Tudo do plano Pro', checked: true },
              { text: 'Até 5 membros', checked: true },
              { text: 'Orçamento compartilhado', checked: true },
              { text: 'Relatórios por membro', checked: true },
              { text: 'Metas em grupo', checked: true },
              { text: 'Suporte prioritário', checked: true },
            ]}
          />
        </motion.div>
      </div>
    </section>
  );
};

const PriceCard = ({
  tier,
  price,
  period,
  bestFor,
  CTA,
  benefits,
  highlighted,
}: PriceCardProps) => {
  return (
    <Card highlighted={highlighted}>
      <div
        className='flex flex-col items-center border-b pb-6'
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <span
          className='mb-6 inline-block text-sm font-semibold uppercase tracking-wider'
          style={{
            color: highlighted
              ? 'var(--color-primary)'
              : 'var(--color-text-primary)',
          }}
        >
          {tier}
        </span>
        <div className='mb-3 flex items-baseline gap-1'>
          <span
            className='text-3xl font-medium sm:text-4xl'
            style={{ color: 'var(--color-text-primary)' }}
          >
            {price}
          </span>
          <span
            className='text-sm'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {period}
          </span>
        </div>
        <span
          className='text-center text-xs sm:text-sm'
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {bestFor}
        </span>
      </div>

      <div className='space-y-4 py-9'>
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  );
};

const Benefit = ({ text, checked }: BenefitType) => {
  return (
    <div className='flex items-center gap-3'>
      {checked ? (
        <span
          className='grid size-5 place-content-center rounded-full text-sm'
          style={{
            backgroundColor: 'rgba(32, 224, 150, 0.15)',
            color: 'var(--color-primary)',
          }}
        >
          <CheckIcon />
        </span>
      ) : (
        <span
          className='grid size-5 place-content-center rounded-full text-sm'
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <XIcon />
        </span>
      )}
      <span
        className='text-sm'
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {text}
      </span>
    </div>
  );
};

const Card = ({ className, children, style = {}, highlighted }: CardProps) => {
  return (
    <motion.div
      initial={{
        filter: 'blur(2px)',
      }}
      whileInView={{
        filter: 'blur(0px)',
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        delay: 0.25,
      }}
      style={{
        backgroundColor: 'var(--color-background-card)',
        borderColor: highlighted
          ? 'rgba(32, 224, 150, 0.3)'
          : 'rgba(255,255,255,0.06)',
        boxShadow: highlighted
          ? '0 0 30px rgba(32, 224, 150, 0.08)'
          : undefined,
        ...style,
      }}
      className={twMerge(
        'relative h-full w-full overflow-hidden rounded-2xl border p-6',
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

const GhostButton = ({ children, className, ...rest }: GhostButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-md px-4 py-2 text-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
        className,
      )}
      style={{ color: 'var(--color-text-primary)' }}
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

const SplashButton = ({ children, className, ...rest }: GhostButtonProps) => {
  return (
    <button
      className={twMerge(
        'rounded-md px-4 py-2 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer',
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

type PriceCardProps = {
  tier: string;
  price: string;
  period: string;
  bestFor: string;
  CTA: ReactNode;
  benefits: BenefitType[];
  highlighted?: boolean;
};

type CardProps = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  highlighted?: boolean;
};

type BenefitType = {
  text: string;
  checked: boolean;
};

type GhostButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
