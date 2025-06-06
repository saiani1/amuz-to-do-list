import { Outlet } from 'react-router-dom';

import { ModalRoot } from '@features/Modal';

export const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <ModalRoot />
    </>
  );
};
