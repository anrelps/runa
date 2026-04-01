import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import { useTheme } from '../../contexts/ThemeContext';
import { useChartResize } from '../../hooks/useChartResize';
import { selectExpenses } from '../../redux/slices/expensesSlice';
import { CATEGORIES, CATEGORY_ACCENTS } from '../../utils/consts';
import Card from '../shared/components/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

// ── Helpers ───────────────────────────────────────────────────────────────────

const getCssVar = (cssVar: string): string => {
  const el = document.querySelector('.light') ?? document.documentElement;
  return getComputedStyle(el).getPropertyValue(cssVar).trim();
};

// 'var(--color-category-food)' → resolved color string
const resolveColor = (varRef: string): string => getCssVar(varRef.slice(4, -1));

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = { decorated?: boolean };

// ── Component ─────────────────────────────────────────────────────────────────

const SpendingByCategoryPieChart: React.FC<Props> = ({ decorated = false }) => {
  const { outerRef, chartRef } = useChartResize();
  const { theme } = useTheme();
  const expenses = useSelector(selectExpenses);

  const [borderColor, setBorderColor] = useState('');

  useEffect(() => {
    setBorderColor(getCssVar('--color-background-card'));
  }, [theme]);

  // Aggregate total_amount by category
  const totals = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = expenses.reduce(
      (sum, exp) =>
        exp.category === cat ? sum + (parseFloat(exp.total_amount) || 0) : sum,
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
          Gastos por categoria
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
                <span className='text-xs text-text-secondary'>{cat}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <p className='text-sm text-text-secondary/50'>
            Sem despesas para exibir
          </p>
        </div>
      )}
    </Card>
  );
};

export default SpendingByCategoryPieChart;
