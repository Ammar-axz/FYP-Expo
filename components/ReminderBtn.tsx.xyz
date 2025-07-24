import {StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ReminderBtn = ({btnTitle, handleAddReminder}) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
            <Text style={styles.addButtonText}>{btnTitle}</Text>
          </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#121212',
    height: 57,
    width: 357,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center'
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ReminderBtn