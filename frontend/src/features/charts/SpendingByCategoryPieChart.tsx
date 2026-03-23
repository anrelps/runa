import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { useTheme } from '../../contexts/ThemeContext';
import Card from '../shared/components/Card';
import { useChartResize } from './useChartResize';

ChartJS.register(ArcElement, Tooltip, Legend);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCssVar = (cssVar: string): string => {
  const el = document.querySelector('.light') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssVar).trim();
};

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'Alimentação', value: 1200, colorVar: '--color-category-food' },
  { label: 'Transporte',  value: 800,  colorVar: '--color-category-transport' },
  { label: 'Lazer',       value: 500,  colorVar: '--color-category-leisure' },
  { label: 'Saúde',       value: 350,  colorVar: '--color-category-health' },
  { label: 'Outros',      value: 200,  colorVar: '--color-category-other' },
];

const computeColors = () => ({
  slices: CATEGORIES.map((c) => getCssVar(c.colorVar)),
  border: getCssVar('--color-background-card'),
});

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

// ── Component ─────────────────────────────────────────────────────────────────

const SpendingByCategoryPieChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartRef } = useChartResize();
  const { theme } = useTheme();

  const [colors, setColors] = useState(computeColors);

  useEffect(() => {
    setColors(computeColors());
  }, [theme]);

  const pieData = {
    labels: CATEGORIES.map((c) => c.label),
    datasets: [{
      data: CATEGORIES.map((c) => c.value),
      backgroundColor: colors.slices,
      borderWidth: 2,
      borderColor: colors.border,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: R$ ${value.toLocaleString('pt-BR')}`;
          },
        },
      },
    },
  };

  return (
    <Card ref={outerRef} decorated={decorated} className='flex flex-col min-h-65 mb-6'>
      <div className='flex justify-between items-center mb-3.5'>
        <span className='text-sm font-semibold text-text-primary'>Gastos por categoria</span>
      </div>

      <div className='w-full flex justify-center'>
        <div style={{ maxWidth: 220, width: '100%' }}>
          <Pie key={theme} ref={chartRef} data={pieData} options={options} />
        </div>
      </div>

      <div className='flex flex-wrap justify-center items-center gap-2 w-full mt-4'>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.label} className='flex items-center gap-1.5'>
            <span
              className='inline-block w-3 h-3 rounded'
              style={{ background: colors.slices[i], border: '1.5px solid var(--color-border-card)' }}
            />
            <span className='text-xs text-text-secondary'>{cat.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingByCategoryPieChart;
