import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { todoApi } from '../services/api';

export default function CreateTodoScreen() {
  const [title, setTitle] = useState('');
  const navigation = useNavigation();

  const handleCreate = async () => {
    try {
      console.log('Creating todo...');
      await todoApi.createTodo({
        title, status: 'pending', user_id: 7717203, due_on: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (error) {
      console.log('Failed to create todo:', error);
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
      <Button mode="contained" onPress={handleCreate}>
        Create Todo
      </Button>
    </View>
  );
} 