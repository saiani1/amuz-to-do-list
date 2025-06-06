import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-hot-toast';

import { CategoryList } from '@features/Category';
import type { CategoryType } from '@entities/Category';
import { UserDataAtom } from '@entities/User';
import { CommonButton, DoughnutChart, PlusLinkButton } from '@shared/ui';
import { supabase } from '@shared/api';
import type { ToDoType } from '@entities/ToDoList';

const CategoryListScreen = () => {
  const [userData, setUserData] = useRecoilState(UserDataAtom);
  const [categoryData, setCategoryData] = useState<CategoryType[]>();
  const [allToDoLen, setAllToDoLen] = useState({
    total: 0,
    checked: 0,
  });

  const countData = (data: ToDoType[]) => {
    return data.reduce(
      (acc, todo) => {
        if (todo.is_checked) {
          acc.checked += 1;
        }
        return acc;
      },
      { checked: 0 }
    );
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userData!.id);
      if (error) console.log('카테고리 리스트 가져오기 실패');
      if (data) setCategoryData(data);

      const { data: todo, error: todoError } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', userData!.id);
      if (todoError) console.log('카테고리 리스트 가져오기 실패');
      if (todo) {
        const todoCnt = countData(todo);
        setAllToDoLen({
          ...todoCnt,
          total: todo.length,
        });
      }
    })();
  }, []);

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
          value={allToDoLen.checked}
          maxValue={allToDoLen.total}
          outerStyle="flex justify-center items-center w-[150px] h-[150px]"
          innerStyle="w-[130px] h-[130px]"
          backgroundColor="bg-gray-200"
          chartColor="#60a5fa"
        >
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
            <img src={userData?.profile_image_url} alt="유저 프로필 이미지" />
          </div>
        </DoughnutChart>
        <span className="text-[13px] text-gray-400">
          {allToDoLen.checked}/{allToDoLen.total} tasks
        </span>
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
      {categoryData && <CategoryList data={categoryData} />}
      <PlusLinkButton href="createCategory" />
    </div>
  );
};

export default CategoryListScreen;
