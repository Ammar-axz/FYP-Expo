import Paragraph from '@/components/Paragraph';
import ReminderBtn from '@/components/ReminderBtn';
import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { API } from '@/api';
import { userData } from '@/Context/UserContext';
import { Picker } from '@react-native-picker/picker';


const ReminderDetailModal = ({ visible,  onClose }) => {
  const {loggedInUserId} = userData();

  let colors = [
    {
      Name : "red" ,
      color :"#FFE9E5"
    },
    {
      Name : "blue" ,
      color :"#b9e4fdff"
    },
    {
      Name : "green" ,
      color :"#b9fdc8ff"
    },
    {
      Name : "yellow" ,
      color :"#F6FFE5"
    },
    {
      Name : "orane" ,
      color :"#ffcaa7ff"
    },
    {
      Name : "brown" ,
      color :"#ffd59eff"
    },
  ]

  const [localReminder, setLocalReminder] = useState({
    user_id:loggedInUserId,
    title: '',
    date: new Date(),
    color: colors[0].color,
  });

  const [open, setOpen] = useState(false);

  

  const handleSave = async() => {
    if (localReminder.title.trim() === '' ) {
      // Add simple validation if title is empty
      alert('Title cannot be empty!');
      return;
    }
    else
    {
      try{
        let reminder = await axios.post(`${API.BASE_URL}/api/addReminder`,localReminder)
        onClose()
      }
      catch(e)
      {console.log(e)}
    }
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
          <Text style={styles.modalTitle}>Add Reminder</Text>
          <Paragraph paragraph="Edit your reminder details" />

          <Text style={styles.label}>Title</Text>
          <TextInput
            value={localReminder.title}
            onChangeText={text => setLocalReminder({ ...localReminder, title: text })}
            style={styles.input}
            placeholder="Enter reminder title"
          />

          <Text style={styles.label}>Date Time</Text>
          <TouchableOpacity  style={[styles.input,{width:'50%'}]} onPress={() => setOpen(true)} >
            <Text style={{marginRight:20,fontSize:16}}>{localReminder.date.toLocaleDateString()}</Text>
            <Text>{format(localReminder.date,'hh:mm a')}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={open}
            mode='datetime'
            onConfirm={selectedDate => {
              setOpen(false);
              setLocalReminder({ ...localReminder, date: selectedDate });
            }}
            onCancel={() => setOpen(false)}
          /> 

          <Text style={styles.label}>Color</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={localReminder.color}
              onValueChange={(itemValue) => setLocalReminder({ ...localReminder, color:itemValue })}
              style={styles.picker}
            >
              {colors.map((item, index) => (
                <Picker.Item key={index} label={item.Name} value={item.color} />
              ))}
            </Picker>
          </View>
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
    fontSize:16,
    flexDirection:'row',
    width: '100%',
    height: 47,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
    padding: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    width: '50%',
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
    height: 50,
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
