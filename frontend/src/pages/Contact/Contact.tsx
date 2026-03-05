import {
  ChatCircleDotsIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import ShiftingContactForm from '../../features/contact/components/ShiftingContactForm';
import PublicLayout from '../../layouts/PublicLayout/PublicLayout';

const contactCards = [
  {
    icon: EnvelopeSimpleIcon,
    title: 'E-mail',
    description: 'contato@runa.app',
  },
  {
    icon: ClockIcon,
    title: 'Tempo de resposta',
    description: 'Até 24 horas úteis',
  },
  {
    icon: ChatCircleDotsIcon,
    title: 'FAQ',
    description: 'Consulte as dúvidas frequentes',
  },
];

const Contact = () => {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className='relative overflow-hidden'
        style={{ backgroundColor: 'var(--color-background-primary)' }}
      >
        <div className='mx-auto max-w-4xl px-4 pt-24 pb-12 text-center md:px-8'>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='mb-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'
            style={{ color: 'var(--color-text-primary)' }}
          >
            Fale com a gente
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className='mx-auto mb-12 max-w-xl text-base leading-relaxed md:text-lg'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Tem uma dúvida, sugestão ou quer saber mais sobre o Runa? Preencha o
            formulário abaixo ou use um dos nossos canais. Estamos prontos para
            ajudar.
          </motion.p>

          {/* Info cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3'
          >
            {contactCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className='flex flex-col items-center gap-2 rounded-xl border p-5'
                style={{
                  backgroundColor: 'var(--color-background-card)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className='grid size-10 place-content-center rounded-full'
                  style={{
                    backgroundColor: 'rgba(32, 224, 150, 0.12)',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Icon size={20} />
                </span>
                <span
                  className='text-sm font-semibold'
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {title}
                </span>
                <span
                  className='text-center text-xs'
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {description}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ShiftingContactForm />
    </PublicLayout>
  );
};

export default Contact;
