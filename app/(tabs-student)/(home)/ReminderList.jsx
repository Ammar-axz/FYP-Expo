import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { format } from "date-fns";

function RenderReminder ({item,removeReminder})
{

  return(
  <View>
    <View style={[styles.reminder, {backgroundColor: item.Color}]}>
      <View style={styles.indicator}></View>
      <View style={{flex: 1,justifyContent:'space-around'}}>
        <Text style={styles.reminderTitle}>{item.Title}</Text>
        <View style={styles.reminderInfo}>
          <Image
            source={require('@/assets/icons/clockicon.png')}
            resizeMode="contain"
          />
          <Text style={styles.reminderDate}>Due: {format(item.Date,'dd MMM yyyy')}</Text>
          <Text>{format(item.Date,'hh:mm a')}</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignSelf:'center',marginRight:5}}
        onPress={()=>removeReminder(item._id)}
      >
        <Image
          source={require('@/assets/icons/delete.png')}
          style={{resizeMode: 'contain'}}
        />
      </TouchableOpacity>
    </View>
  </View>
)};

const ReminderList = ({reminders,removeReminder}) => {
  return (
    <FlatList
      data={reminders}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <RenderReminder item={item} removeReminder={removeReminder} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  reminder: {
    marginTop: 15,
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
    alignItems:'center',
    height: 30,
    width:210,
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#0000000D',
    opacity: 5,
  },
  reminderDate:
  {
    marginRight:5,
    marginLeft:5,
    fontSize: 14,
    fontWeight: '500'
  },
});

export default ReminderList;
