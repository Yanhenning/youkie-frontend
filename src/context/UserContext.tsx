"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {LoginParams, RegisterParams, useLoginMutation, useRegisterMutation} from '@/services/user';
import {getLocalStorage, removeLocalStorage, saveLocalStorage} from "@/utils";


export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export type UserAuthenticated = {
  access_token: string;
  token_type: string;
  user?: User | null;
}

interface UserContextType {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  login: (credentials: LoginParams) => void;
  register: (credentials: RegisterParams) => void;
  isLoading: boolean;
  isLoggedIn: () => boolean;
  loginError: unknown;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();

  const { mutate: loginMutate, isPending: isLoading , error: loginError } = useLoginMutation({
    onSuccess: (data: UserAuthenticated) => {
      setUser(data?.user);
      saveLocalStorage('token', data.access_token);
      router.push("/home")
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const login = (credentials: LoginParams) => loginMutate(credentials)

  const { mutate: registerMutate } = useRegisterMutation({
    onSuccess: (data: UserAuthenticated) => {
      setUser(data?.user);
      saveLocalStorage('token', data.access_token);
      router.push("/home")
    },
    onError: (error) => {
      console.error('Registration error:', error);
    }
  });

  const register = (credentials: RegisterParams) => registerMutate(credentials)
  
  const logout = () => {
    setUser(null);
    removeLocalStorage('token');
    router.push('/login');
  };

  const isLoggedIn = () => {
    return !!user
  }

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
    login,
    register,
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
