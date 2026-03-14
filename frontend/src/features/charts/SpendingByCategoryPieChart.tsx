import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

import Card from '../shared/components/Card';
import { useChartResize } from './useChartResize';

ChartJS.register(ArcElement, Tooltip, Legend);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getResolvedColor = (cssVar: string, fallback: string): string => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    cssVar,
  );
  return value?.trim() || fallback;
};

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: 'Alimentação',
    value: 1200,
    colorVar: '--color-accent-start',
    fallback: '#ff6b4a',
  },
  {
    label: 'Transporte',
    value: 800,
    colorVar: '--color-primary',
    fallback: '#20e096',
  },
  {
    label: 'Lazer',
    value: 500,
    colorVar: '--color-accent-orange',
    fallback: '#ff9a4a',
  },
  {
    label: 'Saúde',
    value: 350,
    colorVar: '--color-accent-end',
    fallback: '#00c6ff',
  },
  {
    label: 'Outros',
    value: 200,
    colorVar: '--color-text-secondary',
    fallback: '#6e8a85',
  },
];

const getPieData = () => ({
  labels: CATEGORIES.map((c) => c.label),
  datasets: [
    {
      data: CATEGORIES.map((c) => c.value),
      backgroundColor: CATEGORIES.map((c) =>
        getResolvedColor(c.colorVar, c.fallback),
      ),
      borderWidth: 2,
      borderColor: getResolvedColor('--color-background-card', '#141f1f'),
    },
  ],
});

// ── Chart options ─────────────────────────────────────────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  decorated?: boolean;
};

// ── Component ─────────────────────────────────────────────────────────────────

const SpendingByCategoryPieChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartKey } = useChartResize(300);

  return (
    <Card
      ref={outerRef}
      decorated={decorated}
      className='flex flex-col min-h-65 mb-6'
    >
      {/* Header */}
      <div className='flex justify-between items-center mb-3.5'>
        <span className='text-sm font-semibold text-text-primary'>
          Gastos por categoria
        </span>
      </div>

      {/* Pie chart */}
      <div className='w-full flex justify-center'>
        <div style={{ maxWidth: 220, width: '100%' }}>
          <Pie key={chartKey} data={getPieData()} options={options} />
        </div>
      </div>

      {/* Legend */}
      <div className='flex flex-wrap justify-center items-center gap-2 w-full mt-4'>
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className='flex items-center gap-1.5'>
            <span
              className='inline-block w-3 h-3 rounded'
              style={{
                background: getResolvedColor(cat.colorVar, cat.fallback),
                border:
                  '1.5px solid var(--color-border-card, rgba(32,224,150,0.08))',
              }}
            />
            <span className='text-xs text-text-secondary'>{cat.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingByCategoryPieChart;
