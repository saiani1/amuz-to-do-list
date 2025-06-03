import type { ToDoType } from '@entities/ToDoList';
import { ToDo } from './ToDo';

type ToDoListType = {
  title: string;
  data: ToDoType[];
};

export const ToDoList = ({ title, data }: ToDoListType) => {
  return (
    <li className="bg-white">
      <h3 className="mb-5 text-[14px] text-[#AAA]">{title}</h3>
      <ul className="flex flex-col gap-y-3 pb-[30px]">
        {data.map((item) => (
          <ToDo key={`${title}-${item.id}`} data={item} />
        ))}
      </ul>
    </li>
  );
};
