// firebase.js - Final Corrected Version
import { getApp, getApps } from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging'; // <-- This is the Module

// For React Native Firebase, the app is automatically initialized from google-services.json
// We just need to get the default app instance
let appInstance;
try {
  // Check if any apps exist first
  const apps = getApps();
  if (apps.length > 0) {
    // Use existing app
    appInstance = apps[0];
  } else {
    // Get the default app (should be auto-initialized by native from google-services.json)
    appInstance = getApp();
  }
} catch (error) {
  // If initialization fails, it means Firebase native setup is incomplete
  console.error('Firebase app initialization error:', error);
  console.error('Please ensure:');
  console.error('1. google-services.json is in android/app/');
  console.error('2. The app has been rebuilt after adding Firebase');
  console.error('3. All Firebase native dependencies are properly installed');
  throw error;
}

// Export the messaging SERVICE INSTANCE
export const messagingService = messaging(); 

// Export the messaging MODULE (the original import) which contains AuthorizationStatus
export const messagingModule = messaging; // <-- Exporting the imported module itself

// Export the app instance if needed elsewhere
export const firebaseApp = appInstance;