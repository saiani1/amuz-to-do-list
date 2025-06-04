import type { IconType } from 'react-icons';

type CreateLiType = {
  liStyle?: string;
  Icon: IconType;
  iconSize?: string;
  iconStyle?: string;
  labelFor?: string;
  labelStyle?: string;
  children: React.ReactNode;
};

export const CreateLi = ({
  liStyle,
  Icon,
  iconSize,
  iconStyle,
  labelFor,
  labelStyle,
  children,
}: CreateLiType) => {
  return (
    <li
      className={`${liStyle ?? ''} flex items-center text-gray-400 focus-within:text-blue-400`}
    >
      <label
        htmlFor={labelFor}
        className={`${labelStyle ?? ''} transition-colors duration-300`}
      >
        <Icon size={iconSize} className={`${iconStyle ?? ''} text-inherit`} />
      </label>
      {children}
    </li>
  );
};
