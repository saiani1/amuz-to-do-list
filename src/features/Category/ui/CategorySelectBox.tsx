import { useRef, useState } from 'react';

import type { CategorySelectType } from '../model';
import type { CategoryType } from '@entities/Category';
import { useOnClickOutside } from '@shared/hook';
import { CommonButton } from '@shared/ui';

type CategorySelectBoxType = {
  data: CategoryType[];
  clickedOption: CategorySelectType;
  setClickedOption: React.Dispatch<React.SetStateAction<CategorySelectType>>;
};

export const CategorySelectBox = ({
  data,
  clickedOption,
  setClickedOption,
}: CategorySelectBoxType) => {
  const ref = useRef(null);
  const [clickedBox, setClickedBox] = useState(false);

  const handleClickOption = (e: React.MouseEvent<HTMLUListElement>) => {
    const id = (e.target as HTMLButtonElement).name;
    const name = (e.target as HTMLButtonElement).dataset['name'];
    if (id && name)
      setClickedOption({
        id: Number(id),
        name: name,
      });
    setClickedBox(false);
  };

  const handleClickBox = () => setClickedBox((prev) => !prev);
  useOnClickOutside(ref, () => setClickedBox(false));

  return (
    <div
      ref={ref}
      className="relative text-gray-400 focus-within:text-gray-400"
    >
      <CommonButton
        className={`px-3 py-1 rounded-2xl ${clickedOption.name === '카테고리' ? 'text-gray-400' : 'font-medium text-gray-600'}`}
        onClick={handleClickBox}
      >
        {clickedOption.name}
      </CommonButton>
      {clickedBox && (
        <ul
          className="absolute left-1/2 top-[38px] -translate-x-1/2 w-30 text-center bg-white divide-y border rounded-md"
          onClick={handleClickOption}
        >
          {data.map((item, i) => (
            <li key={`category-${i}`}>
              <CommonButton
                name={String(item.id)}
                data-name={item.name}
                className="px-[4px] py-[3px] w-full"
              >
                {item.name}
              </CommonButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
