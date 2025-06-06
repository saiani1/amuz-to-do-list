import { selector } from 'recoil';

import { currentModalAtom } from './atoms';

export const closeModal = selector({
  key: 'closeModal',
  get: () => null,
  set: ({ set }) => {
    set(currentModalAtom, null);
  },
});
