import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ModalRoot } from '@features/Modal';

export const Layout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Toaster
        containerStyle={{
          top: 20,
        }}
        toastOptions={{
          duration: 2000,
        }}
      />

      <ModalRoot />
    </>
  );
};
