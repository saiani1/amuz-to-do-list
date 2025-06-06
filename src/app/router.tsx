import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from '@pages/Home/ui/HomeScreen';
import CreateToDoScreen from '@pages/ToDo/ui/CreateToDoScreen';
import { Layout } from './Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
      {
        path: 'create',
        element: <CreateToDoScreen />,
      },
    ],
  },
]);
