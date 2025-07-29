import { router } from 'expo-router'
import React from 'react'
import { View,TouchableOpacity,Text } from 'react-native'

function QuizComplete() {
  return (
    <View style={{marginTop:300}}> 
            <Text> Quiz Completed </Text>

        <TouchableOpacity
         onPress={()=>router.dismissTo('(quiz)')}>
            <Text> OK </Text>
        </TouchableOpacity>
    </View>
  )
}

export default QuizComplete