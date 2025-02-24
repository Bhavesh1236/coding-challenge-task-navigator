import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from './types';
import { RootState } from '../store';

import LoginScreen from '../screens/LoginScreen';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';
import CreateTodoScreen from '../screens/CreateTodoScreen';
import EditTodoScreen from '../screens/EditTodoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['tasknavigator://'],
  config: {
    screens: {
      TodoDetails: {
        path: 'todo/:id',
        parse: { id: (id: string) => Number(id) },
      },
    },
  },
};

export default function Navigation({ ref }: { ref: any }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer linking={linking} ref={ref}>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="TodoList" component={TodoListScreen} />
            <Stack.Screen name="TodoDetails" component={TodoDetailsScreen} />
            <Stack.Screen name="CreateTodo" component={CreateTodoScreen} />
            <Stack.Screen name="EditTodo" component={EditTodoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 