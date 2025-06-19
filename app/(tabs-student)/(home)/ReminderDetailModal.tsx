import Paragraph from '@/components/Paragraph';
import ReminderBtn from '@/components/ReminderBtn';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

const categories = [
  { label: 'Quran', value: 'Quran' },
  { label: 'Duas', value: 'Duas' },
  { label: 'Health', value: 'health' },
];

const ReminderDetailModal = ({ visible, reminder, onSave, onClose }) => {
  const [localReminder, setLocalReminder] = useState({
    title: '',
    category: categories[0].value,
    date: new Date(),
    color: 'gray',
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (reminder) {
      setLocalReminder({
        title: reminder.title || '',
        category: reminder.category || categories[0].value,
        date: reminder.date ? new Date(reminder.date) : new Date(),
        color: reminder.color || '#FFE9E5',
      });
    } else {
      setLocalReminder({
        title: '',
        category: categories[0].value,
        date: new Date(),
        color: '#FFE9E5',
      });
    }
  }, [reminder]);

  const handleSave = () => {
    if (localReminder.title.trim() === '') {
      // Add simple validation if title is empty
      alert('Title cannot be empty!');
      return;
    }
    onSave({ ...localReminder, date: localReminder.date.toISOString() });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Image
              source={require('@/assets/icons/left-arrow.png')}
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Reminder</Text>
          <Paragraph paragraph="Edit your reminder details" />

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
              onValueChange={itemValue =>
                setLocalReminder({ ...localReminder, category: itemValue })
              }
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

          <ReminderBtn btnTitle="Save Changes" handleAddReminder={handleSave} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Background opacity
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: 650,
    position: 'absolute',
    bottom: 0,
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
  backButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#1212120D',
    borderRadius: 100,
    width: 50
  },
  backArrow: {
    width: 25,
    height: 25,
    tintColor: '#000',
    resizeMode: 'contain',
  },
});

export default ReminderDetailModal;
