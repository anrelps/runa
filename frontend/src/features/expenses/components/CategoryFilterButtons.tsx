import React from 'react';
import { CATEGORIES, CATEGORY_ACCENTS } from '../../../utils/consts';

const CategoryFilterButtons: React.FC = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type='button'
          className='flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--color-border-card,rgba(32,224,150,0.08)) bg-background-card text-text-secondary text-sm font-medium hover:bg-(--color-border-card,rgba(32,224,150,0.08)) transition-colors'
        >
          <span
            className='inline-block w-3 h-3 rounded-full'
            style={{ background: CATEGORY_ACCENTS[cat] }}
          />
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterButtons;
