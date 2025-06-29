import { userData } from '@/Context/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

// Screens
// import ReminderLayout from '../(Reminder)/_layout';
import { Tabs } from 'expo-router';

const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  const {loggedInUserRole} = userData()
  return (
    <Tabs
      screenOptions={{
        tabBarStyle:{
          height:'10%',
          paddingTop:'2%',
          backgroundColor:'#FFFFFF'
        },
        tabBarActiveTintColor: '#36B295',
        tabBarInactiveTintColor: '#0000008C',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home-teacher)"
        options={{
          
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/home.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(time-table)"
        options={{
          tabBarLabel: 'TimeTable',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/courses.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
          
        }}
      />
      <Tabs.Screen
        name="(courses)"
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/library.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Leaderboard"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/ranking.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C',
                  height:'100%'
                },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Setting"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/setting.png')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    resizeMode: 'contain',
  },
  backButton: {
    padding: 15,
    marginVertical:15,
    backgroundColor: '#1212120D',
    borderRadius: 100,
  },
  backArrow: {
    tintColor: '#000',
    resizeMode: 'contain',
  },
});

export default TabsLayout;