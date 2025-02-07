import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { MainLayout } from '@/layouts/MainLayout';
import { PrivateRoute } from './PrivateRoute';
import { useEffect } from 'react';
import { updateMetaTags } from '@/utils/metaTags';
import { Navigate } from 'react-router-dom';
import { InventoryPage } from '@/pages/InventoryPage.jsx';
import { CategoryPage } from '@/feature/category/categoryPage.jsx';
import { OrderPage } from '@/pages/OrderPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/orders',
            element: <OrderPage />,
          },

          {
            path: '/inventory',
            element: <InventoryPage />,
          },

          {
            path: '/categories',
            element: <CategoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
