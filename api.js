import { Platform } from 'react-native';
import * as Device from 'expo-device';

let baseURL
  if(Platform.OS === 'android')
  {
    if(!Device.isDevice)
    {
      baseURL = process.env.EXPO_PUBLIC_EMULATOR_API_URL
    }
    else
    {
      baseURL = process.env.EXPO_PUBLIC_DEVICE_API_URL
    }
  }
  else
  {
    baseURL = process.env.EXPO_PUBLIC_WEB_API_URL;
  }

export const API = {
  BASE_URL: baseURL,
};