import { Picker } from "@react-native-picker/picker";
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { userData } from "@/Context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import {API} from "@/api"
import { format } from "date-fns";


const StudentListComp = ({ attendanceItem }) => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.day}>{attendanceItem.Day}</Text>
        <Text style={styles.date}>{format(new Date(attendanceItem.Date).toDateString(),'dd MMMM yyyy')}</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={attendanceItem.Status ? styles.present : styles.absent }>{attendanceItem.Status? "Present" : "Absent"}</Text>
      </View>
    </View>
  );
};


const Attendance = ({studentData, setAttendancePercent}) => {
  const {loggedInUserId,loggedInUserRole,loggedInUserClasses} = userData()
  const today = new Date()
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  const [attendance,setAttendance] = useState([])
  const [stats,setStats] = useState(
    {
      Present: 0,
      Absent : 0
    })

  useEffect(()=>{
    getAttendance()
  },[selectedClass])

  useEffect(()=>{
    if(attendance)
    calculateStats()

  },[attendance])

  async function getAttendance()
  {
    try
    {
      const attendanceData = {
        class_id:studentData.Class_id,
        student_id:studentData.student._id
      }
      const attendanceResp = await axios.post(`${API.BASE_URL}/api/getStudentAttendance`,attendanceData)
      setAttendance(attendanceResp.data)
      console.log(attendanceResp.data)
    }
    catch(e)
    {
      console.log(e)      
    }
  }

  function calculateStats()
  {
    let totalClasses = attendance.length
    let presentCleasses = 0
    let percentage
    attendance.map((i)=>
    {
      i.Status ? presentCleasses++ : null
    })

    percentage = (presentCleasses/totalClasses)*100
    setAttendancePercent(percentage)
    setStats({
      Present:presentCleasses,
      Absent:totalClasses-presentCleasses
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.Present}</Text>
          <Text style={styles.statLabel}>Total Present</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.Absent}</Text>
          <Text style={styles.statLabel}>Total Absent</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {attendance.length === 0 || !attendance ? 
          <Text style={{fontSize:18,textAlign:"center"}}>no records available</Text>:
          attendance.map((item)=>{
            return(
              <StudentListComp key={item._id} attendanceItem={item} />
            ) 
          })
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width:'95%',
    marginBottom:10,
    alignSelf:'center',
    backgroundColor: "#f4f4f4",
    borderRadius: 21,
  },
  statBox: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '500',
    color: '#2b3032',
    marginBottom:5
  },
  statLabel: {
    fontSize: 18,
    color: '#8f9293',
    fontWeight: '500'
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    paddingHorizontal:20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  day: {
    fontWeight: "600",
    fontSize: 18,
    color: "#2b3032",
  },
  date: {
    fontWeight: "600",
    fontSize: 18,
    color: "rgba(0, 0, 0, 0.50)",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    color: "#000",
  },
  present: {
    fontWeight: "600",
    fontSize: 18,
    color: "#36B295",
  },
  absent: {
    fontWeight: "600",
    fontSize: 18,
    color: "#c02e2eff",
  }
});

export default Attendance;