import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useChartResize } from '../../hooks/useChartResize';
import { index } from '../../redux/services/transactionsService';
import type { Transaction } from '../../redux/services/transactionsService';
import Card from '../shared/components/Card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCssVar = (cssVar: string): string => {
  const el = document.querySelector('.light') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssVar).trim();
};

interface ChartColors {
  current: string;
  past: string;
  empty: string;
  grid: string;
  tick: string;
  label: string;
}

const computeColors = (): ChartColors => ({
  current: 'hsl(11, 100%, 65%)',
  past: 'hsl(11, 40%, 38%)',
  empty: 'hsl(11, 20%, 20%)',
  grid: getCssVar('--color-grid'),
  tick: getCssVar('--color-text-secondary'),
  label: getCssVar('--color-text-primary'),
});

const formatBRL = (v: number): string =>
  v >= 1000
    ? `R$ ${(v / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}k`
    : `R$ ${v.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`;

// ── Build last 6 months ───────────────────────────────────────────────────────

const buildMonths = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);

    const label = d
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '')
      .replace(/^\w/, (c) => c.toUpperCase());

    const isCurrent = i === 5;
    return { label, start, end, isCurrent };
  });
};

const periodLabel = (months: ReturnType<typeof buildMonths>): string => {
  const first = months[0].start;
  const last = months[months.length - 1].end;
  const fmt = (d: Date) =>
    d.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace('.', '')
      .replace(/^\w/, (c) => c.toUpperCase());
  return `${fmt(first)} – ${fmt(last)}`;
};

// ── Component ─────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

const WeeklySpendingBarChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartRef } = useChartResize();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [colors, setColors] = useState<ChartColors>(computeColors);

  useEffect(() => {
    setColors(computeColors());
  }, [theme]);

  const months = useMemo(() => buildMonths(), []);

  useEffect(() => {
    const fromDate = months[0].start.toISOString().substring(0, 10);
    index({ type: 'expense', from_date: fromDate, per_page: 500 }).then((res) => {
      const items: Transaction[] = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      setTransactions(items);
    });
  }, [months]);

  const monthlyTotals = useMemo(
    () =>
      months.map(({ start, end }) =>
        transactions.reduce((sum, tx) => {
          if (!tx.date) return sum;
          const d = new Date(`${tx.date}T00:00:00`);
          return d >= start && d <= end ? sum + (parseFloat(String(tx.amount)) || 0) : sum;
        }, 0),
      ),
    [transactions, months],
  );

  const maxVal = Math.max(...monthlyTotals, 1);
  const hasData = monthlyTotals.some((v) => v > 0);

  const data = {
    labels: months.map((m) => m.label),
    datasets: [
      {
        data: monthlyTotals,
        backgroundColor: months.map((m, i) =>
          monthlyTotals[i] === 0
            ? colors.empty
            : m.isCurrent
              ? colors.current
              : colors.past,
        ),
        borderRadius: 6,
        barThickness: 20,
        borderSkipped: false as const,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) =>
            `  ${(ctx.parsed.x as number).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: maxVal * 1.15,
        grid: { color: colors.grid },
        border: { display: false },
        ticks: {
          color: colors.tick,
          maxTicksLimit: 5,
          callback: (v: any) => formatBRL(v as number),
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: colors.label, font: { size: 12 } },
      },
    },
  };

  return (
    <Card ref={outerRef} decorated={decorated} className='flex flex-col mb-6'>
      <div className='flex justify-between items-start mb-4'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-sm font-semibold text-text-primary'>
            {t('charts.weeklyTitle')}
          </span>
          <span className='text-xs text-text-secondary opacity-60'>
            {periodLabel(months)}
          </span>
        </div>
        <div className='flex items-center gap-3 text-xs text-text-secondary'>
          <span className='flex items-center gap-1.5'>
            <span
              className='inline-block w-2.5 h-2.5 rounded-sm'
              style={{ background: colors.current }}
            />
            {t('charts.currentMonth')}
          </span>
          <span className='flex items-center gap-1.5'>
            <span
              className='inline-block w-2.5 h-2.5 rounded-sm'
              style={{ background: colors.past }}
            />
            {t('charts.previous')}
          </span>
        </div>
      </div>

      <div className='relative min-h-52'>
        {hasData ? (
          <Bar key={theme} ref={chartRef as any} data={data} options={options} />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <p className='text-sm text-text-secondary/50'>{t('charts.noData')}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeeklySpendingBarChart;
