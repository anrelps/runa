import { useEffect, useRef, useState } from 'react';

/**
 * Observa o `outerRef` (elemento estável, fora do canvas) e remonta o gráfico
 * apenas quando a largura muda além de um threshold, evitando loops causados
 * pelo próprio remount alterando o tamanho do container interno.
 *
 * @param delay     - debounce em ms após o último evento de resize (default: 300ms)
 * @param threshold - mínimo de px de diferença para considerar uma mudança real (default: 5px)
 */
export function useChartResize(delay = 300, threshold = 5) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState(0);
  const lastWidth = useRef<number | null>(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width === undefined) return;

      // Ignora mudanças menores que o threshold — evita o loop de remount
      if (
        lastWidth.current !== null &&
        Math.abs(width - lastWidth.current) < threshold
      )
        return;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastWidth.current = width;
        setChartKey((k) => k + 1);
      }, delay);
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay, threshold]);

  return { outerRef, chartKey };
}
