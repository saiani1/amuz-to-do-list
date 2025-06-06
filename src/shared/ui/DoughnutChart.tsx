import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

type DoughnutChartType = {
  value: number;
  maxValue: number;
  outerStyle?: string;
  innerStyle?: string;
  backgroundColor?: string;
  chartColor?: string;
  children: React.ReactNode;
};

export const DoughnutChart = ({
  value,
  maxValue,
  outerStyle,
  innerStyle,
  backgroundColor,
  chartColor,
  children,
}: DoughnutChartType) => {
  ChartJS.register(ArcElement);

  const doughnutColor = chartColor ?? '#005EFF';
  const bgColor = backgroundColor ?? 'bg-primary-200';

  const data = {
    datasets: [
      {
        data: [value, maxValue - value],
        backgroundColor: [doughnutColor, 'transparent'],
        borderWidth: 0,
        borderRadius: 30,
      },
    ],
  };
  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div
      className={`relative ${outerStyle ?? 'w-[74px] h-[74px]'} rounded-[50%] ${bgColor}`}
    >
      <Doughnut data={data} options={options} />
      <div
        className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center rounded-[50%] ${innerStyle ?? 'w-[52px] h-[52px]'} text-[0.5rem] font-medium bg-white`}
      >
        {children}
      </div>
    </div>
  );
};
