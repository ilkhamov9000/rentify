export type UserRole = "user" | "admin" | "agent";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: UserRole;
  phone?: string;
  createdAt: string;
  favorites?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}