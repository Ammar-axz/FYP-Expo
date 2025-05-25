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
        name="Attendance"
        // component={Attendance}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: 'white',elevation: 0},
        })}
      />
      <Stack.Screen
        name="DuaDhikr"
        // component={DuaDhikr}
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
        // component={DuaDetail}
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
        // component={QuranHadith}
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
        // component={QuranDetail}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: route.params?.quran?.title || 'Quran Detail',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: () =><Search navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      {/* <Stack.Screen
        name="(Reminder)"
        component={ReminderLayout}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'Reminder',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      /> */}
    </Stack>
  );
};

export default HomeStack