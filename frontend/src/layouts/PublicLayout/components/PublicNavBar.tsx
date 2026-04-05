import { ArrowRightIcon, ListIcon, XIcon } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../../../assets/logo.svg';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Planos', to: '/pricing' },
  { label: 'Contato', to: '/contact' },
  { label: 'Sobre', to: '/about' },
];
const hoverTransition = {
  type: 'spring',
  stiffness: 680,
  damping: 42,
  mass: 0.22,
} as const;

const PublicNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItemStyle, setHoveredItemStyle] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavItemEnter = (target: HTMLLIElement) => {
    setHoveredItemStyle({
      left: target.offsetLeft,
      width: target.offsetWidth,
      height: target.offsetHeight,
      opacity: 1,
    });
  };

  const handleNavLeave = () => {
    setHoveredItemStyle((current) => ({ ...current, opacity: 0 }));
  };

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
                <li
                  key={item.label}
                  onMouseEnter={(event) =>
                    handleNavItemEnter(event.currentTarget)
                  }
                >
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

        <button
          type='button'
          className='md:hidden relative z-50 p-2 text-text-primary transition-colors'
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

        <Link
          to='/login'
          className='group nav-container-gradient hidden h-10 cursor-pointer items-center gap-2 rounded-full pl-3 pr-4 text-sm text-text-primary transition-all duration-200 ease-in-out hover:scale-105 hover:pl-2 md:flex'
        >
          <span className='rounded-full bg-primary p-1 text-sm transition-colors duration-200 group-hover:bg-primary'>
            <ArrowRightIcon
              className='-translate-x-[200%] text-[0px] transition-all duration-200 group-hover:translate-x-0 group-hover:text-base group-hover:text-background-primary group-active:-rotate-45'
              weight='bold'
            />
          </span>
          <span>Login</span>
        </Link>
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
