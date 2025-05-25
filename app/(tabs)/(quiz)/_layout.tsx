// import QuizDetails from '@/app/Quiz/QuizDetails';
// import QuizOnboard from '@/app/Quiz/QuizOnboard';
import { BackButton } from '@/components/BackButton';
import { Stack } from 'expo-router';
import React from 'react';

const QuizStack = () => {
  return(
    <Stack>
      <Stack.Screen
        name="index"
        options={({navigation}) => ({
          headerShown: false,
          headerTitle: '',
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#fff'},
        })}
      />
      <Stack.Screen 
        name='QuizOnboard'
        // component={QuizOnboard}
        options={() => ({
          headerShown: false,
          headerStyle: {backgroundColor: '#fff'},
      })} />
      <Stack.Screen
        name="QuizDetails"
        // component={QuizDetails}
        options={({navigation}) => ({
          headerShown: false,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerStyle: {backgroundColor: '#fff'},
        })}
      /> 
    </Stack>
  )
};

export default QuizStack