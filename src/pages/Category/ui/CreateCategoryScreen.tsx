import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';

import type { CategoryType } from '@entities/Category';
import { CommonButton, CommonInput } from '@shared/ui';

const CreateCategoryScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({ mode: 'onChange' });
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const submit = (data: CategoryType) => {
    console.log('imageFile', imageFile, 'data', data);
  };

  return (
    <form
      className="relative flex flex-col w-full h-screen"
      onSubmit={handleSubmit(submit)}
    >
      <div className="relative flex justify-center items-center pt-[30px]">
        <h1 className="text-gray-800 text-[20px]">카테고리 생성하기</h1>
        <Link to="/" className="absolute right-[10px]">
          <IoCloseOutline size="30" stroke="#555" />
        </Link>
      </div>
      <div className="flex flex-col px-[30px] py-[50px] gap-y-[30px]">
        <div className="group">
          <label
            htmlFor="name"
            className="text-gray-400 group-focus-within:text-blue-400"
          >
            <h2 className="text-[14px] transition-colors duration-300">
              카테고리명
            </h2>
          </label>
          <CommonInput
            id="name"
            className="mt-[10px] py-2 w-full border-b border-gray-300"
            {...register('name', { required: true })}
          />
        </div>
        <span className="text-[14px] text-gray-400">카테고리 이미지</span>
        <div className="flex flex-col justify-center items-center gap-y-6">
          <div className="flex flex-col items-center gap-y-2">
            <label
              htmlFor="imageInput"
              className="px-4 py-2 text-[14px] font-medium text-white bg-blue-500 rounded-md"
            >
              {previewUrl ? '이미지 재업로드' : '이미지 업로드'}
            </label>
          </div>
          {previewUrl && (
            <div className="flex justify-center items-center w-[200px] h-[200px] rounded-full overflow-hidden bg-white border-3 border-white shadow-md shadow-gray-300">
              <img src={previewUrl} alt="미리보기 이미지" />
            </div>
          )}
        </div>
        <CommonInput
          id="imageInput"
          type="file"
          onChange={handleChangeFileInput}
          className={`${previewUrl ? 'opacity-50' : ''} cursor-pointer hidden`}
          accept="image/*"
        />
      </div>
      <CommonButton
        type="submit"
        disabled={Object.keys(errors).length !== 0 || !previewUrl}
        className={`absolute bottom-0 py-[10px] w-full text-white text-[18px] font-medium ${Object.keys(errors).length || !previewUrl ? 'bg-gray-400' : 'bg-blue-400'}`}
      >
        생성
      </CommonButton>
    </form>
  );
};

export default CreateCategoryScreen;
