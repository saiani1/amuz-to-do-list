import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { searchWordAtom, type ToDoType } from '@entities/ToDoList';
import { ToDo } from './ToDo';
import { supabase } from '@shared/api';

type ToDoListType = {
  categoryId: string;
  setTaskNum: React.Dispatch<React.SetStateAction<number>>;
};

export const ToDoList = ({ categoryId, setTaskNum }: ToDoListType) => {
  const searchKeyword = useRecoilValue(searchWordAtom);
  const [isChanged, setIsChanged] = useState(true);
  const [todoData, setTodoData] = useState<ToDoType[]>();

  useEffect(() => {
    (async () => {
      if (isChanged) {
        const { data: todos, error } = await supabase
          .from('todos')
          .select('*')

          .eq('category_id', categoryId)
          .order('is_checked', { ascending: true })
          .order('is_important', { ascending: false });
        if (error) console.log(error);
        if (todos) {
          setTodoData(todos);
          setIsChanged(false);
          setTaskNum(todos.length);
        }
      }
    })();
  }, [isChanged]);

  useEffect(() => {
    if (searchKeyword && todoData) {
      const filterdData = todoData?.filter((todo) => {
        return todo.content.includes(searchKeyword);
      });
      setTodoData(filterdData);
    }
    if (searchKeyword.length === 0) setIsChanged(true);
  }, [searchKeyword]);

  return (
    <li className="bg-white">
      <ul className="flex flex-col gap-y-3 pb-[30px]">
        {todoData?.map((item) => (
          <ToDo
            key={`todo-${item.id}`}
            data={item}
            setIsChanged={setIsChanged}
          />
        ))}
      </ul>
    </li>
  );
};
