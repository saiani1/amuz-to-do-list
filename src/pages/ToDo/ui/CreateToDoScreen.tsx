import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { FaRegBell, FaRegStar } from 'react-icons/fa';
import { TbTag } from 'react-icons/tb';
import dayjs from 'dayjs';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

import { CategorySelectBox, type CategorySelectType } from '@features/Category';
import { CreateLi } from '@features/CreateTodo';
import type { CategoryType } from '@entities/Category';
import { convertToDatetimeLocal, type ToDoType } from '@entities/ToDoList';
import { UserDataAtom } from '@entities/User';
import { CommonButton, CommonInput } from '@shared/ui';
import { supabase } from '@shared/api';

const CreateToDoScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userData = useRecoilValue(UserDataAtom);
  const [clickedCategory, setClickedCategory] = useState<CategorySelectType>({
    id: 0,
    name: '카테고리',
  });
  const [categoryData, setCategoryData] = useState<CategoryType[]>();

  const {
    watch,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ToDoType>({ mode: 'onChange' });

  const isError = Object.keys(errors).length !== 0;
  const disabledCondition =
    isError || clickedCategory.id === 0 || watch('date').length === 0;

  useEffect(() => {
    (async () => {
      const { data: categories, error: categoryError } = await supabase
        .from('categories')
        .select('*');
      if (categoryError) console.log('카테고리 리스트 가져오기 실패');
      if (categories) {
        setCategoryData(categories);
        if (state) {
          const transformDate = convertToDatetimeLocal(state.date);
          const transformToDo = {
            ...state,
            date: transformDate,
          };
          reset(transformToDo);
          const filterCategory = categories?.find(
            (category) => category.id === state.category_id
          );
          setClickedCategory({
            id: state.category_id,
            name: filterCategory!.name,
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    setValue('category_id', clickedCategory.id, { shouldDirty: true });
  }, [clickedCategory]);

  const handleClickButton = () => {
    const value = watch('is_important');
    setValue('is_important', !value);
  };

  const submit = async (data: ToDoType) => {
    console.log('data', data);
    const transformDate = dayjs(data.date).format('YYYY.MM.DD AHH:mm');
    if (state) {
      const transformData = {
        ...data,
        date: transformDate,
      };
      const { error } = await supabase
        .from('todos')
        .update([transformData])
        .eq('id', data.id)
        .select();
      if (error) console.log(error);
      else {
        toast.success('todo가 수정되었습니다.');
        navigate(-1);
      }
    } else {
      const transformObj = {
        ...data,
        date: transformDate,
        is_checked: false,
        user_id: userData?.id,
        is_important: data.is_important ?? false,
      };
      const { error } = await supabase
        .from('todos')
        .insert([transformObj])
        .select();
      if (error) console.log(error);
      else {
        toast.success('todo가 추가되었습니다.');
        navigate(-1);
      }
    }
  };

  const handleClickBack = () => navigate(-1);

  return (
    <form
      className="relative flex flex-col w-full h-screen"
      onSubmit={handleSubmit(submit)}
    >
      <div className="relative flex justify-center items-center pt-[30px]">
        <h1 className="text-gray-800 text-[20px]">
          {state ? '일정 수정하기' : '새 일정 만들기'}
        </h1>
        <CommonButton
          className="absolute right-[10px]"
          onClick={handleClickBack}
        >
          <IoCloseOutline size="30" stroke="#555" />
        </CommonButton>
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
            {categoryData && (
              <CategorySelectBox
                data={categoryData}
                clickedOption={clickedCategory}
                setClickedOption={setClickedCategory}
              />
            )}
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
        disabled={disabledCondition}
        className={`absolute bottom-0 py-[10px] w-full text-white text-[18px] font-medium ${disabledCondition ? 'bg-gray-400' : 'bg-blue-400'}`}
      >
        {state ? '수정' : '생성'}
      </CommonButton>
    </form>
  );
};

export default CreateToDoScreen;
