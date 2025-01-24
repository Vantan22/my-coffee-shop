import { useState } from 'react';
import axiosInstance from '@/utils/axiosConfig.js';
import { saveToLocalStorage } from '@/utils/localStorage.js';
// import { fetch } from "@/utils/fetch";
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await axiosInstance.get("/auth/check");
  //       const data = await response.data;
  //       if (data.user) {
  //         setUser(data.user);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error checking auth:", error);
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, []);

  const login = async (userName, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', {
        userName,
        password,
      });
      console.log(response.data);

      // const data = await response.data;
      saveToLocalStorage('authToken', JSON.stringify(response.data.token));
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);

      console.error('Error logging in:', error);
      return { error: 'Login failed' };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
      });
      const data = await response.data;
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.error('Error registering:', error);
      return { error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      const data = await response.data;
      if (data.success) {
        setUser(null);
      }
      return data;
    } catch (error) {
      console.error('Error logging out:', error);
      return { error: 'Logout failed' };
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
};
