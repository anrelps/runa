import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useTheme } from '../../contexts/ThemeContext';
import Card from '../shared/components/Card';
import { useChartResize } from '../../hooks/useChartResize';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCssVar = (cssVar: string): string => {
  const el = document.querySelector('.light') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssVar).trim();
};

// ── Data ──────────────────────────────────────────────────────────────────────

const WEEKS = [
  { label: 'S1', val: 620 },
  { label: 'S2', val: 980 },
  { label: 'S3', val: 740 },
  { label: 'S4', val: 877 },
  { label: 'S5', val: 0 },
];

const TOTAL = WEEKS.reduce((acc, w) => acc + w.val, 0);

interface ChartColors {
  accent: string;
  grid: string;
  tick: string;
  label: string;
}

const computeColors = (): ChartColors => ({
  accent: getCssVar('--color-accent-start'),
  grid:   getCssVar('--color-grid'),
  tick:   getCssVar('--color-text-secondary'),
  label:  getCssVar('--color-text-primary'),
});

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

// ── Component ─────────────────────────────────────────────────────────────────

const WeeklySpendingBarChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartRef } = useChartResize();
  const { theme } = useTheme();

  const [colors, setColors] = useState<ChartColors>(computeColors);

  useEffect(() => {
    setColors(computeColors());
  }, [theme]);

  const data = {
    labels: WEEKS.map((w) => w.label),
    datasets: [{
      label: 'Gastos (R$)',
      data: WEEKS.map((w) => w.val),
      backgroundColor: WEEKS.map((w) =>
        w.val === 0
          ? `color-mix(in srgb, ${colors.accent} 18%, transparent)`
          : colors.accent
      ),
      borderRadius: 4,
      barThickness: 24,
      borderSkipped: false,
    }],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: { label: (context: any) => `R$ ${context.parsed.x}` },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: colors.grid },
        ticks: { color: colors.tick, font: { size: 14 } },
      },
      y: {
        grid: { display: false },
        ticks: { color: colors.label, font: { size: 15 } },
      },
    },
  };

  return (
    <Card ref={outerRef} decorated={decorated} className='flex flex-col min-h-65 mb-6'>
      <div className='flex justify-between items-center mb-3.5'>
        <span className='text-sm font-semibold text-text-primary'>
          Gastos das últimas 5 semanas
        </span>
        <span className='text-lg font-bold text-accent-start'>
          R$ {TOTAL.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className='relative flex-1 min-h-50'>
        <Bar key={theme} ref={chartRef} data={data} options={options} />
      </div>
    </Card>
  );
};

export default WeeklySpendingBarChart;
