import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';

import { searchWordAtom } from '@entities/ToDoList';
import { CommonButton } from './CommonButton';
import { CommonInput } from './CommonInput';

export const SearchBox = () => {
  const setSearchWord = useSetRecoilState(searchWordAtom);
  const { register, handleSubmit } = useForm();

  const submit = (data: any) => {
    if (data.length !== 0) setSearchWord(data.keyword);
  };

  return (
    <form className="flex gap-x-1" onSubmit={handleSubmit(submit)}>
      <CommonInput
        className="px-2 max-w-[150px] bg-white text-[14px] rounded-sm"
        {...register('keyword')}
      />
      <CommonButton type="submit" className="p-1">
        <FaSearch fill="#fff" />
      </CommonButton>
    </form>
  );
};
