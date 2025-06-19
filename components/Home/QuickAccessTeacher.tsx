import Timetable from '@/app/(tabs-teacher)/Timetable';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ViewAll from './ViewAll';



const QuickAccessTeacher = () => {
  
  
  return (
    <View style={styles.main}>
      <ViewAll title='Quick Access' PageLink='Courses' />
      <View style={styles.box}>
        <TouchableOpacity onPress={()=>{router.push('Reminder')}} style={styles.innerBox}>
          <Image source={require('@/assets/icons/clock1.png')} />
          <Text style={styles.SubTitle}> Classes </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('Attendance-Teacher')}}>
          <Image source={require('@/assets/icons/attendance.png')} />
          <Text style={styles.SubTitle} > Attendance </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <Image source={require('@/assets/icons/task.png')} />
          <Text style={styles.SubTitle}> Tasks </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('DuaDhikr')}}>
          <Image source={require('@/assets/icons/dua.png')} />
          <Text style={styles.SubTitle} > Dua Q&A </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('QuranHadith')}}>
          <Image source={require('@/assets/icons/book.png')} />
          <Text style={styles.SubTitle} > Books </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <Image source={require('@/assets/icons/donate.png')} />
          <Text style={styles.SubTitle}> Donate </Text>
        </TouchableOpacity>
      </View>
      <ViewAll title="Time Table" PageLink="Timetable" PageLink={Timetable} /> 
      
      <Text style={styles.DayHeading}>Today</Text>
      
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
      
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  innerBox: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    borderRadius: 8,
    padding: 9,
    height: 80,
    width: 109,
    marginHorizontal: 10,
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#2B3032',
    fontWeight: '600',
    lineHeight: 20,
  },
  courseList: {
    marginVertical: 20,
  },
  DayHeading:{
    fontSize:18,
    marginVertical:5
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

export default QuickAccessTeacher;
