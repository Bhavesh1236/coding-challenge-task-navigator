import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types';
import NetInfo from '@react-native-community/netinfo';

const BASE_URL = 'https://gorest.co.in/public/v2';

const api = axios.create({
  baseURL: BASE_URL,
});

// Queue for offline operations
let offlineQueue: (() => Promise<void>)[] = [];

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const storeTodosLocally = async (todos: Todo[]) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to store todos locally:', error);
  }
};

const getTodosFromLocalStorage = async (): Promise<Todo[]> => {
  try {
    const todos = await AsyncStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Failed to load todos from local storage:', error);
    return [];
  }
};

const syncOfflineQueue = async () => {
  while (offlineQueue.length > 0) {
    const operation = offlineQueue.shift();
    if (operation) {
      await operation();
    }
  }
};

export const todoApi = {
  getTodos: async () => {
    try {
      const response = await api.get<Todo[]>('/todos');
      await storeTodosLocally(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to load todos from API, trying local storage:', error);
      return await getTodosFromLocalStorage();
    }
  },
  getTodoById: (id: number) => api.get<Todo>(`/todos/${id}`),
  createTodo: async (todo: Omit<Todo, 'id'>): Promise<void> => {
    const operation = async (): Promise<void> => {
      const response = await api.post<Todo>('/todos', todo);
      const todos = await getTodosFromLocalStorage();
      await storeTodosLocally([...todos, response.data]);
    };

    // Check network status
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await operation();
    } else {
      // Queue the operation for later
      offlineQueue.push(operation);
    }
  },
  updateTodo: async (id: number, todo: Partial<Todo>): Promise<void> => {
    const operation = async (): Promise<void> => {
      const response = await api.patch<Todo>(`/todos/${id}`, todo);
      const todos = await getTodosFromLocalStorage();
      const updatedTodos = todos.map(t => (t.id === id ? response.data : t));
      await storeTodosLocally(updatedTodos);
    };

    // Check network status
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await operation();
    } else {
      // Queue the operation for later
      offlineQueue.push(operation);
    }
  },
  deleteTodo: async (id: number): Promise<void> => {
    const operation = async (): Promise<void> => {
      await api.delete(`/todos/${id}`);
      const todos = await getTodosFromLocalStorage();
      const updatedTodos = todos.filter(t => t.id !== id);
      await storeTodosLocally(updatedTodos);
    };

    // Check network status
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      await operation();
    } else {
      // Queue the operation for later
      offlineQueue.push(operation);
    }
  },
};

// Listen for network changes and sync the queue
NetInfo.addEventListener(state => {
  if (state.isConnected) {
    syncOfflineQueue();
  }
});

export default api; 