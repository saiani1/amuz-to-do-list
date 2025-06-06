import { atom } from 'recoil';

export const deleteToDoIdAtom = atom<number | null>({
  key: 'deleteToDoIdAtom',
  default: null,
});
