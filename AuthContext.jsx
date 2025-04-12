import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [rememberUser, setRememberUser] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = sessionStorage.getItem('jwt')
        if (!storedToken) return

        const res = await axios.get('/api/auth/check', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res.status === 200) {
          setToken(storedToken);
          setUser(res.data);
        }
      } catch (error) {
        sessionStorage.removeItem('jwt');
      } finally {
        setAuthReady(true);
      }
    };

    checkToken();
  }, []);

  const register = async (formData) => {
    const res = await axios.post('/api/auth/register', formData);
    if (res.status === 201) {
      const token = res.data.token;
      const user = {
        _id: res.data.user._id,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        role: res.data.user.role,
      };

      setToken(token);
      setUser(user);
      sessionStorage.setItem('jwt', token);

      if (rememberUser) {
        localStorage.setItem('rememberUser', 'true');
      }
    }
  };

  const login = async (formData) => {
    const res = await axios.post('/api/auth/login', formData)
    if (res.status === 200) {
      const token = res.data.token;
      const user = {
        _id: res.data._id,
        name: res.data.name,
        role: res.data.role,
      };

      setToken(token);
      setUser(user);
      sessionStorage.setItem('jwt', token);

      if (rememberUser) {
        localStorage.setItem('rememberUser', 'true');
      }

      return { token, user };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('jwt');
    localStorage.removeItem('rememberUser');
    setToken(null);
    setUser(null);
    setRememberUser(false);
  };

  const toggleRememberUser = () => {
    setRememberUser((state) => {
      if (!state) {
        localStorage.setItem('rememberUser', 'true');
      } else {
        localStorage.removeItem('rememberUser');
      }
      return !state;
    });
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    rememberUser,
    toggleRememberUser,
    authReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be called inside an AuthContextProvider');
  return context;
};
