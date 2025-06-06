import { atom } from 'recoil';

import type { UserType } from './types';

export const UserDataAtom = atom<UserType | null>({
  key: 'userDataAtom',
  default: null,
});
