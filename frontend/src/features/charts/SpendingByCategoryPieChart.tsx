import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { useChartResize } from '../../hooks/useChartResize';
import { index } from '../../redux/services/transactionsService';
import type { Transaction } from '../../redux/services/transactionsService';
import { CATEGORIES, CATEGORY_ACCENTS } from '../../utils/consts';
import Card from '../shared/components/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCssVar = (cssVar: string): string => {
  const el = document.querySelector('.light') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssVar).trim();
};

const resolveColor = (varRef: string): string => getCssVar(varRef.slice(4, -1));

const currentMonthRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
  return {
    from_date: `${year}-${month}-01`,
    to_date: `${year}-${month}-${String(lastDay).padStart(2, '0')}`,
  };
};

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

// ── Component ─────────────────────────────────────────────────────────────────

const SpendingByCategoryPieChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartRef } = useChartResize();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    setBorderColor(getCssVar('--color-background-card'));
  }, [theme]);

  useEffect(() => {
    const { from_date, to_date } = currentMonthRange();
    index({ type: 'expense', from_date, to_date, per_page: 500 }).then((res) => {
      const items: Transaction[] = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      setTransactions(items);
    });
  }, []);

  // Aggregate amount by category from transactions
  const totals = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = transactions.reduce(
      (sum, tx) => tx.category === cat ? sum + (parseFloat(String(tx.amount)) || 0) : sum,
      0,
    );
    return acc;
  }, {});

  const activeCategories = CATEGORIES.filter((cat) => totals[cat] > 0);
  const hasData = activeCategories.length > 0;
  const sliceColors = activeCategories.map((cat) =>
    resolveColor(CATEGORY_ACCENTS[cat]),
  );

  const pieData = {
    labels: activeCategories,
    datasets: [
      {
        data: activeCategories.map((cat) => totals[cat]),
        backgroundColor: sliceColors,
        borderWidth: 2,
        borderColor: borderColor || 'transparent',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: R$ ${(context.parsed as number).toLocaleString(
              'pt-BR',
              {
                minimumFractionDigits: 2,
              },
            )}`,
        },
      },
    },
  };

  return (
    <Card
      ref={outerRef}
      decorated={decorated}
      className='flex flex-col min-h-65 mb-6'
    >
      <div className='flex justify-between items-center mb-3.5'>
        <span className='text-sm font-semibold text-text-primary'>
          {t('charts.categoryTitle')}
        </span>
        <span className='text-xs text-text-secondary opacity-60'>
          {t('charts.currentMonth')}
        </span>
      </div>

      {hasData ? (
        <>
          <div className='w-full flex justify-center'>
            <div style={{ maxWidth: 220, width: '100%' }}>
              <Pie
                key={theme}
                ref={chartRef as any}
                data={pieData}
                options={options}
              />
            </div>
          </div>

          <div className='flex flex-wrap justify-center items-center gap-2 w-full mt-4'>
            {activeCategories.map((cat, i) => (
              <div key={cat} className='flex items-center gap-1.5'>
                <span
                  className='inline-block w-3 h-3 rounded'
                  style={{
                    background: sliceColors[i],
                    border: '1.5px solid var(--color-border-card)',
                  }}
                />
                <span className='text-xs text-text-secondary'>{t(`categories.${cat}`)}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <p className='text-sm text-text-secondary/50'>
            {t('charts.noExpenses')}
          </p>
        </div>
      )}
    </Card>
  );
};

export default SpendingByCategoryPieChart;
