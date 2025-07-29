import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Card from './Card';
import CourseData from './CourseData';
import ViewAll from './ViewAll';
import TimeTableItem from "@/components/TimeTableItem";
import { userData } from '@/Context/UserContext';
import axios from "axios";
import { API } from "@/api";



const QuickAccess = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const dayName = days[today.getDay()];
  const {loggedInUserId,loggedInUserRole} = userData()
  const [schedule, setSchedule] = useState([])
  
  async function getSchedule()
    {
      try
      {
        let userData = 
        {
          user_id : loggedInUserId,
          role : loggedInUserRole
        }
        const schedule = await axios.post(`${API.BASE_URL}/api/getSchedule`,userData)
        setSchedule(schedule.data)
      }
      catch(e)
      {
        console.log(e)      
      }
    }
  
    useEffect(() => {
      getSchedule()
    }, [])
  
    const filteredSchedule = schedule.filter((item) => item.Day === dayName);
  
  return (
    <View style={styles.main}>
      <ViewAll title='Quick Access' PageLink='Courses' />
      <View style={styles.box}>
        <TouchableOpacity onPress={()=>{router.push('Reminder')}} style={styles.innerBox}>
          <Image source={require('@/assets/icons/clock1.png')} />
          <Text style={styles.SubTitle}> Reminder </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('Attendance')}}>
          <Image style={{height:35,width:35}} source={require('@/assets/icons/Attendance2.png')} />
          <Text style={styles.SubTitle} > Attendance </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('Timetable')}}>
          <Image source={require('@/assets/icons/Schedule.png')} />
          <Text style={styles.SubTitle}> Schedule </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.box}>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('QuranHadith')}}>
          <Image source={require('@/assets/icons/dua.png')} />
          <Text style={styles.SubTitle} > Books </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox} onPress={()=>{router.navigate('DuaDhikr')}}>
          <Image source={require('@/assets/icons/dua.png')} />
          <Text style={styles.SubTitle} > Duas </Text>
        </TouchableOpacity>
      </View> */}
      <ViewAll title="Schedule" PageLink="(tabs-student)/(home)/Timetable"/>
            
        <View style={styles.headingContainer}>
          <Text style={styles.DayHeading}>Today</Text>
          <Text style={styles.DayHeading2}>{dayName}</Text>
        </View>
        {
          filteredSchedule.length == 0 ?
          (<Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            No Classes Today.
          </Text>):
          filteredSchedule.map((item)=>{
              return(
              <TimeTableItem
                key={item._id}
                startTime={item.Start_Time}
                endTime={item.End_Time}
                courseText={item.Class_Name.split(" - ")[0]}
                groupName={item.Class_Name}
              />)
          })
        }
      {/* <View style={styles.courseList}>
       <ScrollView>
       <FlatList
        data={CourseData}
        renderItem={({ item }) => <Card title={item.title} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        scrollEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        />
       </ScrollView>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
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
  headingContainer:{
    flexDirection:'row'
  },
  DayHeading: {
    fontSize: 16,
    marginVertical: 5,
    marginRight: 10,
    color: "black",
    fontWeight: "700",
  },
  DayHeading2: {
    fontSize: 16,
    marginVertical: 5,
    marginRight: 10,
    color: "gray",
    fontWeight: "700",
  },
});

export default QuickAccess;
