import { useMemo } from 'react';

export const useCurrencyBRL = (value: number | string): string => {
  const formattedValue = useMemo(() => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);
  }, [value]);

  return formattedValue;
};
