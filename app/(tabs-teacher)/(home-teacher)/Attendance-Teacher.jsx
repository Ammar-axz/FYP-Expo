import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { API } from "@/api";
import { format,getDate } from 'date-fns';
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
import ReminderBtn from '@/components/ReminderBtn';

const StudentListComp = ({ student, setAttendanceMarking }) => {

  const [status,setStatus] = useState(student.Status)

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
          <Text style={{fontSize:20}}>{student.Student_Name.charAt(0)}</Text>
        </View>
        <Text style={styles.listItemText}>{student.Student_Name}</Text>
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
  
  const [schedule, setSchedule] = useState([])
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  const [attendanceMarking,setAttendanceMarking] = useState([])
  const [marked,setMarked] = useState(false)
  const attendanceMarkingTemplate = {
    Student_id : "",
    Student_Name : "",
    Status : false
  }
  const [attendanceDate,setAttendanceDate] = useState()
  const [day,setDay] = useState()
  const [selectedDay,setSelectedDay] = useState()
  const [days,setDays] = useState([])
  
  Number.prototype.mod = function (n) {
    "use strict";
    return ((this % n) + n) % n;
  };

  
  useEffect(() => {
    getSchedule()
    
  }, [selectedClass])

  useEffect(() => {
    if (attendanceDate) {
      getAttendance();
    }
  }, [attendanceDate]);

  // useEffect(()=> {
  //   if(selectedDay)
  //     calculateAttendanceDate(day,selectedDay)
  // },[selectedDay])

  function DaysToNumbers(day)
  {
    if(day == "Monday")
      return 1
    else if(day=="Tuesday")
      return 2
    else if(day=="Wednesday")
      return 3
    else if(day=="Thursday")
      return 4
    else if(day=="Friday")
      return 5
    else if(day=="Saturday")
      return 6
    else if(day=="Sunday")
      return 7
  }
  function NumbersToDays(day)
  {
    if(day == 1)
      return"Monday"
      
    else if(day== 2)
      return"Tuesday"
      
    else if(day== 3)
      return"Wednesday"
      
    else if(day== 4)
      return"Thursday"
      
    else if(day== 5)
      return"Friday"
      
    else if(day== 6)
      return"Saturday"
      
    else if(day== 7)
      return"Sunday"
      
  }

  function calculateDifference(num1,num2,change)
  {
    if(num1 == num2)
    {
      return 0
    }
    else
    {
      let difference = 0
      if(change == true )
      {
        num1 = num1-1
        num2 = num2-1
        for(let i =num1+6 ; i>=num1 ; i--)
        {
          difference = difference+1
          if(i.mod(7) == num2)
          {
            break
          }
        }
      }
      else
      {
        num2=num2-1
        for(let i =num1 ; i<=num1+6 ; i++)
        {
          difference = difference+1
          if(i.mod(7) == num2)
          {
            break
          }
        }
      }
      return difference
    }
  }

  function calculateAttendanceDate( currentDate , currentDay , calculateDay,change )
  {  
    
    let difference = calculateDifference(currentDay,calculateDay,change)

    let todayDate = new Date(currentDate)
    todayDate.setHours(0, 0, 0, 0);
    
    let newDate
    if(change == true )
    {
      newDate = new Date(todayDate.setDate(todayDate.getDate() - difference))
    }
    else
    {
      newDate = new Date(todayDate.setDate(todayDate.getDate() + difference))
    }
    
    setAttendanceDate(newDate)

  }

  function changeDay(change)
  {
    let calculateDay
    if(change)
    {     
      calculateDay = days.indexOf(selectedDay)
      calculateDay = (calculateDay - 1).mod(days.length)
      setSelectedDay(days[calculateDay])
      calculateAttendanceDate(attendanceDate, selectedDay,days[calculateDay],change)
    }
    else
    {
      calculateDay = days.indexOf(selectedDay)
      calculateDay = (calculateDay + 1).mod(days.length)
      
      let difference = calculateDifference(selectedDay,days[calculateDay],change)

      let todayDate = new Date(attendanceDate)
      todayDate.setHours(0, 0, 0, 0);
      let newDate = new Date(todayDate.setDate(todayDate.getDate() + difference))

      
      if(newDate <= new Date(today))
      {
        setSelectedDay(days[calculateDay])
        calculateAttendanceDate(attendanceDate, selectedDay,days[calculateDay],change)
      }

    } 
  }

  function setupAttendanceMarking(studentsData)
  {        

    const initialAttendance = studentsData.map((i)=>(
    {
      Student_id : i._id,
      Student_Name : i.Name,
      Status : false,
      Class_id:selectedClass._id,
      Day:NumbersToDays(selectedDay),
      Date:attendanceDate
    }
  ))
  setAttendanceMarking(initialAttendance)
  
  }
  
  async function getSchedule()
  {
    try
    {
      let scheduleData = 
      {
        class_id : selectedClass._id
      }
      const schedules = await axios.post(`${API.BASE_URL}/api/getScheduleForAttendance`,scheduleData)
      setSchedule(schedules.data)    
      
      let tempday = format(today, 'EEEE');

      setDay(DaysToNumbers(tempday))
      tempday = DaysToNumbers(tempday)
      let tempdays = []

      let tempSelectedDay
      schedules.data.map((i,index)=>{
        if(DaysToNumbers(i.Day) <= tempday)
        {
          tempSelectedDay = DaysToNumbers(i.Day)
          setSelectedDay(DaysToNumbers(i.Day))
        }
        tempdays.push(DaysToNumbers(i.Day))  
        setDays(tempdays)
      })
      calculateAttendanceDate(today,tempday,tempSelectedDay,true)
      
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
        class_id:selectedClass._id,
        date:attendanceDate
      }
      const attendanceResp = await axios.post(`${API.BASE_URL}/api/getAttendance`,attendanceData)
      setMarked(attendanceResp.data.marked)

      if(attendanceResp.data.marked == true)
      {
        // setAttendance(attendanceResp.data.attendanceData)
        setAttendanceMarking(attendanceResp.data.attendanceData)
      }
      else
      {
        // setStudents(attendanceResp.data.studentsData)
        setupAttendanceMarking(attendanceResp.data.studentsData)
      }
    }
    catch(e)
    {
      console.log(e)      
    }
  }

  async function saveAttendance()
  {
    let Data = 
    {
      marked:marked,
      attendanceData:attendanceMarking
    }
    
    try
    {
      let resp = await axios.post(`${API.BASE_URL}/api/setAttendance`,Data)
    }
    catch(e)
    {
      console.log(e)
    }

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
            <Picker.Item key={index} label={item.Class} value={item} />
          ))}
        </Picker>
      </View>

      <View style={[styles.DateContainer, { marginBottom: 10 }]}>
        <TouchableOpacity style={styles.ArrowButton}
          onPress={()=>changeDay(true)}
        >          
          <Image
            style={styles.DateArrow}
            source={require("@/assets/icons/DateLeftArrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.DateMonth}>
          <Text style={styles.DateMonthText}>{attendanceDate ? attendanceDate.toDateString() : null }</Text>
        </View>
        <TouchableOpacity style={styles.ArrowButton}
          onPress={()=>changeDay(false)}
        >
          <Image
            style={styles.DateArrow}
            source={require("@/assets/icons/DateRightArrow.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={attendanceMarking}
          keyExtractor={(item) => (
            item._id == null ? item.Student_id : item._id
          )}
          renderItem={({ item }) => <StudentListComp student={item} setAttendanceMarking={setAttendanceMarking}/>}
        />
        <ReminderBtn btnTitle={marked? "Update" : "Save"} handleAddReminder={saveAttendance} />
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
    fontWeight: 500,
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