import Paragraph from '@/components/Paragraph';
import ReminderBtn from '@/components/ReminderBtn';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const AddEditReminderModal = ({ visible, onSave, onClose }) => {
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
          <Text style={styles.modalTitle}>Add New Reminder</Text>
          <Paragraph paragraph="Add your booking dates according to pricing" />

          <Text style={styles.label}>Title</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter reminder title"
          />

          <Text style={styles.label}>Category</Text>
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

          <Text style={styles.label}>Date</Text>
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

          <ReminderBtn btnTitle="Add" handleAddReminder={handleSave} />
          <ReminderBtn btnTitle="Cancel" handleAddReminder={onClose} />
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
    height: 850,  // Max height for smaller screens
    position: 'absolute',
    top: 60,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#121212',
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

export default AddEditReminderModal;
