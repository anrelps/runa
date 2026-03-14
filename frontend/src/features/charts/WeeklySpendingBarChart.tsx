import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import Card from '../shared/components/Card';
import { useChartResize } from './useChartResize';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// ── Data ──────────────────────────────────────────────────────────────────────

const WEEKS = [
  { label: 'S1', val: 620 },
  { label: 'S2', val: 980 },
  { label: 'S3', val: 740 },
  { label: 'S4', val: 877 },
  { label: 'S5', val: 0 },
];

const TOTAL = WEEKS.reduce((acc, w) => acc + w.val, 0);

// ── Chart config ──────────────────────────────────────────────────────────────

const data = {
  labels: WEEKS.map((w) => w.label),
  datasets: [
    {
      label: 'Gastos (R$)',
      data: WEEKS.map((w) => w.val),
      backgroundColor: (ctx: any) => {
        const value = ctx.raw;
        if (value === 0) return 'rgba(255,107,74,0.18)';
        return (
          getComputedStyle(document.documentElement)
            .getPropertyValue('--color-accent-start')
            ?.trim() || '#ff6b4a'
        );
      },
      borderRadius: 4,
      barThickness: 24,
      borderSkipped: false,
    },
  ],
};

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: {
      callbacks: {
        label: (context: any) => `R$ ${context.parsed.x}`,
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color:
          getComputedStyle(document.documentElement)
            .getPropertyValue('--color-grid')
            ?.trim() || 'rgba(32,224,150,0.08)',
      },
      ticks: {
        color:
          getComputedStyle(document.documentElement)
            .getPropertyValue('--color-text-secondary')
            ?.trim() || '#6e8a85',
        font: { size: 14 },
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        color:
          getComputedStyle(document.documentElement)
            .getPropertyValue('--color-text-primary')
            ?.trim() || '#fff',
        font: { size: 15 },
      },
    },
  },
};

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  decorated?: boolean;
};

// ── Component ─────────────────────────────────────────────────────────────────

const WeeklySpendingBarChart: React.FC<Props> = ({ decorated = false }) => {
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
          Gastos das últimas 5 semanas
        </span>
        <span className='text-lg font-bold text-accent-start'>
          R$ {TOTAL.toLocaleString('pt-BR')}
        </span>
      </div>

      {/* Chart */}
      <div className='relative flex-1 min-h-50'>
        <Bar key={chartKey} data={data} options={options} />
      </div>
    </Card>
  );
};

export default WeeklySpendingBarChart;
