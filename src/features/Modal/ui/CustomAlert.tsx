import { CommonButton } from '@shared/ui';
import { IoIosInformationCircle } from 'react-icons/io';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  closeModal,
  currentModalAtom,
  dataForModalAtom,
  type CustomAlertType,
} from '../model';

export const CustomAlert = () => {
  const close = useSetRecoilState(closeModal);
  const modal = useRecoilValue(currentModalAtom);
  const { heading, desc, confirm } = useRecoilValue(
    dataForModalAtom
  ) as CustomAlertType;
  console.log('modal', modal);

  const handleConfirm = () => {
    if (confirm) {
      try {
        confirm();
      } finally {
        close(null);
      }
    } else {
      close(null);
    }
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-800/50 z-500" />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between p-[18px] w-[300px] h-[150px] bg-white rounded-lg z-1000">
        <div className="flex flex-col gap-y-2">
          <h3 className="flex items-center gap-x-1 text-[13px] text-[#999]">
            <IoIosInformationCircle size="14" fill="#666" />
            <span>{heading}</span>
          </h3>
          <p className="font-medium text-gray-600">{desc}</p>
        </div>
        <ul className="flex justify-end gap-x-2 w-full text-[15px]">
          <li className="w-[80px]">
            <CommonButton
              className="w-full py-[3px] text-white bg-blue-500 rounded-md"
              onClick={handleConfirm}
            >
              확인
            </CommonButton>
          </li>
          <li className="w-[80px]">
            <CommonButton
              className="w-full py-[3px] bg-white border border-gray-300 rounded-md box-border"
              onClick={() => close(null)}
            >
              취소
            </CommonButton>
          </li>
        </ul>
      </div>
    </>
  );
};
