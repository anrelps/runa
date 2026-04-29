import { motion } from 'framer-motion';
import brazilSvg from '../../../assets/brazil.svg';
import usaSvg from '../../../assets/usa.svg';
import { useLang } from './IconSideNav';

const LangToggle = () => {
  const [lang, setLang] = useLang();

  return (
    <button
      onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      aria-label='Alternar idioma'
      className='relative flex items-center justify-center rounded-md bg-background-card h-10 w-10 transition-colors hover:bg-primary/10 cursor-pointer overflow-hidden'
      style={{ border: '1px solid var(--color-primary)' }}
    >
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
      <motion.span
        key={lang}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className='relative z-10 text-[11px] font-bold uppercase tracking-widest'
        style={{ color: '#fff' }}
      >
        {lang}
      </motion.span>
    </button>
  );
};

export default LangToggle;
