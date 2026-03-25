import type { Chart as ChartJS } from 'chart.js';
import { useEffect, useRef } from 'react';

/**
 * Observes the outer container for size changes and calls chart.resize()
 * in-place — no remount, no flash, no layout loops.
 *
 * Attach `outerRef` to the wrapper div and pass `chartRef` as `ref` to the
 * <Bar>, <Pie>, etc. component.
 *
 * @param delay - debounce in ms after the last resize event (default: 120ms)
 */
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
