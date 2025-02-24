import React, { useEffect, useRef } from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import Navigation from './src/navigation';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './src/navigation/types';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    disabled: '#d3d3d3', // Set your desired inactive button color here
  },
};

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null); // Specify the type argument

  useEffect(() => {
    const handleDeepLink = (url: string) => {
      const route = url.replace(/.*?:\/\//g, ''); // Remove the scheme
      const id = route.split('/')[1]; // Get the ID from the URL
      if (id && navigationRef.current) {
        // Navigate to TodoDetails with the ID
        navigationRef.current.navigate('TodoDetails', { id: Number(id) });
      }
    };

    const linkingListener = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    // Check if the app was opened from a link
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <Navigation ref={navigationRef} />
      </PaperProvider>
    </StoreProvider>
  );
} 