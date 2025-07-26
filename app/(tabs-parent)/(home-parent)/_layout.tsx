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
        name="Sabaq"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Sabaq',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
      <Stack.Screen
        name="Exams"
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Exams',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
    </Stack>
  );
};

export default HomeStack