import { IconSymbol } from '@/components/ui/IconSymbol';
import { Tabs, useLocalSearchParams } from 'expo-router';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AuthLayout = () => {
  const { role } = useLocalSearchParams()
  
  // Determine initial screen based on role
  const initialScreen =
    role === 'Student' ? 'StudentForm' :
    role === 'Teacher' ? 'TeacherForm' :
    role === 'Parent' ? 'ParentForm' :
    'StudentForm'; // Default fallback

  return (
    <Tabs
      initialRouteName={initialScreen}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {display:'none'}
      }}>
      <Tabs.Screen
        name="StudentForm"
        options={{
          title: 'StudentForm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="TeacherForm"
        options={{
          title: 'TeacherForm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="ParentForm"
        options={{
          title: 'ParentForm',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
