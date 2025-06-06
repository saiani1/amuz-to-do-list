import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { AnimatePresence, motion } from 'motion/react';
import { FaRegSave, FaStar, FaRegTrashAlt } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  currentModalAtom,
  CustomAlert,
  dataForModalAtom,
} from '@features/Modal';
import type { ToDoType } from '@entities/ToDoList';
import { CheckBox, CommonButton, CommonInput } from '@shared/ui';
import { supabase } from '@shared/api';

type ToDoCompType = {
  data: ToDoType;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToDo = ({ data, setIsChanged }: ToDoCompType) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editData, setEditData] = useState<string>(data.content);
  const setMoal = useSetRecoilState(currentModalAtom);
  const setModalData = useSetRecoilState(dataForModalAtom);

  const handleClickTodo = () => setIsEditable((prev) => !prev);

  const handleClickSave = async () => {
    if (editData.length === 0) return;
    const { error } = await supabase
      .from('todos')
      .update({ content: editData })
      .eq('id', data.id);
    if (error) console.log(error);
    else {
      setIsChanged(true);
      toast.success('todo내용이 수정되었습니다.');
    }
    setIsEditable(false);
  };

  const handleChangeToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditData(value);
  };

  const handleChangeCheckbox = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    const { error } = await supabase
      .from('todos')
      .update({ is_checked: checked })
      .eq('id', data.id);
    if (error) console.log(error);
    else setIsChanged(true);
  };

  const handleClickDeleteBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).name;
    console.log('id', id);
    setModalData({
      heading: '알림',
      desc: '해당 ToDo를 삭제하시겠습니까?',
      confirm: async () => {
        const { error } = await supabase.from('todos').delete().eq('id', id);
        if (error) console.log(error);
        else {
          toast.success('todo가 삭제되었습니다.');
          setIsChanged(true);
        }
      },
    });
    setMoal(() => CustomAlert);
  };

  return (
    <li className="flex items-center gap-x-5">
      <AnimatePresence>
        {!isEditable && (
          <motion.div
            layout
            key="component-a"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <CheckBox
              checked={data.is_checked}
              onChange={handleChangeCheckbox}
            />
          </motion.div>
        )}
        <div className="flex justify-between items-center w-full">
          <motion.div layout className="flex justify-between w-full">
            <div className="flex flex-col">
              {!data.is_checked && isEditable ? (
                <CommonInput
                  className="border-b border-gray-300"
                  value={editData}
                  onChange={handleChangeToDo}
                />
              ) : (
                <CommonButton
                  className={`relative flex items-center gap-x-[5px] w-fit font-medium text-[17px] text-start transition-colors duration-300 strike-through ${
                    data.is_checked ? 'text-gray-400 checked' : 'text-gray-600'
                  }`}
                  onClick={handleClickTodo}
                >
                  {data.is_important && (
                    <div className="flex justify-center items-center w-[18px] h-[18px] bg-amber-400 rounded-sm">
                      <FaStar size="12" fill="#fff" className="-mt-[1px]" />
                    </div>
                  )}
                  {data.content}
                </CommonButton>
              )}
              <span className="text-[13px] text-gray-400">{data.date}</span>
            </div>
          </motion.div>
          {isEditable && (
            <motion.ul
              layout
              key="component-c"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-x-1"
            >
              <li className="flex">
                <Link to="/create" className="mr-1" state={data}>
                  <MdInfoOutline size="22" fill="#60a5fa" />
                </Link>
              </li>
              <li>
                <CommonButton
                  className="pt-1"
                  name={String(data.id)}
                  onClick={handleClickDeleteBtn}
                >
                  <FaRegTrashAlt
                    size="18"
                    fill="#60a5fa"
                    className="pointer-events-none"
                  />
                </CommonButton>
              </li>
              <li>
                <CommonButton className="p-1" onClick={handleClickSave}>
                  <FaRegSave size="20" fill="#60a5fa" />
                </CommonButton>
              </li>
            </motion.ul>
          )}
        </div>
      </AnimatePresence>
    </li>
  );
};
