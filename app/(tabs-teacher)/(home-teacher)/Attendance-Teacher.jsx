import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { API } from "@/api";
import { format } from 'date-fns';
import { userData } from "@/Context/UserContext";
import axios from "axios";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SwitchToggle from "react-native-switch-toggle";

const StudentListComp = ({ student, attendanceMarking , setAttendanceMarking }) => {

  const [status,setStatus] = useState(false)

  const updateAttendanceStatus = (studentId, newStatus) => {
    setAttendanceMarking((prev) =>
      prev.map((student) =>
        student.Student_id === studentId
          ? { ...student, Status: newStatus }
          : student
      )
    );
  };


  return (
    <View style={styles.listItem}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        {/* <Image source={require('@/assets/icons/LatestQuizIcon.png')} style={styles.ltQuizIcon}/> */}
        <View style={styles.avatar}>
          <Text>{student.Name.charAt(0)}</Text>
        </View>
        <Text style={styles.listItemText}>{student.Name}</Text>
      </View>
      <SwitchToggle
        switchOn={status}
        onPress={() => {
          const newStatus = !status;
          setStatus(newStatus);
          updateAttendanceStatus(student.Student_id, newStatus);
        }}
        backgroundColorOn="rgba(89,201,86,255)"
        backgroundColorOff="rgba(230,230,230,255)"
        circleColorOn="white"
        circleColorOff="white"
        containerStyle={{
          paddingRight: 55,
          width: 60,
          height: 32,
          borderRadius: 25,
          padding: 5,
        }}
        circleStyle={{
          width: 25,
          height: 25,
          borderRadius: 20,
        }}
      />
    </View>
  );
};

