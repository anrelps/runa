import {
  ArrowsClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  GearIcon,
  HouseIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import logoSvg from '../../../assets/logo.svg';

const navItems = [
  { icon: <HouseIcon weight='fill' />, label: 'Início' },
  { icon: <ChartBarIcon weight='fill' />, label: 'Dashboard' },
  { icon: <CurrencyDollarIcon weight='fill' />, label: 'Despesas' },
  { icon: <ArrowsClockwiseIcon weight='fill' />, label: 'Recorrentes' },
  { icon: <GearIcon weight='fill' />, label: 'Configurações' },
];

const IconSideNav = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.nav
      className='h-screen bg-background-card flex flex-col items-start gap-2 sticky top-0 border-r border-white/10 overflow-hidden'
      animate={{ width: expanded ? 220 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='flex items-center justify-center w-20 shrink-0 pt-4 pb-2'>
        <img
          src={logoSvg}
          alt='Runa'
          className='h-7 w-auto'
          style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
        />
      </div>

      <div className='flex flex-col gap-2 w-full px-3 flex-1'>
        {navItems.map((item, i) => (
          <NavItem
            key={i}
            selected={selected === i}
            id={i}
            setSelected={setSelected}
            label={item.label}
            expanded={expanded}
          >
            {item.icon}
          </NavItem>
        ))}
      </div>

      <div className='w-full px-3 pb-4'>
        <motion.button
          className='p-4 text-2xl w-full flex items-center justify-center rounded-md text-text-secondary hover:bg-white/10 transition-colors'
          onClick={() => setExpanded((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {expanded ? <CaretLeftIcon /> : <CaretRightIcon />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

const NavItem = ({
  children,
  selected,
  id,
  setSelected,
  label,
  expanded,
}: {
  children: ReactNode;
  selected: boolean;
  id: number;
  setSelected: Dispatch<SetStateAction<number>>;
  label: string;
  expanded: boolean;
}) => {
  return (
    <motion.button
      className='p-4 text-2xl bg-background-primary hover:bg-white/10 rounded-md transition-colors relative flex items-center gap-3 w-full'
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`block relative z-10 shrink-0 transition-colors ${selected ? 'text-background-primary' : 'text-text-secondary'}`}
      >
        {children}
      </span>
      <AnimatePresence>
        {expanded && (
          <motion.span
            className={`relative z-10 text-sm font-medium whitespace-nowrap transition-colors ${selected ? 'text-background-primary' : 'text-text-secondary'}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selected && (
          <motion.span
            className='absolute inset-0 rounded-md bg-primary z-0'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;
