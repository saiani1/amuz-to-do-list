import { createBrowserRouter } from 'react-router-dom';

import CreateToDoScreen from '@pages/ToDo/ui/CreateToDoScreen';
import ToDoListScreen from '@pages/ToDo/ui/ToDoListScreen';
import CategoryListScreen from '@pages/Category/ui/CategoryListScreen';
import { Layout } from './Layout';
import CreateCategoryScreen from '@pages/Category/ui/CreateCategoryScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CategoryListScreen />,
      },
      {
        path: 'createCategory',
        element: <CreateCategoryScreen />,
      },
      {
        path: ':category_id',
        element: <ToDoListScreen />,
      },
      {
        path: 'create',
        element: <CreateToDoScreen />,
      },
    ],
  },
]);
