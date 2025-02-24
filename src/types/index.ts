export interface Todo {
  id: number;
  user_id: number;
  title: string;
  due_on: string;
  status: 'pending' | 'completed';
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
} 