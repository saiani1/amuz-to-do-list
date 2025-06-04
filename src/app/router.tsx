import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from '@pages/Home/ui/HomeScreen';
import CreateToDoScreen from '@pages/ToDo/ui/CreateToDoScreen';

export const router = createBrowserRouter([
  {
    path: '/',
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