const Attendance = () => {
  const {loggedInUserId,loggedInUserRole,loggedInUserClasses} = userData()
  const today = new Date();
  const [month, setMonth] = useState(format(today, 'MM'));
  const [year, setYear] = useState(format(today, 'yyyy'));
  const [selectedDay, setSelectedDay] = useState(format(today, 'EEEE'));
  const [selectedDate, setSelectedDate] = useState();
  const [schedule, setSchedule] = useState([])
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  const [attendance,setAttendance] = useState([])
  const [students,setStudents] = useState([])
  const [attendanceMarking,setAttendanceMarking] = useState([])
  const [days,setDays] = useState([])
  const attendanceMarkingTemplate = {
    Student_id : "",
    Student_Name : "",
    Status : false
  }
  let lengthOfDays
  let tempDays = []
  
  Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
  };

  
  useEffect(() => {
    getSchedule()
  }, [selectedClass])

  

  function setupAttendanceMarking(studentsData)
  {
    const initialAttendance = studentsData.map((i)=>(
    {
      Student_id : i._id,
      Student_Name : i.Name,
      Status : false
    }
  ))
  setAttendanceMarking(initialAttendance)
  console.log(initialAttendance);
  
  }
  
  async function getSchedule()
  {
    try
    {
      let scheduleData = 
      {
        class_id : selectedClass
      }
      const schedules = await axios.post(`${API.BASE_URL}/api/getScheduleForAttendance`,scheduleData)
      setSchedule(schedules.data)
      
      const day = format(today, 'EEEE');
      let indexOfDay
      schedules.data.map((i,index)=>{
        if(i.Day == day)
        {
          indexOfDay = index
        }
      })
      lengthOfDays = schedules.data.length

      tempDays.push(indexOfDay)
      let i 
      for(i=1 ; i <= lengthOfDays ; i++)
      {
        tempDays.push((indexOfDay-i).mod(lengthOfDays))
      }
      tempDays.reverse()
      setDays(tempDays)
      
    }
    catch(e)
    {
      console.log(e)      
    }
  }

  async function getAttendance()
  {
    try
    {
      const attendanceData = {
        class_id:selectedClass,
        date:selectedDate
      }
      const attendanceResp = await axios.post(`${API.BASE_URL}/api/getAttendance`,attendanceData)
      if(attendanceResp.data.marked == true)
      {
        setAttendance(attendanceResp.data.attendanceData)
      }
      else
      {
        setStudents(attendanceResp.data.studentsData)
        setupAttendanceMarking(attendanceResp.data.studentsData)
      }
    }
    catch(e)
    {
      console.log(e)      
    }
  }
  

  const attendanceData = [
    {
      id: "0",
      name: "Qari Fahad",
      date: "2024-12-01",
      marked: false,
      status: "Absent",
    },
    {
      id: "1",
      name: "Qari Ehtisham",
      date: "2024-12-08",
      marked: true,
      status: "Present",
    },
    {
      id: "2",
      name: "Qari Allama Fahad",
      date: "2024-12-10",
      marked: true,
      status: "Present",
    },
    {
      id: "3",
      name: "Qari Fahad",
      date: "2024-12-18",
      marked: false,
      status: "Absent",
    },
    {
      id: "4",
      name: "Qari Fahad",
      date: "2024-12-26",
      marked: true,
      status: "Present",
    },
    {
      id: "5",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: false,
      status: "Absent",
    },
    {
      id: "6",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: false,
      status: "Absent",
    },
    {
      id: "7",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: false,
      status: "Absent",
    },
    {
      id: "8",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: true,
      status: "Present",
    },
    {
      id: "9",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: true,
      status: "Present",
    },
    {
      id: "10",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: false,
      status: "Absent",
    },
    {
      id: "11",
      name: "Qari Fahad",
      date: "2024-12-27",
      marked: true,
      status: "Present",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          {loggedInUserClasses.map((item, index) => (
            <Picker.Item key={index} label={item.Class} value={item._id} />
          ))}
        </Picker>
      </View>

      <View style={[styles.DateContainer, { marginBottom: 10 }]}>
        <TouchableOpacity style={styles.ArrowButton}>
          <Image
            style={styles.DateArrow}
            source={require("@/assets/icons/DateLeftArrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.DateMonth}>
          <Text style={styles.DateMonthText}>{month + " " + year}</Text>
        </View>
        <TouchableOpacity style={styles.ArrowButton}>
          <Image
            style={styles.DateArrow}
            source={require("@/assets/icons/DateRightArrow.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.DateContainer}>
        <TouchableOpacity style={styles.ArrowButton}>
          <Image style={styles.DateArrow} source={require('@/assets/icons/DateLeftArrow.png')}></Image>
        </TouchableOpacity>
        <View style={styles.DateMonth}>
          <Text style={styles.DateMonthText}>
            Week {week}
          </Text>
        </View>
        <TouchableOpacity style={styles.ArrowButton}>
          <Image style={styles.DateArrow} source={require('@/assets/icons/DateRightArrow.png')}></Image>
        </TouchableOpacity>
      </View> */}

      <View style={{ height: 120 }}>
        <ScrollView horizontal={true} style={styles.daysContainer}>
          {days.map((i) => (
            <TouchableOpacity
              key={schedule[i]._id}
              style={(() => {
                if (selectedDay == schedule[i].Day) {
                  return styles.daysBoxSelected;
                } else {
                  return styles.daysBoxUnselected;
                }
              })()}
              onPress={() => 
              {
                console.log(schedule[i].Day)
                setSelectedDay(schedule[i].Day)
                setSelectedDate(schedule[i].Date)
                getAttendance()
              }}
            >
              <Text
                style={(() => {
                  if (selectedDay == schedule[i].Day) {
                    return styles.daysLabelSelected;
                  } else {
                    return styles.daysLabelUnselected;
                  }
                })()}
              >
                {schedule[i].Day.substring(0,3)}
              </Text>
              <Text
                style={(() => {
                  if (selectedDay == i.no) {
                    return styles.daysValueSelected;
                  } else {
                    return styles.daysValueUnselected;
                  }
                })()}
              >
                {i.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={attendance}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <StudentListComp student={item} attendanceMarking={attendanceMarking} setAttendanceMarking={setAttendanceMarking}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  daysContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  daysBoxSelected: {
    flex: 1,
    height: 62,
    width: 62,
    justifyContent: "center",
    backgroundColor: "rgba(54,178,149,255)",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  daysBoxUnselected: {
    flex: 1,
    height: 62,
    width: 62,
    justifyContent: "center",
    backgroundColor: "rgba(242,242,242,255)",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 20,
  },
  daysValueSelected: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  daysLabelSelected: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
  },
  daysValueUnselected: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  daysLabelUnselected: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  statChange: {
    fontSize: 12,
    color: "#121212",
    fontWeight: "500",
    marginTop: 5,
  },
  monthText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
  label: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 17,
    marginVertical: 5,
  },
  DateContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
  ArrowButton: {
    justifyContent: "center",
  },
  DateArrow: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
  },
  DateMonth: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 100,
    textAlign: "center",
    width: 500,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  DateMonthText: {
    color: "white",
    fontSize: 16,
  },
  listItem: {
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    height: 80,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  listItemText: {
    fontSize: 20,
    marginLeft: 20,
    textAlignVertical: "center",
    fontWeight: "bold",
  },
  ltQuizIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatar: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Attendance;
