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
import { useChartResize } from './useChartResize';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const WEEKS = [
  { label: 'S1', val: 620 },
  { label: 'S2', val: 980 },
  { label: 'S3', val: 740 },
  { label: 'S4', val: 877 },
  { label: 'S5', val: 0 },
];

const TOTAL = WEEKS.reduce((acc, w) => acc + w.val, 0);

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

const WeeklySpendingBarChart: React.FC = () => {
  // outerRef vai no card inteiro — elemento estável que não muda ao remontar o canvas
  const { outerRef, chartKey } = useChartResize(300);

  return (
    <div
      ref={outerRef}
      className='rounded-2xl p-4 mb-6 w-full flex flex-col min-h-65'
      style={{
        background: 'var(--color-background-card, #141f1f)',
        border: '1px solid var(--color-border-card, rgba(32,224,150,0.08))',
      }}
    >
      <div className='flex justify-between items-center mb-3.5'>
        <span
          className='text-[0.85rem] font-semibold'
          style={{ color: 'var(--color-text-primary, #fff)' }}
        >
          Gastos das ultimas 5 semanas
        </span>
        <span
          className='text-[1.1rem] font-bold'
          style={{ color: 'var(--color-accent-start, #ff6b4a)' }}
        >
          R$ {TOTAL.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className='relative flex-1 min-h-50'>
        <Bar key={chartKey} data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklySpendingBarChart;
