import React from 'react';
// Screens
// import ReminderLayout from '../(Reminder)/_layout';
// import Attendance from '@/app/Home/Attendance';
// import DuaDetail from '@/app/Home/DuaDetail';
// import DuaDhikr from '@/app/Home/DuaDhikr';
// import QuranDetail from '@/app/Home/QuranDetail';
// import QuranHadith from '@/app/Home/QuranHadith';
import { BackButton } from '@/components/BackButton';
import { Stack } from 'expo-router';

const HomeStack = () => {
  return (
    <Stack screenOptions={{headerShown: false, }}>
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="Courses"  /> */}
      <Stack.Screen
        name="QuizParent"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Quiz',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
      <Stack.Screen
        name="Timetable"
        options={({navigation}) => ({
          headerShown: false
        })}
      />
      <Stack.Screen
        name="Attendance"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Attendance',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
    </Stack>
  );
};

export default HomeStack