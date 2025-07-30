import { Picker } from "@react-native-picker/picker";
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
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
      <View style={{ flexDirection: "column", gap: 5 ,marginRight:5 }}>
        <Text style={attendanceItem.Status ? styles.present : styles.absent }>{attendanceItem.Status? "Present" : "Absent"}</Text>
      </View>
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
          <Text style={styles.statValue}>{stats.Percentage ? stats.Percentage.toFixed(2) : 0 }%</Text>
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
    backgroundColor: "#f4f4f4",
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
    backgroundColor: "#f4f4f4",
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  day: {
    fontWeight: "600",
    fontSize: 18,
    // color: "#36B295",
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
