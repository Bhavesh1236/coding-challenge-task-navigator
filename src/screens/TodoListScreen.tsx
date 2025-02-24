import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { List, FAB, Button } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { todoApi } from '../services/api';
import { Todo } from '../types';

export default function TodoListScreen() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  React.useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setRefreshing(true);
    try {
      const todos = await todoApi.getTodos();
      setTodos(todos);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTodos();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#cfcfcf', paddingLeft: 20, paddingTop:20 }}>
      <FlatList
        data={todos}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadTodos}
          />
        }
        renderItem={({ item }) => (
          <List.Item
            contentStyle={{backgroundColor: '#8985', borderRadius: 8, paddingVertical: 8}}
            title={item.title}
            description={item.status}
            titleStyle={{ color: '#000' }}
            descriptionStyle={{ color: '#985698' }}
            onPress={() => navigation.navigate('TodoDetails', { id: item.id })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={{ position: 'absolute', margin: 25, right: 0, bottom: 0 }}
        label='Add'        
        onPress={() => navigation.navigate('CreateTodo')}
      />
    </View>
  );
} 