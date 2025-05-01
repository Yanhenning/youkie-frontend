"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { LoginParams, useLoginMutation} from '@/services/user';


export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export type UserAuthenticated = {
  access_token: string;
  token_type: string;
  user?: User;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  login: (credentials: LoginParams, redirectUrl?: string) => void;
  isLoggingIn: boolean;
  loginError: unknown;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const { mutate: loginMutate, isLoading, error: loginError } = useLoginMutation({
    onSuccess: (data: UserAuthenticated) => {
      setUser(data);
      localStorage.setItem('token', data.access_token);
      router.push("/home")
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const login = (credentials: LoginParams) => loginMutate(credentials)
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null
  }

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
    login,
    isLoggedIn,
    loginError,
    isLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
