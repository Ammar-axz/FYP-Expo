import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ReminderBtn = ({btnTitle, handleAddReminder, style}) => {
  return (
    <TouchableOpacity style={[styles.addButton,style]} onPress={handleAddReminder}>
      <Text style={styles.addButtonText}>{btnTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#121212',
    height: 57,
    width: "90%",
    borderRadius: 100,
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 20,
    justifyContent: 'center'
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ReminderBtn