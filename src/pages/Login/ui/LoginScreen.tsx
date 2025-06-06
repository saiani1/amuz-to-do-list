import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { UserDataAtom, type LoginType } from '@entities/User';
import { CommonButton, CommonInput, ImageUploadForm } from '@shared/ui';
import { supabase } from '@shared/api';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [clickedSignUp, setClickedSignUp] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageFile, setImageFile] = useState<File>();
  const setUserData = useSetRecoilState(UserDataAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({ mode: 'onChange' });

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
    else {
      if (name === '회원가입') {
      } else {
      }
    }
  };

  const submit = async (formData: LoginType) => {
    if (clickedSignUp) {
      try {
        // 회원가입 api호출
        let { data, error } = await supabase.auth.signUp({
          email: formData.email!,
          password: formData.password,
        });
        if (error) return toast.error('회원가입 실패');
        const user = data.user;
        if (user) {
          // supabase storage에 이미지 업로드
          const {} = await supabase.storage
            .from('thumbnail')
            .upload(`${formData.email}/thumbnail`, imageFile!);

          // 업로드 된 이미지 url반환
          const publicUrl = supabase.storage
            .from('thumbnail')
            .getPublicUrl(`${formData.email}/thumbnail`).data.publicUrl;

          // users테이블에 nickname, profile image url추가
          const { error } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                nickname: formData.nickname,
                profile_image_url: publicUrl,
              },
            ])
            .select();
          if (error) return toast.error('사용자 데이터 입력 실패');
          setUserData({
            id: user.id,
            email: formData.email,
            nickname: formData.nickname,
            profile_image_url: publicUrl,
          });
          navigate('/');
          toast.success('회원가입이 완료되었습니다.');
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // 로그인 api호출
      try {
        let { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email!,
          password: formData.password,
        });
        if (error) return toast.error('로그인 실패');
        else {
          const user = data.user;
          if (user) {
            // 사용자 썸네일url 호출
            const publicUrl = supabase.storage
              .from('thumbnail')
              .getPublicUrl(`${formData.email}/thumbnail`).data.publicUrl;

            // nickname호출
            let { data: users } = await supabase
              .from('users')
              .select('nickname');
            setUserData({
              id: user.id,
              email: formData.email,
              nickname: users![0].nickname,
              profile_image_url: publicUrl,
            });
            navigate('/');
            toast.success('로그인 되었습니다.');
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
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
          <span className="font-semibold text-gray-700 text-[14px]">Email</span>
          <CommonInput
            className="px-3 py-1 border border-gray-300 rounded-sm placeholder:text-[13px] placeholder:text-gray-400"
            placeholder="이메일을 입력하세요."
            {...register('email', { required: true })}
          />
        </label>
        <label className="flex flex-col gap-y-1 w-full">
          <span className="font-semibold text-gray-700 text-[14px]">
            Password
          </span>
          <CommonInput
            type="password"
            minLength={6}
            className="px-3 py-1 border border-gray-300 rounded-sm placeholder:text-[13px] placeholder:text-gray-400"
            placeholder="비밀번호를 입력하세요"
            {...register('password', { required: true })}
          />
        </label>
        {clickedSignUp && (
          <>
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
            <div className="flex flex-col gap-y-3">
              <span className="font-semibold text-gray-700 text-[14px]">
                프로필 이미지 업로드
              </span>
              <ImageUploadForm
                previewUrl={previewUrl}
                onChange={handleChangeFileInput}
              />
            </div>
          </>
        )}
      </div>
      <CommonButton
        type="submit"
        className={`mt-[30px] px-1 py-2 w-full text-[15px] font-medium text-white ${(!clickedSignUp && isError) || (clickedSignUp && (isError || !previewUrl)) ? 'bg-gray-400' : 'bg-gray-700'} rounded-md`}
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
