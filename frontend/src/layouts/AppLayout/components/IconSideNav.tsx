import {
  ArrowsClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChartLineDownIcon,
  ChartLineUpIcon,
  PresentationChartIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import brazilSvg from '../../../assets/brazil.svg';
import logoSvg from '../../../assets/logo.svg';
import usaSvg from '../../../assets/usa.svg';
import { useTheme } from '../../../contexts/ThemeContext';

const navItems = [
  {
    icon: <PresentationChartIcon weight='fill' />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <ChartLineDownIcon weight='fill' />,
    label: 'Gastos',
    path: '/expenses',
  },
  {
    icon: <ChartLineUpIcon weight='fill' />,
    label: 'Saldo',
    path: '/incomes',
  },
  {
    icon: <ArrowsClockwiseIcon weight='fill' />,
    label: 'Compromissos',
    path: '/commitments',
  },
];


export const useLang = () => {
  const [lang, setLangState] = useState<'pt' | 'en'>(
    () => (localStorage.getItem('app-lang') as 'pt' | 'en') ?? 'pt'
  );
  const setLang = (l: 'pt' | 'en') => {
    localStorage.setItem('app-lang', l);
    setLangState(l);
  };
  return [lang, setLang] as const;
};

const IconSideNav = () => {
  const [expanded, setExpanded] = useState(() => localStorage.getItem('sidenav-expanded') === 'true');
  const [lang, setLang] = useLang();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  // Determina o item ativo baseado na rota atual
  const selected = navItems.findIndex((item) =>
    location.pathname.startsWith(item.path),
  );

  const handleNav = (i: number) => {
    navigate(navItems[i].path);
  };

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <motion.nav
        className='hidden md:flex h-screen bg-background-card flex-col items-start gap-2 sticky top-0 border-r border-border-subtle overflow-hidden'
        animate={{ width: expanded ? 220 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className='flex items-center justify-center w-20 shrink-0 pt-4 pb-2'>
          <img
            src={logoSvg}
            alt='Runa'
            className='h-7 w-auto transition-all duration-300'
            style={{ filter: theme === 'light' ? 'brightness(0)' : 'brightness(0) saturate(100%) invert(1)' }}
          />
        </div>

        <div className='flex flex-col gap-2 w-full px-3 flex-1'>
          {navItems.map((item, i) => (
            <NavItem
              key={i}
              selected={selected === i}
              id={i}
              setSelected={() => handleNav(i)}
              label={item.label}
              expanded={expanded}
            >
              {item.icon}
            </NavItem>
          ))}
        </div>

        <div className='w-full px-3 pb-4 flex flex-col gap-1'>
          {/* Language switch — nav-item shaped container, toggle inside */}
          <div className='p-4 bg-background-primary rounded-md relative flex items-center w-full overflow-hidden' style={{ minHeight: '56px', border: '2px solid var(--color-background-primary)' }}>
            {/* Flag background — subtle, fading to transparent at center */}
            <img
              src={lang === 'pt' ? brazilSvg : usaSvg}
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 w-full h-full object-cover'
              style={{
                opacity: 0.32,
              filter: 'grayscale(100%)',
                maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 0%, black 80%)',
              }}
            />
            {expanded ? (
              /* Expanded: pill toggle inside the box */
              <motion.div
                className='flex items-center rounded-md w-full overflow-hidden'
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: 'color-mix(in srgb, var(--color-text-primary) 8%, transparent)',
                  padding: '3px',
                }}
              >
                {(['pt', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className='relative flex-1 py-1.5 rounded-sm text-[11px] font-bold uppercase tracking-widest cursor-pointer transition-colors z-10'
                    style={{ color: lang === l ? 'var(--color-background-primary)' : 'var(--color-text-secondary)' }}
                  >
                    {lang === l && (
                      <motion.span
                        layoutId='lang-pill'
                        className='absolute inset-0 rounded-sm'
                        style={{ background: 'var(--color-primary)' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className='relative z-10'>{l}</span>
                  </button>
                ))}
              </motion.div>
            ) : (
              /* Collapsed: current lang code in icon position */
              <button
                onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
                className='flex items-center justify-center w-full h-full cursor-pointer'
              >
                <span className='text-xs font-bold uppercase tracking-widest' style={{ color: 'var(--color-text-secondary)' }}>
                  {lang}
                </span>
              </button>
            )}
          </div>

          <motion.button
            className='p-4 text-2xl w-full flex items-center justify-center rounded-md text-text-secondary hover:bg-white/10 transition-colors cursor-pointer'
            onClick={() => setExpanded((prev) => { const next = !prev; localStorage.setItem('sidenav-expanded', String(next)); return next; })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {expanded ? <CaretLeftIcon /> : <CaretRightIcon />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile bottom nav — visible only on mobile */}
      <nav className='md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background-card border-t border-border-subtle flex items-center justify-around px-2 py-2'>
        {navItems.map((item, i) => (
          <BottomNavItem
            key={i}
            selected={selected === i}
            id={i}
            setSelected={() => handleNav(i)}
            label={item.label}
          >
            {item.icon}
          </BottomNavItem>
        ))}
      </nav>
    </>
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
      className='p-4 text-2xl bg-background-primary hover:bg-white/10 rounded-md transition-colors relative flex items-center gap-3 w-full cursor-pointer'
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

const BottomNavItem = ({
  children,
  selected,
  id,
  setSelected,
  label,
}: {
  children: ReactNode;
  selected: boolean;
  id: number;
  setSelected: Dispatch<SetStateAction<number>>;
  label: string;
}) => {
  return (
    <motion.button
      className='relative flex flex-col items-center justify-center gap-1 p-3 rounded-md flex-1 transition-colors cursor-pointer'
      onClick={() => setSelected(id)}
      whileTap={{ scale: 0.95 }}
    >
      <span
        className={`relative z-10 text-2xl shrink-0 transition-colors ${selected ? 'text-background-primary' : 'text-text-secondary'}`}
      >
        {children}
      </span>
      <span
        className={`relative z-10 text-[10px] font-medium whitespace-nowrap transition-colors ${selected ? 'text-background-primary' : 'text-text-secondary'}`}
      >
        {label}
      </span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className='absolute inset-0 rounded-md bg-primary z-0'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;
