import { Link } from 'react-router-dom';

import type { CategoryType } from '@entities/Category';

type CategoryItemType = {
  data: CategoryType;
};

export const CategoryItem = ({ data }: CategoryItemType) => {
  return (
    <li>
      <Link
        to={String(data.id)}
        className="flex flex-col justify-between p-[20px] w-[150px] h-[150px] bg-white shadow-md shadow-gray-200 rounded-lg"
        state={data}
      >
        <div className="w-[50px] h-[50px] rounded-full border-2 border-white shadow-md overflow-hidden">
          <img src={data.category_image_url} alt={data.name} />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-[18px] font-semibold text-gray-600">
            {data.name}
          </span>
        </div>
      </Link>
    </li>
  );
};
