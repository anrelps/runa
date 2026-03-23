import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';

const DarkToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className='flex items-center justify-center rounded-md border border-primary/20 bg-background-card h-10 w-10 text-text-primary transition-colors hover:bg-primary/10 cursor-pointer'
      style={{
        boxShadow: theme === 'light' ? '0 1px 4px hsla(210, 20%, 50%, 0.15), inset 0 1px 0 hsla(0,0%,100%,0.8)' : undefined,
      }}
      onClick={toggleTheme}
      aria-label='Alternar modo escuro/claro'
    >
      <motion.div
        key={theme}
        initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {theme === 'light' ? (
          <MoonIcon weight='duotone' size={24} />
        ) : (
          <SunIcon weight='duotone' size={24} />
        )}
      </motion.div>
    </button>
  );
};

export default DarkToggle;
