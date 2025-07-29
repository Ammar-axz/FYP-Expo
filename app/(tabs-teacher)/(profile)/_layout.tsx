// import CourseDetails from '@/app/Course/CourseDetails';
import { BackButton } from '@/components/BackButton';
import { Stack } from 'expo-router';
import React from 'react';

const CourseStack = () => {
  return(
    <Stack>
      <Stack.Screen 
      name="EditProfileScreen"
      options={({navigation}) => ({
        headerShown: false,
        headerTitle: '',
        headerLeft: () => <BackButton navigation={navigation} />,
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#fff'},
      })}
      />
    </Stack>
  )
};

export default CourseStack