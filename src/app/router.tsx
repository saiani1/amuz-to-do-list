import { createBrowserRouter } from 'react-router-dom';

import HomeScreen from '@pages/Home/ui/HomeScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />,
  },
]);
