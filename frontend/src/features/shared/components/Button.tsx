import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  icon?: PhosphorIcon;
}

const Button = ({ children, onClick, icon: Icon }: ButtonProps) => {
  return (
    <motion.button
      className='relative flex items-center justify-center gap-2 rounded-md text-sm font-medium overflow-hidden bg-primary text-background-primary cursor-pointer hover:bg-white/10 transition-colors w-10 h-10 p-0 md:w-auto md:h-auto md:px-4 md:py-2'
      onClick={onClick}
    >
      {Icon && (
        <span className='shrink-0 flex items-center justify-center'>
          <Icon weight='fill' size={18} />
        </span>
      )}

      {children && (
        <span className='hidden md:inline whitespace-nowrap'>{children}</span>
      )}
    </motion.button>
  );
};

export default Button;
