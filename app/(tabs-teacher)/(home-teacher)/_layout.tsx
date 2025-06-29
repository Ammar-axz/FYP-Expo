import React from 'react';
// Screens
// import ReminderLayout from '../(Reminder)/_layout';
// import Attendance from '@/app/Home/Attendance';
// import DuaDetail from '@/app/Home/DuaDetail';
// import DuaDhikr from '@/app/Home/DuaDhikr';
// import QuranDetail from '@/app/Home/QuranDetail';
// import QuranHadith from '@/app/Home/QuranHadith';
import { BackButton } from '@/components/BackButton';
import { Search } from '@/components/Search';
import { Stack } from 'expo-router';

const HomeStack = () => {
  return (
    <Stack screenOptions={{headerShown: false, }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="Courses"  /> */}
      <Stack.Screen
        name="Attendance-Teacher"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Attendance',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
      <Stack.Screen
        name="Reminder"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Reminder',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff',elevation: 0},
        })}
      />
      {/* <Stack.Screen
        name="Timetable"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Timetable',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      /> */}
      <Stack.Screen
        name="DuaDhikr"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
       <Stack.Screen
        name="DuaDetail"
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: route.params?.dua?.title || 'Dua Detail',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: () =><Search navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="QuranHadith"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="QuranDetail"
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: route.params?.quran?.title || 'Quran Detail',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: () =><Search navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen
        name="Timetable"
        options={({route, navigation}) => ({
          headerShown: false,
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
    </Stack>
  );
};

export default HomeStack