import React from 'react';
import { View } from 'react-native';
import { Text, Button, MD2Colors } from 'react-native-paper';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { todoApi } from '../services/api';
import { Todo } from '../types';

export default function TodoDetailsScreen() {
  const [todo, setTodo] = React.useState<Todo | null>(null);
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } = route.params as { id: number };

  React.useEffect(() => {
    loadTodo();
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      loadTodo();
    }, [])
  );

  const loadTodo = async () => {
    try {
      const response = await todoApi.getTodoById(id);
      setTodo(response.data);
    } catch (error) {
      console.error('Failed to load todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await todoApi.deleteTodo(id);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  if (!todo) return null;

  return (
    <View style={{ padding: 16, flex: 1, backgroundColor: '#cfcfcf' }}>
      <Text variant="headlineMedium" style={{color: MD2Colors.blue600, marginVertical:20}}>{todo.title}</Text>
      <Text variant="bodyLarge">Status: <Text style={{color: MD2Colors.blue800, marginBottom:20}}>{todo.status}</Text></Text>
      <Button mode="contained" onPress={() => navigation.navigate('EditTodo', { id })} style={{ marginTop: 16 }} > Edit </Button>
      <Button mode="outlined"  onPress={handleDelete} style={{ marginTop: 20 }}> Delete </Button>
    </View>
  );
} 