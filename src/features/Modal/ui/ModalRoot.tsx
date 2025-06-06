import { Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { AnimatePresence } from 'motion/react';

import { currentModalAtom } from '../model';

export const ModalRoot = () => {
  const portal = document.getElementById('portal') as Element;
  const Modal = useRecoilValue(currentModalAtom);

  return (
    <>
      {createPortal(
        <AnimatePresence
          initial={false}
          presenceAffectsLayout={false}
          mode="wait"
        >
          <Suspense> {Modal ? <Modal /> : null}</Suspense>
        </AnimatePresence>,
        portal
      )}
    </>
  );
};
