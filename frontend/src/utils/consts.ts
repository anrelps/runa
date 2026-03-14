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
  Alimentação: 'var(--color-accent-green, #4caf50)',
  Transporte: 'var(--color-accent-blue, #2196f3)',
  Lazer: 'var(--color-accent-orange, #ff9a4a)',
  Saúde: 'var(--color-accent-end, #00c6ff)',
  Outros: 'var(--color-text-secondary, #6e8a85)',
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
