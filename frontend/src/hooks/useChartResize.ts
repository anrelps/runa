import type { Chart as ChartJS } from 'chart.js';
import { useEffect, useRef } from 'react';

export function useChartResize(delay = 120) {
  const outerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let rafId: number;

    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          chartRef.current?.resize();
        });
      }, delay);
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [delay]);

  return { outerRef, chartRef };
}
