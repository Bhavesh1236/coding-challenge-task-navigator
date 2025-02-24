import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { todoApi } from '../services/api';

export default function EditTodoScreen() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'pending' | 'completed'>('pending');
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  useEffect(() => {
    loadTodo();
  }, [id]);

  const loadTodo = async () => {
    try {
      const response = await todoApi.getTodoById(id);
      setTitle(response.data.title);
      setStatus(response.data.status);
    } catch (error) {
      console.error('Failed to load todo:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await todoApi.updateTodo(id, { title, status });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 16 }}
      />
      <SegmentedButtons
        value={status}
        onValueChange={value => setStatus(value as 'pending' | 'completed')}
        buttons={[
          { value: 'pending', label: 'Pending' },
          { value: 'completed', label: 'Completed' },
        ]}
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleUpdate}>
        Update Todo
      </Button>
    </View>
  );
} 