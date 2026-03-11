import React from 'react';

const CATEGORIES = [
  { label: 'Alimentação', color: 'var(--color-accent-start, #ff6b4a)' },
  { label: 'Transporte', color: 'var(--color-primary, #20e096)' },
  { label: 'Lazer', color: 'var(--color-accent-orange, #ff9a4a)' },
  { label: 'Saúde', color: 'var(--color-accent-end, #00c6ff)' },
  { label: 'Outros', color: 'var(--color-text-secondary, #6e8a85)' },
];

const CategoryFilterButtons: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.label}
          type='button'
          className='flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-card,rgba(32,224,150,0.08))] bg-[var(--color-background-card,#141f1f)] text-[var(--color-text-secondary,#6e8a85)] text-sm font-medium hover:bg-[var(--color-border-card,rgba(32,224,150,0.08))] transition-colors'
        >
          <span
            className='inline-block w-3 h-3 rounded-full'
            style={{ background: cat.color }}
          ></span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterButtons;
