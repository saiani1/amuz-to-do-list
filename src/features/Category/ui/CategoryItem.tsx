import { Link } from 'react-router-dom';

import type { CategoryType } from '@entities/Category';
import { DoughnutChart } from '@shared/ui';

type CategoryItemType = {
  data: CategoryType;
};

export const CategoryItem = ({ data }: CategoryItemType) => {
  return (
    <li>
      <Link
        to={String(data.id)}
        className="flex flex-col justify-between p-[20px] w-[150px] h-[150px] bg-white shadow-md shadow-gray-200 rounded-lg"
      >
        <DoughnutChart
          value={80}
          maxValue={100}
          outerStyle="flex justify-center items-center w-[56px] h-[56px]"
          innerStyle="w-[40px] h-[40px]"
          backgroundColor="bg-gray-100"
          chartColor="#60a5fa"
        >
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img src={data.category_image_url} alt={data.name} />
          </div>
        </DoughnutChart>
        <div className="flex flex-col items-start">
          <span className="text-[18px] font-semibold text-gray-600">
            {data.name}
          </span>
          <span className="mt-[-3px] text-[12px] text-gray-400/80">
            10/100 Tasks
          </span>
        </div>
      </Link>
    </li>
  );
};
