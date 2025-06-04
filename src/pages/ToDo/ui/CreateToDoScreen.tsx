import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { TbTag } from 'react-icons/tb';

import { CategorySelectBox } from '@features/Category';
import { DUMMY_CATEGORY } from '@entities/Category';
import { CommonButton, CommonInput } from '@shared/ui';
import { Link } from 'react-router-dom';

const CreateToDoScreen = () => {
  const [clickedCategory, setClickedCategory] = useState('카테고리');

  return (
    <form className="flex flex-col justify-between w-full h-screen">
      <div className="relative flex justify-center items-center pt-[30px]">
        <h1 className="text-gray-800 text-[20px]">새 일정 만들기</h1>
        <Link to="/" className="absolute right-[10px]">
          <IoCloseOutline size="30" stroke="#555" />
        </Link>
      </div>
      <div className="flex flex-col px-[30px] py-[50px] gap-y-[30px]">
        <div className="group">
          <label
            htmlFor="content"
            className="text-gray-400 group-focus-within:text-blue-400"
          >
            <h2 className="text-[14px] transition-colors duration-300">
              어떤 계획을 하고 계신가요?
            </h2>
          </label>
          <CommonInput
            id="content"
            className="mt-[10px] py-2 w-full border-b border-gray-300"
          />
        </div>
        <ul className="flex flex-col gap-y-[15px] ">
          <li className="flex items-center gap-x-3 text-gray-400 focus-within:text-blue-400">
            <label htmlFor="alert" className="transition-colors duration-300">
              <FaRegBell size="20" className="text-inherit" />
            </label>
            <CommonInput
              type="datetime-local"
              id="alert"
              className="px-3 py-1 rounded-2xl text-gray-600"
            />
          </li>
          <li className="flex items-center gap-x-3 font-medium text-gray-400 focus-within:text-blue-400">
            <label className="transition-colors duration-300">
              <TbTag size="22" className="text-inherit" />
            </label>
            <CategorySelectBox
              data={DUMMY_CATEGORY}
              clickedOption={clickedCategory}
              setClickedOption={setClickedCategory}
            />
          </li>
        </ul>
      </div>
      <CommonButton
        type="submit"
        className="py-[10px] w-full text-white text-[18px] font-medium bg-blue-400"
      >
        생성
      </CommonButton>
    </form>
  );
};

export default CreateToDoScreen;
