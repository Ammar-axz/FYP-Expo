import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ReminderList = ({reminders, onItemPress}) => {
  const renderReminder = ({item}) => (
    <TouchableOpacity onPress={() => onItemPress(item)}>
      <View style={[styles.reminder, {backgroundColor: item.color}]}>
        <View style={styles.indicator}></View>
        <View style={{flex: 1}}>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <View style={styles.reminderInfo}>
            <Image
              source={require('@/assets/icons/clockicon.png')}
              resizeMode="contain"
            />
            <Text style={styles.reminderDate}>Due: {item.date}</Text>
          </View>
        </View>
        <View style={{marginTop: 25}}>
          <Image
            source={require('@/assets/icons/rightarrowblack.png')}
            style={{resizeMode: 'contain'}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={reminders}
      keyExtractor={item => item.id}
      renderItem={renderReminder}
    />
  );
};

const styles = StyleSheet.create({
  reminder: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
  },
  indicator: {
    height: 72,
    width: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#A0665C',
  },
  reminderTitle: {fontSize: 20, fontWeight: '600', color: '#121212'},
  reminderInfo: {
    flexDirection: 'row',
    height: 26,
    width: 157,
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#0000000D',
    opacity: 5,
  },
  reminderDate: {fontSize: 14, fontWeight: '500'},
});

export default ReminderList;
