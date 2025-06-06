import { atom } from 'recoil';

export const currentModalAtom = atom<
  (() => JSX.Element) | React.LazyExoticComponent<() => JSX.Element> | null
>({
  key: 'currentModalAtom',
  default: null,
});

export const dataForModalAtom = atom<unknown>({
  key: 'dataForDialogAtom',
  default: null,
});
