import type { CategoryType } from '@entities/Category';
import { CategoryItem } from './CategoryItem';

type CategoryListType = {
  data: CategoryType[];
};

export const CategoryList = ({ data }: CategoryListType) => {
  return (
    <ul className="flex flex-wrap justify-between gap-y-3">
      {data.map((item, i) => (
        <CategoryItem key={`category-${i}`} data={item} />
      ))}
    </ul>
  );
};
