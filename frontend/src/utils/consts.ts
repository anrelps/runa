import {
  AppWindowIcon,
  CarIcon,
  ForkKnifeIcon,
  HeartbeatIcon,
  SparkleIcon,
} from '@phosphor-icons/react';

export type category =
  | 'Alimentação'
  | 'Transporte'
  | 'Lazer'
  | 'Saúde'
  | 'Outros';

export const CATEGORY_ACCENTS: Record<category, string> = {
  Alimentação: 'var(--color-category-food)',
  Transporte:  'var(--color-category-transport)',
  Lazer:       'var(--color-category-leisure)',
  Saúde:       'var(--color-category-health)',
  Outros:      'var(--color-category-other)',
};

export const CATEGORY_ICONS: Record<category, React.ElementType> = {
  Alimentação: ForkKnifeIcon,
  Transporte: CarIcon,
  Lazer: SparkleIcon,
  Saúde: HeartbeatIcon,
  Outros: AppWindowIcon,
};

export const CATEGORIES: category[] = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Saúde',
  'Outros',
];
