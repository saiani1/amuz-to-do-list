import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaRegSave } from 'react-icons/fa';
import { MdInfoOutline } from 'react-icons/md';

import type { ToDoType } from '@entities/ToDoList';
import { CheckBox, CommonButton, CommonInput } from '@shared/ui';

type ToDoCompType = {
  data: ToDoType;
};

export const ToDo = ({ data }: ToDoCompType) => {
  const [isEditable, setIsEditable] = useState(false);
  const [editData, setEditData] = useState(data);

  const handleClickTodo = () => setIsEditable((prev) => !prev);
  const handleClickSave = () => setIsEditable(false);
  const handleChangeToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditData((prev) => ({ ...prev, content: value }));
  };
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setEditData((prev) => ({ ...prev, is_checked: checked }));
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
              checked={editData.is_checked}
              onChange={handleChangeCheckbox}
            />
          </motion.div>
        )}
        <div className="flex justify-between w-full">
          <motion.div layout className="flex flex-col">
            {!editData.is_checked && isEditable ? (
              <CommonInput
                className="border-b border-gray-300"
                value={editData.content}
                onChange={handleChangeToDo}
              />
            ) : (
              <CommonButton
                className={`relative w-fit font-medium text-[17px] text-start transition-colors duration-300 strike-through ${
                  editData.is_checked
                    ? 'text-gray-400 checked'
                    : 'text-gray-600'
                }`}
                onClick={handleClickTodo}
              >
                {editData.content}
              </CommonButton>
            )}
            <span className="text-[13px] text-gray-400">
              {editData.created_at}
            </span>
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
              <li>
                <CommonButton className="p-1">
                  <MdInfoOutline size="22" fill="#60a5fa" />
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
