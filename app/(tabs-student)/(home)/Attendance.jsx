import { Picker } from "@react-native-picker/picker";
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { userData } from "@/Context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import {API} from "@/api"


const StudentListComp = ({ attendanceItem }) => {
  return (
    <View style={styles.listItem}>
        <Text style={styles.listItemText}>{attendanceItem.Day}</Text>
        <Text style={styles.listItemText}>{new Date(attendanceItem.Date).toDateString()}</Text>
        <Text style={attendanceItem.Status? styles.presentText : styles.absentText}>{attendanceItem.Status? "Present" : "Absent"}</Text>
    </View>
  );
};


const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-12')
  const {loggedInUserId,loggedInUserRole,loggedInUserClasses} = userData()
  const today = new Date()
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  const [attendance,setAttendance] = useState([])
  const [stats,setStats] = useState(
  {
    Conducted : 0,
    Attended : 0,
    Percentage : 0
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
        class_id:selectedClass.Class_id,
        student_id:loggedInUserId
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
    setStats({
      Conducted:totalClasses,
      Attended:presentCleasses,
      Percentage:percentage
    })

  }

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          {loggedInUserClasses.map((item, index) => (
            <Picker.Item key={index} label={item.Class_Name} value={item} />
          ))}
        </Picker>
      </View>

      {/* Attendance Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Conducted</Text>
          <Text style={styles.statValue}>{stats.Conducted}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Attended</Text>
          <Text style={styles.statValue}>{stats.Attended}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Percentage</Text>
          <Text style={styles.statValue}>{stats.Percentage ? stats.Percentage : 0 }%</Text>
        </View>
      </View>
      <View style={{ flex: 1 ,marginTop:10}}>
        {attendance.length === 0 || !attendance ? 
          <Text style={{fontSize:18,textAlign:"center"}}>no records available</Text>:
          <FlatList
            data={attendance}
            keyExtractor={(item) => (item._id)}
            renderItem={({ item }) => <StudentListComp attendanceItem={item} />}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "rgba(247,247,247,255)",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statBox: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 21,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10
  },
  statValue: {
    fontSize: 24,
    fontWeight: '500',
    color: '#000',
  },
  statLabel: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500'
  },
  statChange: {
    fontSize: 12,
    color: '#121212',
    fontWeight: '500',
    marginTop: 5,
  },
  listItem: {
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    height: 70,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  listItemText: {
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: 500,
  },
  presentText: {
    color:"green",
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  absentText: {
    color:"red",
    fontSize: 18,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  // monthNav: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 10,
  //   marginTop: 20,
  //   backgroundColor: '#000',
  //   borderRadius: 10,
  // },
  monthText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // navButton: {
  //   fontSize: 20,
  //   color: '#fff',
  // },
});

export default Attendance;
