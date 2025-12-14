import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UserContextProvider } from '@/Context/UserContext';
import { useColorScheme } from '@/hooks/useColorScheme';

import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

// Import Firebase with error handling
let messagingService: any = null;
let messagingModule: any = null;

try {
  const firebase = require('@/firebase.js');
  messagingService = firebase.messagingService;
  messagingModule = firebase.messagingModule;
} catch (error) {
  console.warn('Firebase not available:', error);
}

export default function RootLayout() {
  const [fcmToken, setFcmToken] = useState<string>('');

  // Function to get FCM token
  const getToken = async () => {
    if (!messagingService) {
      console.warn('Firebase messaging not available');
      return;
    }
    try {
      const token = await messagingService.getToken();
      console.log('FCM Token:', token);
      setFcmToken(token);
      // TODO: Send this token to your backend
    } catch (err) {
      console.error('Error getting FCM token:', err);
    }
  };
  // Request notification permission
  const requestPermission = async () => {
    if (!messagingService || !messagingModule) {
      console.warn('Firebase messaging not available');
      return;
    }
    try {
      const authStatus = await messagingService.requestPermission();
      const enabled =
        authStatus === messagingModule.AuthorizationStatus.AUTHORIZED ||
        authStatus === messagingModule.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('FCM Permission granted');
        getToken();
      } else {
        console.log('FCM Permission denied');
      }
    } catch (error) {
      console.error('Error requesting FCM permission:', error);
    }
  };

  async function createDefaultChannel() {
    try {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
      console.log('Notification channel created');
    } catch (error) {
      console.error('Error creating notification channel:', error);
    }
  }

  useEffect(() => {
    createDefaultChannel();

    if (!messagingService || !messagingModule) {
      console.warn('Firebase messaging not initialized. Skipping FCM setup.');
      return;
    }

    requestPermission();

    // Handle foreground messages
    const unsubscribeForeground = messagingService.onMessage(async (remoteMessage: any) => {
      Alert.alert('New Notification', remoteMessage.notification?.body || 'No body');
      console.log('Foreground message:', remoteMessage);
    });

    // Handle background messages
    messagingService.setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('Background message:', remoteMessage);
      // Optional: Show local notification using notifee
    });

    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
    };
  }, []);

  // Font loading
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <UserContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
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