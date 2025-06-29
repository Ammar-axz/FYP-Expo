import ReminderBtn from '@/components/ReminderBtn';
import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const AddQuestionModal = ({ visible, onSave, onClose }) => {
  const [localReminder, setLocalReminder] = useState({
    title: '',
    category: categories[0].value, // Default to first category
    date: new Date(),
    color: 'gray',
  });

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onSave({ ...localReminder, date: localReminder.date.toISOString() });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.modalTitle}>Add new question</Text>
            <TouchableOpacity onPress={onClose}>
              <Image style={styles.cross} source={require('@/assets/icons/cross-black.png')}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Question</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter question"
          />
          <Text style={styles.label}>Answer</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter answer"
          />
          <Text style={styles.label}>Options</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter option"
          />
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter option"
          />
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter option"
          />

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

          <ReminderBtn btnTitle="Add" handleAddReminder={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  headingContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#121212',
  },
  cross:{
    height:25,
    width:25,
    marginRight:10
  },
  input: {
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
    height: 47,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 47,
  },
  label: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginVertical: 5,
  },
});

export default AddQuestionModal;
