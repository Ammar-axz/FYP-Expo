import { API } from '@/api';
import ConfirmBtn from '@/components/ConfirmBtn';
import FormField from '@/components/FormField';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const StudentForm = () => {
  const {loggedInUser,loggedInUserId,loggedInUserRole,setLoggedInUser,setLoggedInUserId,
    setLoggedInUserPfp,setLoggedInUserRole,setLoggedInUserPoints,setLoggedInUserClasses} = userData()
  const API_URL = process.env.API_URL
  const WEB_API_URL = process.env.WEB_API_URL

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
      let response = await axios.post(`${API.BASE_URL}/api/login`,form)
        
      if(response.data.Role != 'Teacher')
      {
        Alert.alert(
          "Wrong Sign in",
          `Sign in ${response.data.Role} Module`,
          [
            {text:'Ok',onPress:()=>(router.back())}
          ]
        )
      }
      else
      {
        
        setLoggedInUserId(response.data._id)
        setLoggedInUser(response.data.Name)
        setLoggedInUserRole(response.data.Role)
        setLoggedInUserPoints(response.data.Points)
        setLoggedInUserPfp(response.data.pfp)
        // setIsSubmitting(false);
        // navigation.replace('(tabs)');
        router.replace('(tabs-teacher)/(home-teacher)');
      }
    }
    catch(err)
    {
      // setError(err.response.data)
      console.log("err"+err)
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Heading heading="Enter Information" />
         <View style={{marginVertical: 10}}>
            <Paragraph paragraph="Provide your details to continue" />
          </View>

          {/* <FormField
            title="Student ID"
            value={form.studentId}
            handleChangeText={(e) => setForm({ ...form, studentId: e })}
            keyboardType="numeric"
            placeholder="ex. 232435"
          /> */}

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
          />

          <ConfirmBtn
            title="Save & Continue"
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
