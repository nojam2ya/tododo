import { type FC, memo, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import flatColors from 'nice-color-palettes';
import type { ChartData, ChartOptions } from 'chart.js';
import { useDarkMode } from '@stores/darkModeStore.ts';

const flatColorList = flatColors.flat(); // string[]

interface SingleAxisBarChartProps {
  labels: string[];
  datasetsLabel: string;
  data: any[];
  options?: ChartOptions<'bar'>;
}

const SingleAxisBarChart: FC<SingleAxisBarChartProps> = ({ labels, datasetsLabel, data, options }) => {
  const isDark = useDarkMode(state => state.isDark);

  const chartData: ChartData<'bar'> = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: datasetsLabel,
          data,
          borderWidth: 0,
          backgroundColor: labels.map((_, i) => flatColorList[i]),
        },
      ],
    }),
    [labels, datasetsLabel, data],
  );

  const chartOptions: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      animation: {
        duration: 500,
        easing: 'easeOutQuart',
      },
      scales: {
        x: {
          border: {
            dash: [4, 2],
          },
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
        y: {
          border: {
            dash: [4, 2],
          },
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
      ...options,
    }),
    [options, isDark],
  );

  return data.length ? (
    <Bar data={chartData} options={chartOptions} />
  ) : (
    <div className={'h-auto flex-center-center text-sm'}>데이터가 없습니다.</div>
  );
};

export default memo(SingleAxisBarChart);
