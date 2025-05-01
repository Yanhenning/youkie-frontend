import {User, UserAuthenticated} from '@/context/UserContext';
import { post } from '@/client/methods';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type TokenResponse = {
  token: string;
  refreshToken: string;
};

export const authService = {
  register: async (params: RegisterParams): Promise<User> => {
    try {
      return await post<User>('/auth/register', params);
    } catch (error: unknown) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  login: async (params: LoginParams): Promise<UserAuthenticated> => {
    try {
      return await post<UserAuthenticated>('/auth/login', params);
    } catch (error: unknown) {
      console.error('Login error:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken: string): Promise<TokenResponse> => {
    try {
      return await post<TokenResponse>('/auth/token', { refreshToken });
    } catch (error: unknown) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },
};

export const useLoginMutation = (options?: {
  onSuccess?: (data: UserAuthenticated) => void;
  onError?: (error: unknown) => void;
}): UseMutationResult<UserAuthenticated, unknown, LoginParams, unknown> => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}

export const useRegisterMutation = (
  onSuccess?: (data: User) => void,
  onError?: (error: unknown) => void
): UseMutationResult<User, unknown, RegisterParams, unknown> => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess,
    onError,
  });
};

export const useRefreshTokenMutation = (
  onSuccess?: (data: TokenResponse) => void,
  onError?: (error: unknown) => void
): UseMutationResult<TokenResponse, unknown, string, unknown> => {
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess,
    onError,
  });
};
