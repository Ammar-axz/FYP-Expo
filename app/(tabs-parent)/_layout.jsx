import { userData } from '@/Context/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { BackButton } from '@/components/BackButton';

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
        name="(home-parent)"
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
        name="(classes)"
        options={({navigation})=>({
          headerShown: true,
          headerTitle: 'Classes',
          headerTitleStyle:{fontSize:28,fontWeight:'bold'},
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
          tabBarLabel: 'Classes',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/Chat.svg')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        })}
      />
      <Tabs.Screen
        name="(chat)"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/Chat.svg')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        }}
      />
       <Tabs.Screen
        name="(profile)"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <Image
              source={require('@/assets/icons/profile.svg')}
              style={[
                styles.tabIcon,
                {tintColor: focused ? '#36B295' : '#0000008C'},
              ]}
            />
          ),
        }}
      /> 
      {/*<Tabs.Screen
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
      />*/}
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