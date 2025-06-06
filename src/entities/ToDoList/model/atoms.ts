import { atom } from 'recoil';

export const searchWordAtom = atom<string>({
  key: 'searchWordAtom',
  default: '',
});
