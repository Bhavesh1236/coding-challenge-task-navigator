import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { setToken } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export default function Login() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('male'); // Default gender
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(
        'https://gorest.co.in/public/v2/users',
        {
          name,
          gender,
          email,
          status: 'active',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer d23a28f6af4ba8e5462e4b9d537d78427d4d21abc51e4c97b844cca8754c2040',
          },
        }
      );

      console.log('User created successfully:', response.data);
      await AsyncStorage.setItem('userId', response.data.id.toString());
      setError('');
      navigation.navigate('TodoList');
    } catch (error) {
      console.error('Failed to create user:', error);
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Gender:</Text>
      <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
        <RadioButton.Item label="Male" value="male" />
        <RadioButton.Item label="Female" value="female" />
      </RadioButton.Group>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleCreateUser}>
        Create User
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
}); 