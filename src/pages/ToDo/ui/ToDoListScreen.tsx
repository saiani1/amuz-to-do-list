import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import { ToDoList } from '@features/ToDoList';
import { PlusLinkButton, SearchBox } from '@shared/ui';

const ToDoListScreen = () => {
  const { state } = useLocation();
  const [taskNum, setTaskNum] = useState(0);

  return (
    <div className="relative flex flex-col w-full h-screen bg-blue-400">
      <div className="fixed flex justify-between px-[20px] pt-[30px] w-full z-200">
        <Link
          to="/"
          className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-blue-400/80"
        >
          <IoIosArrowBack size="30" fill="#fff" className="-ml-[3px]" />
        </Link>
      </div>
      <div className="fixed flex flex-col gap-y-3 px-[55px] pt-[110px] z-10">
        <div className="flex justify-center items-center w-[46px] h-[46px] rounded-full bg-white overflow-hidden border-3 border-white shadow-md">
          <img src={state.category_image_url} alt={state.name} />
        </div>
        <div className="flex items-end gap-x-4">
          <div>
            <h1 className="font-semibold text-[32px] text-white whitespace-nowrap">
              {state.name}
            </h1>
            <span className="-mt-[8px] text-[15px] text-white">
              {taskNum} Tasks
            </span>
          </div>
          <SearchBox />
        </div>
      </div>
      <ul className="absolute bottom-0 w-full h-[60%] px-[45px] py-[30px] bg-white rounded-t-2xl z-100">
        <ToDoList categoryId={state.id} setTaskNum={setTaskNum} />
      </ul>
      {state.id !== 0 && <PlusLinkButton href="/create" />}
    </div>
  );
};

export default ToDoListScreen;
