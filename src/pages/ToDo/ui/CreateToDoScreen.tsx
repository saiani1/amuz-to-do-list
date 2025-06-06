import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegBell, FaRegStar } from 'react-icons/fa';
import { TbTag } from 'react-icons/tb';

import { CategorySelectBox, type CategorySelectType } from '@features/Category';
import { CreateLi } from '@features/CreateTodo';
import { DUMMY_CATEGORY } from '@entities/Category';
import { convertToDatetimeLocal, type ToDoType } from '@entities/ToDoList';
import { CommonButton, CommonInput } from '@shared/ui';

const CreateToDoScreen = () => {
  const { state } = useLocation();
  const [clickedCategory, setClickedCategory] = useState<CategorySelectType>({
    id: 0,
    name: '카테고리',
  });
  const {
    watch,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<ToDoType>({ mode: 'onChange' });

  useEffect(() => {
    if (state) {
      const transformDate = convertToDatetimeLocal(state.date);
      const transformToDo = {
        ...state,
        date: transformDate,
      };
      reset(transformToDo);
      const filterCategory = DUMMY_CATEGORY.find(
        (category) => category.id === state.category_id
      );
      setClickedCategory({
        id: state.category_id,
        name: filterCategory!.name,
      });
    }
  }, []);

  useEffect(() => {
    setValue('category_id', clickedCategory.id, { shouldDirty: true });
  }, [clickedCategory]);

  const handleClickButton = () => {
    const value = watch('is_important');
    setValue('is_important', !value);
  };

  const submit = (data: ToDoType) => {
    console.log('data', data);
  };

  return (
    <form
      className="relative flex flex-col w-full h-screen"
      onSubmit={handleSubmit(submit)}
    >
      <div className="relative flex justify-center items-center pt-[30px]">
        <h1 className="text-gray-800 text-[20px]">
          {state ? '일정 수정하기' : '새 일정 만들기'}
        </h1>
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
            {...register('content', { required: true })}
          />
        </div>
        <ul className="flex flex-col gap-y-[15px] ">
          <CreateLi
            liStyle="gap-x-3"
            labelFor="alert"
            Icon={FaRegBell}
            iconSize="20"
          >
            <CommonInput
              type="datetime-local"
              id="alert"
              className="px-3 py-1 rounded-2xl text-gray-600"
              {...register('date', { required: true })}
            />
          </CreateLi>
          <CreateLi liStyle="gap-x-3 font-medium" Icon={TbTag} iconSize="22">
            <CategorySelectBox
              data={DUMMY_CATEGORY}
              clickedOption={clickedCategory}
              setClickedOption={setClickedCategory}
            />
          </CreateLi>
          <CreateLi
            liStyle="gap-x-6 text-gray-400"
            Icon={FaRegStar}
            iconSize="22"
          >
            <CommonButton
              className={`px-[10px] py-[3px] text-white font-medium text-[14px] rounded-md ${watch('is_important') ? 'bg-amber-400' : 'bg-gray-400'} `}
              onClick={handleClickButton}
            >
              IMPORTANT
            </CommonButton>
          </CreateLi>
        </ul>
      </div>
      <CommonButton
        type="submit"
        disabled={Object.keys(errors).length !== 0 || !isDirty}
        className={`absolute bottom-0 py-[10px] w-full text-white text-[18px] font-medium ${Object.keys(errors).length || !isDirty ? 'bg-gray-400' : 'bg-blue-400'}`}
      >
        {state ? '수정' : '생성'}
      </CommonButton>
    </form>
  );
};

export default CreateToDoScreen;
