import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState(0)
  

  const days = [
    {no:0, day:'MON',date:24},
    {no:1, day:'TUE',date:25},
    {no:2, day:'WED',date:26},
    {no:3, day:'THU',date:27},
    {no:4, day:'FRI',date:28},
    {no:5, day:'SAT',date:29},
    {no:6, day:'SUN',date:30},
  ]

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Time Table</Text>
      <Text style={styles.label2}>Select day to view timetable</Text>

      <View style={{height:110}}>
      <ScrollView horizontal={true} style={styles.daysContainer}>
        {days.map((i)=> (
          
          <TouchableOpacity
            key={i.no}
            style = {(()=>{
              if(selectedDay == i.no)
              {
                return styles.daysBoxSelected
              }
              else 
              {
                return styles.daysBoxUnselected
              }
            }) () }
            onPress={()=>setSelectedDay(i.no)}>
              <Text style = {(()=>{
              if(selectedDay == i.no)
              {
                return styles.daysLabelSelected
              }
              else 
              {
                return styles.daysLabelUnselected
              }
            }) () }>{i.day}</Text>
              <Text style = {(()=>{
              if(selectedDay == i.no)
              {
                return styles.daysValueSelected
              }
              else 
              {
                return styles.daysValueUnselected
              }
            }) () }>{i.date}</Text>
            </TouchableOpacity>
        ))}
        
      </ScrollView>
      </View>

      <Text style={styles.DayHeading}>{days[selectedDay].day}</Text>

      <View style={styles.TTContainer}>
        <View style={styles.TTDates}>
          <Text style={styles.TTStartTimeTxt}>08:30 AM</Text>
          <Text style={styles.TTEndTimeTxt}>09:30 AM</Text>
        </View>
        <View style={styles.TTCourse}>
          <Text style={styles.TTCourseTxt}>Hifz Group 1</Text>
        </View>
      </View>
      <View style={styles.TTContainer}>
        <View style={styles.TTDates}>
          <Text style={styles.TTStartTimeTxt}>08:30 AM</Text>
          <Text style={styles.TTEndTimeTxt}>09:30 AM</Text>
        </View>
        <View style={styles.TTCourse}>
          <Text style={styles.TTCourseTxt}>Hifz Group 1</Text>
        </View>
      </View>
      <View style={styles.TTContainer}>
        <View style={styles.TTDates}>
          <Text style={styles.TTStartTimeTxt}>08:30 AM</Text>
          <Text style={styles.TTEndTimeTxt}>09:30 AM</Text>
        </View>
        <View style={styles.TTCourse}>
          <Text style={styles.TTCourseTxt}>Hifz Group 1</Text>
        </View>
      </View>
      {/* <View style={{flex:1}}>
        <FlatList
          data={attendanceData}
          keyExtractor={item => item.id}
          renderItem={({item})=>( <StudentListComp student={item} /> )}
          />
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  daysBoxSelected: {
    flex: 1,
    height: 70,
    width: 70,
    justifyContent: 'center',
    backgroundColor: 'rgba(54,178,149,255)',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  daysBoxUnselected: {
    flex: 1,
    height: 70,
    width: 70,
    justifyContent: 'center',
    backgroundColor: 'rgba(242,242,242,255)',
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 20,
  },
  daysValueSelected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  daysLabelSelected: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  daysValueUnselected: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  daysLabelUnselected: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  label: {
    color: '#000000',
    height:40,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop:60,
    // marginVertical: 15,
    // paddingVertical: 15,
  },
  label2: {
    color: 'grey',
    fontSize: 18,
    marginBottom:5,
  },
  listItem:{
    borderColor:'lightgrey',
    borderBottomWidth:1,
    height:80,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
  },
  listItemText:{
    fontSize:20,
    marginLeft:20,
    textAlignVertical:'center',
    fontWeight:'bold'
  },
  ltQuizIcon:{
    width:50,
    height:50,
    borderRadius:25,
  },
  DayHeading:{
    fontSize:20,
    fontWeight:'bold',
    marginLeft:10,
    marginBottom:5
  },
  TTContainer:{
    flexDirection:'row',
    backgroundColor:'rgba(237,247,240,255)',
    paddingHorizontal:15,
    paddingVertical:10,
    marginHorizontal:5,
    marginVertical:5,
    borderRadius:10,
  },
  TTDates:{
    height:80,
    flexDirection:'column',
    justifyContent:'center',
    borderRightWidth:3,
    borderRightColor:'rgba(225,235,228,255)',
    paddingRight:20,
  },
  TTCourse:{
    marginLeft:20,
    justifyContent:'center',
  },
  TTStartTimeTxt:{
    marginBottom:10,
    fontWeight:'bold',
    fontSize:18,
    color:'rgba(94,192,169,255)'
  },
  TTEndTimeTxt:{
    fontSize:18,
    fontWeight:'bold',
    color:'rgba(148,155,151,255)'
  },
  TTCourseTxt:{
    height:65,
    fontSize:20,
    fontWeight:'bold',
  }
});

export default Timetable;
