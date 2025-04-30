export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Add more interfaces for your specific API responses here
export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthResponse {
  user: User;
  token: string;
}
