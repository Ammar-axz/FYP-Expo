import ConfirmBtn from '@/components/ConfirmBtn'
import FormField from '@/components/FormField'
import Heading from '@/components/Heading'
import Paragraph from '@/components/Paragraph'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {

  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Heading heading='Enter Information' />
          <Paragraph paragraph='Provide Email address to continue the journey' />
          <FormField title='Student Id'
          value={form.name}
          handleChangeText={(e) => setForm({...form, name: e})}
          keyboardType='name'
          placeholder='ex. 232435' />
          <FormField title='Email'
          value={form.email}
          handleChangeText={(e) => setForm({...form, email: e})}
          keyboardType='email-address' 
          placeholder='example@domain.com'/>
          <FormField title='Password'
          value={form.password}
          handleChangeText={(e) => setForm({...form, password: e})}
          placeholder='Password' />
          <ConfirmBtn title='Save & Continue' isLoading={isSubmitting} handlePress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default SignIn