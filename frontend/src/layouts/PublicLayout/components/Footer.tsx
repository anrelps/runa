import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import logoSvg from '../../../assets/logo.svg';
import GradientDivider from '../../../features/landing/components/GradientDivider';

const footerLinks = {
  navegação: [
    { label: 'Home', to: '/' },
    { label: 'Planos', to: '#' },
    { label: 'Contato', to: '/contact' },
    { label: 'Sobre', to: '/about' },
  ],
  legal: [
    { label: 'Privacidade', to: '#' },
    { label: 'Termos de uso', to: '#' },
  ],
};

const socialLinks = [
  { icon: XLogoIcon, href: '#', label: 'X' },
  { icon: InstagramLogoIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinLogoIcon, href: '#', label: 'LinkedIn' },
  { icon: GithubLogoIcon, href: '#', label: 'GitHub' },
];

const Footer = () => {
  return (
    <footer
      className='relative'
      style={{ backgroundColor: 'var(--color-background-primary)' }}
    >
      {/* Top gradient divider */}
      <GradientDivider />

      <div className='mx-auto max-w-6xl px-4 pt-16 pb-8 md:px-8'>
        {/* Main grid */}
        <div className='grid grid-cols-2 gap-10 md:grid-cols-4 lg:gap-16'>
          {/* Brand column */}
          <div className='col-span-2'>
            <img
              src={logoSvg}
              alt='Runa'
              className='mb-4 h-6 w-auto'
              style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
            />
            <p
              className='mb-6 max-w-xs text-sm leading-relaxed'
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Organize suas finanças de forma simples e inteligente. Runa te
              ajuda a ter controle total sobre receitas, despesas e contas
              recorrentes.
            </p>

            {/* Newsletter */}
            <div className='flex w-full max-w-xs items-center gap-2'>
              <div className='relative flex-1'>
                <EnvelopeSimpleIcon
                  size={16}
                  className='absolute left-3 top-1/2 -translate-y-1/2'
                  style={{ color: 'var(--color-text-secondary)' }}
                />
                <input
                  type='email'
                  placeholder='Seu e-mail'
                  className='w-full rounded-lg border py-2 pr-3 pl-9 text-sm outline-none transition-colors focus:border-primary'
                  style={{
                    backgroundColor: 'var(--color-background-card)',
                    borderColor: 'rgba(255,255,255,0.08)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>
              <button
                type='button'
                className='cursor-pointer whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90'
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-background-primary)',
                }}
              >
                Inscrever
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className='mb-4 text-sm font-semibold uppercase tracking-wider'
                style={{ color: 'var(--color-text-primary)' }}
              >
                {title}
              </h4>
              <ul className='space-y-3'>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className='text-sm transition-colors duration-200 hover:text-primary'
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className='mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row'
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <p
            className='text-xs'
            style={{ color: 'var(--color-text-secondary)' }}
          >
            &copy; {new Date().getFullYear()} Runa. Todos os direitos
            reservados.
          </p>

          <div className='flex items-center gap-3'>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className='rounded-md p-2 transition-colors duration-200 hover:bg-[rgba(255,255,255,0.06)]'
                style={{ color: 'var(--color-text-secondary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--color-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--color-text-secondary)')
                }
              >
                <Icon size={20} weight='regular' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
