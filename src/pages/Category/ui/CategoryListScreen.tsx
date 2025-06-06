import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

import { CategoryList } from '@features/Category';
import { DUMMY_CATEGORY } from '@entities/Category';
import { UserDataAtom } from '@entities/User';
import { CommonButton, DoughnutChart, PlusLinkButton } from '@shared/ui';
import { supabase } from '@shared/api';

const CategoryListScreen = () => {
  const [userData, setUserData] = useRecoilState(UserDataAtom);

  const handleClickLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) return toast.error('로그아웃 실패');
    toast.success('로그아웃 되었습니다.');
    setUserData(null);
  };

  return (
    <div className="relative flex flex-col w-full h-screen px-[20px] py-[30px] bg-gray-50 overflow-auto">
      <div className="flex flex-col justify-center items-center gap-y-3 my-[30px]">
        <DoughnutChart
          value={20}
          maxValue={100}
          outerStyle="flex justify-center items-center w-[150px] h-[150px]"
          innerStyle="w-[130px] h-[130px]"
          backgroundColor="bg-gray-200"
          chartColor="#60a5fa"
        >
          <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
            <img src={userData?.profile_image_url} alt="유저 프로필 이미지" />
          </div>
        </DoughnutChart>
        <span className="text-[13px] text-gray-400">20/100 tasks</span>
        <h1 className="-mt-[10px] text-[20px] text-gray-600 font-semibold">
          {userData?.nickname}
        </h1>
        <CommonButton
          className="px-4 py-1 bg-gray-400 text-white text-[13px] rounded-sm"
          onClick={handleClickLogOut}
        >
          로그아웃
        </CommonButton>
      </div>
      <div className="border-b border-gray-200" />
      <h1 className="my-[20px] ml-[2px] font-semibold text-[30px] text-gray-600">
        Lists
      </h1>
      <CategoryList data={DUMMY_CATEGORY} />
      <PlusLinkButton href="createCategory" />
    </div>
  );
};

export default CategoryListScreen;
