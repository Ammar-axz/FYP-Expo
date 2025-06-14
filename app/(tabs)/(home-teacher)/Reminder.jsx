import ReminderBtn from '@/components/ReminderBtn';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AddEditReminderModal from './AddEditReminderModal';
import ReminderDetailModal from './ReminderDetailModal';
import ReminderList from './ReminderList';

const remindersData = [
  { id: '1', title: 'Read Surah Al-Imran', category: 'Quran', date: '2025-01-25', color: '#FFE9E5' },
  { id: '2', title: 'Make Dua for Health', category: 'Duas', date: '2025-01-25', color: '#F6FFE5' },
];

const ReminderScreen = () => {
  const [reminders, setReminders] = useState(remindersData);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [isAddEditModalVisible, setAddEditModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const openDetailModal = (reminder) => {
    setSelectedReminder(reminder);
    setDetailModalVisible(true);
  };

  const openAddEditModal = (editing = false, reminder = null) => {
    setIsEditing(editing);
    setSelectedReminder(reminder);
    setAddEditModalVisible(true);
  };

  const saveReminder = (reminder) => {
    if (isEditing) {
      setReminders((prevReminders) =>
        prevReminders.map((item) => (item.id === reminder.id ? reminder : item))
      );
    } else {
      setReminders((prevReminders) => [
        ...prevReminders,
        { ...reminder}, // Use uuid for unique IDs
      ]);
    }
    setAddEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ReminderList reminders={reminders} onItemPress={openDetailModal} />

      <ReminderBtn btnTitle='Add New Reminder' handleAddReminder={() => openAddEditModal(false)} />

      <ReminderDetailModal
        visible={isDetailModalVisible}
        reminder={selectedReminder}
        onClose={() => setDetailModalVisible(false)}
        onEdit={() => {
          setDetailModalVisible(false);
          openAddEditModal(true, selectedReminder);
        }}
      />

      <AddEditReminderModal
        visible={isAddEditModalVisible}
        reminder={selectedReminder}
        isEditing={isEditing}
        onSave={saveReminder}
        onClose={() => setAddEditModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
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

export default ReminderScreen;