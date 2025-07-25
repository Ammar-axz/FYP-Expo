import { BackButton } from '@/components/BackButton';
import ReminderBtn from '@/components/ReminderBtn';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useState,useEffect } from 'react';
import axios from 'axios'
import {API} from '@/api'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
BackButton

const CreateExam = () => {

  const {Class} = useLocalSearchParams()
  const selectedClass = JSON.parse(decodeURIComponent(Class));
  
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [error,setError] = useState()
  const [success,setSuccess] = useState()
  const [exam, setExam] = useState({
    Title: '',
    Class_id: selectedClass.Class._id,
    Class_Name: selectedClass.Class.Class,
    Total_Marks: 0,
    Date: new Date(),
  });

  useEffect(()=>{    
    if(error)
    {
      setTimeout(() => {
        setError()
      }, 5000);
    }
    else if(success)
    {
      setTimeout(() => {
        router.dismissTo('/Exam')
      }, 3000);
    }
  },[error,success])


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

   const handleConfirm = (date) => {
    setExam({...exam,Date:date})
    hideDatePicker();
  };

  const handleNext = async () => {
    try
    {
      let examResp = await axios.post(`${API.BASE_URL}/api/createExam`,exam)
      setSuccess('Exam Added Successfully')
    }
    catch(e)
    {
      setError("Submission Failed:"+ e.response?.data || e.message)
      console.log(e)
    }

  }

  return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {error || success ?
          <View style={ error ? styles.errorBox : styles.successBox}>
            <Text style={{color:'white',fontSize:16}}>{error  ? error : success}</Text>
          </View>
          : null
          }
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={exam.Title}
            onChangeText={value => setExam({ ...exam, Title: value })}
            style={styles.input}
            placeholder="Enter exam title"
          />
          <Text style={styles.label}>Marks</Text>
          <TextInput
            value={exam.Total_Marks}
            inputMode='numeric'
            onChangeText={value => setExam({ ...exam, Total_Marks: value })}
            style={styles.input}
            placeholder="Enter Total Marks"
          />

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text>{exam.Date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />    

          <ReminderBtn btnTitle="Submit" handleAddReminder={handleNext} />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor:'white'
  },
  errorBox:{
    backgroundColor:'#e03c3cff',
    padding:10,
    marginBottom:10
  },
  successBox:{
    backgroundColor:'#36b295',
    padding:10,
    marginBottom:10
  },
  modalContainer: {
    marginTop:30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
    marginTop:40
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#121212',
  },
  input: {
    fontSize:16,
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  label: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 17,
    marginVertical: 5,
  },
});

export default CreateExam;