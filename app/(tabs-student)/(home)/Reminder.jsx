import ReminderBtn from '@/components/ReminderBtn';
import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ReminderDetailModal from './ReminderDetailModal';
import ReminderList from './ReminderList';
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { API } from '@/api';
import Heading from '@/components/Heading';

const ReminderScreen = () => {
  const { loggedInUserId } = userData();
  const [reminders, setReminders] = useState([]);
  const [reload, setReload] = useState(true);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);

  useEffect(() => {
    getReminders();
  }, [reload]);

  const openAddEditModal = (editing = false, reminder = null) => {
    setDetailModalVisible(true);
  };

  async function removeReminder(Id) {
    try {
      await axios.delete(`${API.BASE_URL}/api/removeReminder`, {
        data: { id: Id },
      });
      setReload(!reload);
    } catch (e) {
      console.log(e);
    }
  }

  function closeModal() {
    setDetailModalVisible(false);
    setReload(!reload);
  }

  async function getReminders() {
    try {
      const reminders = await axios.get(`${API.BASE_URL}/api/getReminders`, {
        params: { user_id: loggedInUserId },
      });
      setReminders(reminders.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Heading heading="Reminders" />
        <ReminderList reminders={reminders} removeReminder={removeReminder} />
      </View>

      <ReminderBtn
        btnTitle="Add New Reminder"
        handleAddReminder={() => openAddEditModal(false)}
      />

      <ReminderDetailModal visible={isDetailModalVisible} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
});

export default ReminderScreen;
