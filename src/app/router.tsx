import { createBrowserRouter } from 'react-router-dom';

import CreateToDoScreen from '@pages/ToDo/ui/CreateToDoScreen';
import ToDoListScreen from '@pages/ToDo/ui/ToDoListScreen';
import CategoryListScreen from '@pages/Category/ui/CategoryListScreen';
import { Layout } from './Layout';
import CreateCategoryScreen from '@pages/Category/ui/CreateCategoryScreen';
import LoginScreen from '@pages/Login/ui/LoginScreen';
import { PrivateRoute } from '@features/Auth/lib';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <CategoryListScreen />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'createCategory',
        element: (
          <PrivateRoute>
            <CreateCategoryScreen />
          </PrivateRoute>
        ),
      },
      {
        path: ':category_id',
        element: (
          <PrivateRoute>
            <ToDoListScreen />
          </PrivateRoute>
        ),
      },
      {
        path: 'create',
        element: (
          <PrivateRoute>
            <CreateToDoScreen />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
