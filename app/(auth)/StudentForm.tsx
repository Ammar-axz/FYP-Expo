import ConfirmBtn from '@/components/ConfirmBtn';
import FormField from '@/components/FormField';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const StudentForm = () => {
  const {loggedInUser,setLoggedInUser,setLoggedInUserId,setLoggedInUserPfp,setLoggedInUserRole,setLoggedInUserPoints} = userData()
  
  const baseURL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'  // Android emulator
    : 'http://localhost:5000'; // iOS simulator or Web

  const [error,setError] = useState()
  const [form, setForm] = useState({
    // studentId: '',
    email: '',
    pass: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // if (!form.studentId || !form.email || !form.password) {
    //   Alert.alert('Error', 'All fields are required!');
    //   return;
    // }
    // setIsSubmitting(true);
    try{
      let response = await axios.post(`http://10.0.2.2:5000/api/Login`,form)
        console.log(response.data);
        
        setLoggedInUserId(response.data._id)
        setLoggedInUser(response.data.Name)
        setLoggedInUserPoints(response.data.Points)
        setLoggedInUserRole(response.data.Role)
        // setIsSubmitting(false);
        // navigation.replace('(tabs)');
      }
      catch(err)
      {
        console.log("err"+err)
      }
  };

  useEffect(() => {
    if (loggedInUser !== 'Demo User') {
      console.log(loggedInUser);      
      router.replace('(tabs-student)/(home)');
    }
  }, [loggedInUser]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Heading heading="Enter Information" />
          <Paragraph paragraph="Provide your details to continue" />

          <FormField
            title="Student ID"
            value={form.studentId}
            handleChangeText={(e) => setForm({ ...form, studentId: e })}
            keyboardType="numeric"
            placeholder="ex. 232435"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
            placeholder="example@domain.com"
          />

          <FormField
            title="Password"
            value={form.pass}
            handleChangeText={(e) => setForm({ ...form, pass: e })}
            placeholder="Enter your password"
            secureTextEntry={true} // Hides password
          />

          <ConfirmBtn
            title="Log in"
            isLoading={isSubmitting}
            handlePress={handleSubmit}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default StudentForm;
