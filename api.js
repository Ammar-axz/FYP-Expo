import { Platform } from 'react-native';

const baseURL =
  Platform.OS === 'android'
    ? process.env.EXPO_PUBLIC_API_URL
    : process.env.EXPO_PUBLIC_WEB_API_URL;

export const API = {
  BASE_URL: baseURL,
};