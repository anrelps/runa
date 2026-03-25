import { useMemo } from 'react';

/**

Hook para formatar valores numéricos no padrão BRL (R$)
@param value - O valor numérico a ser formatado
@returns O valor formatado como string*/
export const useCurrencyBRL = (value: number | string): string => {
  // Utilizamos useMemo para evitar re-formatação desnecessária se o valor não mudar
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
