import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { UserType } from '@entities/User';
import { CommonButton, CommonInput, ImageUploadForm } from '@shared/ui';

const LoginScreen = () => {
  const [clickedSignUp, setClickedSignUp] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>({ mode: 'onChange' });

  const isError = Object.keys(errors).length !== 0;

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.target as HTMLButtonElement).name;
    if (name === 'return') setClickedSignUp((prev) => !prev);
  };

  const submit = (data: UserType) => {
    console.log('data', data);
    console.log('imageFile', imageFile);
  };

  return (
    <form
      className="relative flex flex-col w-full h-screen px-[30px] py-[50px] overflow-y-auto"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="mb-[30px] text-[20px] font-medium text-center text-gray-700">
        {clickedSignUp ? '회원가입' : '로그인'}
      </h1>
      <div className="flex flex-col gap-y-4">
        <label className="flex flex-col gap-y-1 w-full">
          <span className="font-semibold text-gray-700 text-[14px]">
            Nickname
          </span>
          <CommonInput
            className="px-3 py-1 border border-gray-300 rounded-sm placeholder:text-[13px] placeholder:text-gray-400"
            placeholder="닉네임을 입력하세요."
            {...register('nickname', { required: true })}
          />
        </label>
        <label className="flex flex-col gap-y-1 w-full">
          <span className="font-semibold text-gray-700 text-[14px]">
            Password
          </span>
          <CommonInput
            type="password"
            className="px-3 py-1 border border-gray-300 rounded-sm placeholder:text-[13px] placeholder:text-gray-400"
            placeholder="비밀번호를 입력하세요"
            {...register('password', { required: true })}
          />
        </label>
        {clickedSignUp && (
          <div className="flex flex-col gap-y-3">
            <span className="font-semibold text-gray-700 text-[14px]">
              프로필 이미지 업로드
            </span>
            <ImageUploadForm
              previewUrl={previewUrl}
              onChange={handleChangeFileInput}
            />
          </div>
        )}
      </div>
      <CommonButton
        type="submit"
        className={`mt-[30px] px-1 py-2 w-full text-[15px] font-medium text-white ${(!clickedSignUp && isError) || (clickedSignUp && (isError || !previewUrl)) ? 'bg-gray-400' : 'bg-gray-700'} rounded-md`}
        name={clickedSignUp ? '회원가입' : '로그인'}
        onClick={handleClickButton}
        disabled={
          (!clickedSignUp && isError) ||
          (clickedSignUp && isError && !previewUrl)
        }
      >
        {clickedSignUp ? '회원가입' : '로그인'}
      </CommonButton>
      <p className="mt-[20px] text-[13px] text-gray-500">
        {clickedSignUp ? '로그인' : '회원가입'} 화면으로 가려면{' '}
        <CommonButton
          className="text-[14px] font-bold text-gray-600"
          name="return"
          onClick={handleClickButton}
        >
          여기를 클릭
        </CommonButton>
      </p>
    </form>
  );
};

export default LoginScreen;
