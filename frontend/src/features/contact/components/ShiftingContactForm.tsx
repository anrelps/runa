import { AnimatePresence, motion } from 'framer-motion';
import { type Dispatch, type SetStateAction, useState } from 'react';

const BASE_TRANSITION = { ease: 'easeInOut', duration: 0.75 } as const;

const ShiftingContactForm = () => {
  const [selected, setSelected] = useState<'company' | 'individual'>(
    'individual',
  );

  return (
    <section
      className='px-4 pt-8'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <div
        className='mx-auto flex w-full max-w-6xl flex-col-reverse overflow-hidden rounded-lg border lg:flex-row'
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <Form selected={selected} setSelected={setSelected} />
        <Images selected={selected} />
      </div>
    </section>
  );
};

const Form = ({
  selected,
  setSelected,
}: {
  selected: 'company' | 'individual';
  setSelected: Dispatch<SetStateAction<'company' | 'individual'>>;
}) => {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='w-full p-8 transition-colors duration-750'
      style={{
        backgroundColor: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
      }}
    >
      <h3 className='mb-6 text-4xl font-bold'>Entre em contato</h3>

      <div className='mb-6'>
        <p className='mb-2 text-2xl'>Olá 👋! Meu nome é...</p>
        <input
          type='text'
          placeholder='Seu nome...'
          className='w-full border-b bg-transparent p-2 transition-colors duration-750 focus:outline-0'
          style={{
            borderColor: 'rgba(255,255,255,0.12)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      <div className='mb-6'>
        <p className='mb-2 text-2xl'>e eu represento...</p>
        <FormSelect selected={selected} setSelected={setSelected} />
      </div>

      <AnimatePresence>
        {selected === 'company' && (
          <motion.div
            initial={{ marginTop: -104, opacity: 0 }}
            animate={{ marginTop: 0, opacity: 1 }}
            exit={{ marginTop: -104, opacity: 0 }}
            transition={BASE_TRANSITION}
            className='mb-6'
          >
            <p className='mb-2 text-2xl'>com o nome de...</p>
            <input
              type='text'
              placeholder='Nome da empresa...'
              className='w-full border-b bg-transparent p-2 transition-colors duration-750 focus:outline-0'
              style={{
                borderColor: 'rgba(255,255,255,0.12)',
                color: 'var(--color-text-primary)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className='mb-6'>
        <p className='mb-2 text-2xl'>Quero falar sobre...</p>
        <textarea
          placeholder='Conte sua dúvida ou objetivo...'
          className='min-h-37.5 w-full resize-none border-b bg-transparent p-2 transition-colors duration-750 focus:outline-0'
          style={{
            borderColor: 'rgba(255,255,255,0.12)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      <button
        type='submit'
        className='w-full cursor-pointer rounded-lg py-3 text-center text-lg font-semibold transition-opacity duration-300 hover:opacity-90'
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-background-primary)',
        }}
      >
        Enviar mensagem
      </button>
    </form>
  );
};

const FormSelect = ({
  selected,
  setSelected,
}: {
  selected: 'company' | 'individual';
  setSelected: Dispatch<SetStateAction<'company' | 'individual'>>;
}) => {
  return (
    <div className='flex w-fit gap-px overflow-hidden rounded-lg font-medium'>
      <button
        type='button'
        className='relative cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors duration-750'
        style={{
          color:
            selected === 'individual'
              ? 'var(--color-background-primary)'
              : 'var(--color-text-primary)',
        }}
        onClick={() => setSelected('individual')}
      >
        <span className='relative z-10'>Pessoa física</span>
        {selected === 'individual' && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId='form-tab'
            className='absolute inset-0 z-0 rounded-lg'
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        )}
      </button>

      <button
        type='button'
        className='relative cursor-pointer rounded-lg px-3 py-1.5 text-sm transition-colors duration-750'
        style={{
          color:
            selected === 'company'
              ? 'var(--color-background-primary)'
              : 'var(--color-text-primary)',
        }}
        onClick={() => setSelected('company')}
      >
        <span className='relative z-10'>Empresa</span>
        {selected === 'company' && (
          <motion.div
            transition={BASE_TRANSITION}
            layoutId='form-tab'
            className='absolute inset-0 z-0 rounded-lg'
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
        )}
      </button>
    </div>
  );
};

const Images = ({ selected }: { selected: 'company' | 'individual' }) => {
  return (
    <div
      className='relative min-h-25 w-full overflow-hidden'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      <motion.div
        initial={false}
        animate={{ x: selected === 'individual' ? '0%' : '100%' }}
        transition={BASE_TRANSITION}
        className='absolute inset-0'
        style={{
          filter: 'brightness(0.72) saturate(0.9)',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        initial={false}
        animate={{ x: selected === 'company' ? '0%' : '-100%' }}
        transition={BASE_TRANSITION}
        className='absolute inset-0'
        style={{
          filter: 'brightness(0.72) saturate(0.9)',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className='pointer-events-none absolute inset-0'
        style={{ backgroundColor: 'rgba(11,18,18,0.45)' }}
      />
    </div>
  );
};

export default ShiftingContactForm;
