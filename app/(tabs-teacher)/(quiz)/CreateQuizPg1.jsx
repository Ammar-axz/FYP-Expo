import { BackButton } from '@/components/BackButton';
import ReminderBtn from '@/components/ReminderBtn';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
BackButton

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const CreateQuizPg1 = () => {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [quiz, setQuiz] = useState({
    title: '',
    class: categories[0].value, // Default to first category
    due_date: new Date(),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

   const handleConfirm = (date) => {
    setQuiz({...quiz,date:date})
    hideDatePicker();
  };

  const handleNext = () => {
    router.push({
        pathname: 'CreateQuizPg2',
        params: {
          quiz: encodeURIComponent(JSON.stringify(quiz))
        },
      })
  }

  return (
      <View style={styles.modalOverlay}>
        <View style={styles.headerContainer}>
            <BackButton/>
        </View>
        <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Create Quiz</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={quiz.title}
            onChangeText={text => setQuiz({ ...quiz, title: text })}
            style={styles.input}
            placeholder="Enter quiz title"
          />

          <Text style={styles.label}>Class</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={quiz.class}
              onValueChange={(itemValue) => setQuiz({ ...quiz, class: itemValue })}
              style={styles.picker}
            >
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat.label} value={cat.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text>{quiz.due_date.toLocaleDateString()}</Text>
          </TouchableOpacity>
              {console.log(quiz.date)}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />    

          <ReminderBtn btnTitle="Next" handleAddReminder={handleNext} />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor:'white'
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

export default CreateQuizPg1;