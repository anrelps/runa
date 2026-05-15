import { ArrowRightIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logoSvg from '../../../assets/logo.svg';

const hoverTransition = {
  type: 'spring',
  stiffness: 680,
  damping: 42,
  mass: 0.22,
} as const;

const useLang = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'pt' | 'en';
  const setLang = (l: 'pt' | 'en') => {
    i18n.changeLanguage(l);
    localStorage.setItem('app-lang', l);
  };
  return [lang, setLang] as const;
};

const LangSwitch = ({ layoutId }: { layoutId: string }) => {
  const [lang, setLang] = useLang();
  return (
    <div className='nav-container-gradient flex items-center rounded-full p-1 gap-0.5'>
      {(['EN', 'PT'] as const).map((l) => {
        const key = l.toLowerCase() as 'en' | 'pt';
        const active = lang === key;
        return (
          <button
            key={l}
            onClick={() => setLang(key)}
            className='relative px-3 py-1 rounded-full text-[11px] font-bold tracking-widest cursor-pointer'
            style={{ color: active ? 'var(--color-background-primary)' : 'var(--color-text-secondary)' }}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className='absolute inset-0 rounded-full'
                style={{ background: 'var(--color-primary)' }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className='relative z-10'>{l}</span>
          </button>
        );
      })}
    </div>
  );
};

const PublicNavBar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItemStyle, setHoveredItemStyle] = useState({ left: 0, width: 0, height: 0, opacity: 0 });

  const navItems = [
    { label: 'Home', to: '/' },
    { label: t('landing.nav.plans'), to: '/pricing' },
    { label: t('landing.nav.contact'), to: '/contact' },
    { label: t('landing.nav.about'), to: '/about' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavItemEnter = (target: HTMLLIElement) => {
    setHoveredItemStyle({ left: target.offsetLeft, width: target.offsetWidth, height: target.offsetHeight, opacity: 1 });
  };

  const handleNavLeave = () =>
    setHoveredItemStyle((current) => ({ ...current, opacity: 0 }));

  return (
    <>
      <header className='flex justify-between items-center px-4 py-3 md:px-8 max-w-6xl mx-auto w-full'>
        <img
          src={logoSvg}
          alt='Logo'
          className='h-6 w-auto'
          style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
        />

        <nav className='nav-container-gradient rounded-full px-6 hidden md:block absolute left-1/2 -translate-x-1/2'>
          <div className='flex items-center justify-center gap-1.5 p-1.5 text-text-primary'>
            <ul
              className='relative items-center justify-center gap-1.5 flex text-text-primary text-sm'
              onMouseLeave={handleNavLeave}
            >
              <motion.span
                aria-hidden='true'
                className='nav-hover-indicator'
                initial={false}
                animate={{
                  left: hoveredItemStyle.left,
                  width: hoveredItemStyle.width,
                  height: hoveredItemStyle.height,
                  opacity: hoveredItemStyle.opacity,
                }}
                transition={hoverTransition}
                style={{ willChange: 'left, width, opacity' }}
              />
              {navItems.map((item) => (
                <li key={item.label} onMouseEnter={(e) => handleNavItemEnter(e.currentTarget)}>
                  <Link
                    to={item.to}
                    className='nav-link-aware inline-flex items-center py-1.5 px-4 rounded-full transition-colors duration-150'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className='md:hidden flex items-center gap-2 relative z-50'>
          <LangSwitch layoutId='lang-pill-landing-mobile' />
          <button
            type='button'
            className='p-2 text-text-primary transition-colors'
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XIcon size={28} weight='regular' />
            ) : (
              <ListIcon size={28} weight='regular' />
            )}
          </button>
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <LangSwitch layoutId='lang-pill-landing' />
          <Link
            to='/login'
            className='group nav-container-gradient flex h-10 cursor-pointer items-center gap-2 rounded-full pl-3 pr-4 text-sm text-text-primary transition-all duration-200 ease-in-out hover:scale-105 hover:pl-2'
          >
            <span className='rounded-full bg-primary p-1 text-sm transition-colors duration-200 group-hover:bg-primary'>
              <ArrowRightIcon
                className='-translate-x-[200%] text-[0px] transition-all duration-200 group-hover:translate-x-0 group-hover:text-base group-hover:text-background-primary group-active:-rotate-45'
                weight='bold'
              />
            </span>
            <span>Login</span>
          </Link>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className='fixed inset-0 z-40 bg-background-primary/80 backdrop-blur-md md:hidden'
          onClick={toggleMobileMenu}
        >
          <nav
            className='flex h-full items-center justify-center'
            onClick={(e) => e.stopPropagation()}
          >
            <ul className='flex flex-col items-center justify-center gap-8 text-text-primary'>
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className='text-3xl font-medium transition-colors hover:text-primary'
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to='/login'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className='group nav-container-gradient flex h-11 cursor-pointer items-center gap-2 rounded-full pl-3 pr-5 text-lg text-text-primary transition-all duration-200 ease-in-out hover:scale-105'
                >
                  <span className='rounded-full bg-primary p-1 text-sm'>
                    <ArrowRightIcon weight='bold' className='text-background-primary' />
                  </span>
                  <span>Login</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default PublicNavBar;
