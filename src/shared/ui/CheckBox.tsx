import { FaCheck } from 'react-icons/fa6';

type CheckBoxType = React.ComponentProps<'input'> & {
  className?: string;
};

export const CheckBox = ({ className }: CheckBoxType) => {
  return (
    <>
      <input
        type="checkbox"
        className={`${className ?? ''} w-[20px] h-[20px] border border-gray-300 rounded-sm appearance-none duration-300 checked:bg-blue-400 checked:border-0`}
      />
      <FaCheck
        size="13"
        fill="white"
        className="absolute top-1 left-1 pointer-events-none"
      />
    </>
  );
};
