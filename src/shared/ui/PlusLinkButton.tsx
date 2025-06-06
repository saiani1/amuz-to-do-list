import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

type PlusLinkButtonType = {
  href: string;
};

export const PlusLinkButton = ({ href }: PlusLinkButtonType) => {
  return (
    <Link
      to={href}
      className="fixed bottom-[30px] right-[30px] flex justify-center items-center w-[60px] h-[60px] rounded-full bg-blue-400 shadow-md shadow-gray-300 z-200"
    >
      <FiPlus size="26" stroke="#fff" />
    </Link>
  );
};
