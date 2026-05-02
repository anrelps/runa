import React from 'react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, CATEGORY_ACCENTS, type category } from '../../../utils/consts';

interface Props {
  selected: category | null;
  onSelect: (cat: category | null) => void;
}

const CategoryFilterButtons: React.FC<Props> = ({ selected, onSelect }) => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-wrap gap-2'>
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            type='button'
            onClick={() => onSelect(isActive ? null : cat)}
            className='flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all cursor-pointer'
            style={{
              borderColor: isActive ? CATEGORY_ACCENTS[cat] : 'rgba(32,224,150,0.08)',
              background: isActive
                ? `color-mix(in srgb, ${CATEGORY_ACCENTS[cat]} 15%, transparent)`
                : 'var(--color-background-card)',
              color: isActive ? CATEGORY_ACCENTS[cat] : 'var(--color-text-secondary)',
            }}
          >
            <span
              className='inline-block w-3 h-3 rounded-full shrink-0'
              style={{ background: CATEGORY_ACCENTS[cat] }}
            />
            {t(`categories.${cat}`)}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilterButtons;
