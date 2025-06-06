import { IoIosMenu } from 'react-icons/io';

import { CategoryList } from '@features/Category';
import { CommonButton, PlusLinkButton } from '@shared/ui';
import { DUMMY_CATEGORY } from '@entities/Category';

const CategoryListScreen = () => {
  return (
    <div className="relative flex flex-col w-full h-screen px-[20px] py-[30px] bg-gray-50 overflow-auto">
      <div className="mb-[20px]">
        <CommonButton className="flex justify-center items-center">
          <IoIosMenu size="30" fill="#777" />
        </CommonButton>
      </div>
      <h1 className="mb-[20px] ml-[2px] font-semibold text-[30px] text-gray-600">
        Lists
      </h1>
      <CategoryList data={DUMMY_CATEGORY} />
      <PlusLinkButton href="createCategory" />
    </div>
  );
};

export default CategoryListScreen;
