import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosMenu } from 'react-icons/io';
import { GrDocumentText } from 'react-icons/gr';
import { FiPlus } from 'react-icons/fi';

import { ToDoList } from '@features/ToDoList';
import { DUMMY_TODO } from '@entities/ToDoList';
import { CommonButton } from '@shared/ui';

const HomeScreen = () => {
  return (
    <div className="relative flex flex-col w-full h-screen bg-blue-400">
      <div className="fixed flex justify-between px-[20px] pt-[30px] w-full z-200">
        <CommonButton className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-blue-400/80">
          <IoIosArrowBack size="30" fill="#fff" className="-ml-[3px]" />
        </CommonButton>
        <CommonButton className="flex justify-center items-center w-[40px] h-[40px] rounded-full bg-blue-400/80">
          <IoIosMenu size="30" fill="#fff" />
        </CommonButton>
      </div>
      <div className="fixed flex flex-col gap-y-3 px-[55px] pt-[110px] z-10">
        <div className="flex justify-center items-center w-[46px] h-[46px] rounded-full bg-white">
          <GrDocumentText size="22" stroke="#60a5fa" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-[35px] text-white">All</h1>
          <span className="-mt-[10px] text-white">23 Tasks</span>
        </div>
      </div>
      <ul className="absolute bottom-0 w-full h-[60%] px-[45px] py-[30px] bg-white rounded-t-2xl z-100">
        <ToDoList title="진행중" data={DUMMY_TODO} />
        <ToDoList title="완료" data={DUMMY_TODO} />
      </ul>
      <Link
        to="create"
        className="fixed bottom-[30px] right-[30px] flex justify-center items-center w-[60px] h-[60px] rounded-full bg-blue-400 shadow-md shadow-gray-300 z-200"
      >
        <FiPlus size="26" stroke="#fff" />
      </Link>
    </div>
  );
};

export default HomeScreen;
