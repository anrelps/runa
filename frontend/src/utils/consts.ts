import {
  BookOpenIcon,
  BriefcaseIcon,
  CarIcon,
  DotsThreeOutlineIcon,
  ForkKnifeIcon,
  HeartbeatIcon,
  HouseIcon,
  PiggyBankIcon,
  ShoppingCartIcon,
  SparkleIcon,
} from '@phosphor-icons/react';

export type category =
  | 'Moradia'
  | 'Alimentação'
  | 'Transporte'
  | 'Compras'
  | 'Lazer'
  | 'Saúde'
  | 'Educação'
  | 'Negócios'
  | 'Finanças'
  | 'Outros';

export const CATEGORY_ACCENTS: Record<category, string> = {
  Moradia:    'var(--color-category-housing)',
  Alimentação:'var(--color-category-food)',
  Transporte: 'var(--color-category-transport)',
  Compras:    'var(--color-category-shopping)',
  Lazer:      'var(--color-category-leisure)',
  Saúde:      'var(--color-category-health)',
  Educação:   'var(--color-category-education)',
  Negócios:   'var(--color-category-business)',
  Finanças:   'var(--color-category-finance)',
  Outros:     'var(--color-category-other)',
};

export const CATEGORY_ICONS: Record<category, React.ElementType> = {
  Moradia:    HouseIcon,
  Alimentação:ForkKnifeIcon,
  Transporte: CarIcon,
  Compras:    ShoppingCartIcon,
  Lazer:      SparkleIcon,
  Saúde:      HeartbeatIcon,
  Educação:   BookOpenIcon,
  Negócios:   BriefcaseIcon,
  Finanças:   PiggyBankIcon,
  Outros:     DotsThreeOutlineIcon,
};

export const CATEGORIES: category[] = [
  'Moradia',
  'Alimentação',
  'Transporte',
  'Compras',
  'Lazer',
  'Saúde',
  'Educação',
  'Negócios',
  'Finanças',
  'Outros',
];
