import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

type ToggleOptionsType = 'light' | 'dark';

const DarkToggle = () => {
  const [selected, setSelected] = useState<ToggleOptionsType>('light');
  return (
    <button
      className='flex items-center justify-center rounded-md border border-primary/10 bg-background-card h-10 w-10 text-text-primary transition-colors hover:bg-primary/10'
      onClick={() => setSelected(selected === 'light' ? 'dark' : 'light')}
      aria-label='Alternar modo escuro/claro'
    >
      <motion.div
        key={selected}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {selected === 'light' ? (
          <SunIcon weight='duotone' size={24} />
        ) : (
          <MoonIcon weight='duotone' size={24} />
        )}
      </motion.div>
    </button>
  );
};

export default DarkToggle;
