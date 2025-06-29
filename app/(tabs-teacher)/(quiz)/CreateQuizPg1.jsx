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
import DatePicker from 'react-native-date-picker';
BackButton

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const CreateQuizPg1 = ({ visible, onSave, onClose }) => {
  const [localReminder, setLocalReminder] = useState({
    title: '',
    category: categories[0].value, // Default to first category
    date: new Date(),
    color: 'gray',
  });

  const [open, setOpen] = useState(false);

  return (
      <View style={styles.modalOverlay}>
        <View style={styles.headerContainer}>
            <BackButton/>
        </View>
        <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Create Quiz</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter quiz title"
          />

          <Text style={styles.label}>Class</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={localReminder.category}
              onValueChange={(itemValue) => setLocalReminder({ ...localReminder, category: itemValue })}
              style={styles.picker}
            >
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat.label} value={cat.value} />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.input}>
            <Text>{localReminder.date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={localReminder.date}
            onConfirm={selectedDate => {
              setOpen(false);
              setLocalReminder({ ...localReminder, date: selectedDate });
            }}
            onCancel={() => setOpen(false)}
          />

          <ReminderBtn btnTitle="Next" handleAddReminder={()=>router.push('CreateQuizPg2')} />
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