import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserContextProvider } from '@/Context/UserContext';
import { useColorScheme } from '@/hooks/useColorScheme';

import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function RootLayout() 
{
  const [fcmToken, setFcmToken] = useState <string> ("");
  
  useEffect(() => {
    // Request permission
    messaging().requestPermission().then(authStatus => {
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        getToken();
      }
    });

    // Foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('New Notification', remoteMessage.notification?.body || 'No body');
    });

    // Background messages
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Background message', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    setFcmToken(token);
    // Send this token to your backend
  };




  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <UserContextProvider>
    <GestureHandlerRootView>
    <SafeAreaProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
      screenOptions={
        {headerShown:false}
      }
      >
        <Stack.Screen name="(splash)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
    </UserContextProvider>
  );
}
