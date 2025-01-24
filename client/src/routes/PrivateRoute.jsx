import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Spin } from 'antd';
import { getFromLocalStorage } from '@/utils/localStorage.js';

export const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const token = getFromLocalStorage('authToken');
  console.log(loading, 'loading');
  //
  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         height: '100vh',
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
