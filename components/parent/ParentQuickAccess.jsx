import { router } from "expo-router";
import React , { useEffect, useState }from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewAll from "@/components/Home/ViewAll";
import TimeTableItem from "@/components/TimeTableItem";
import { userData } from '@/Context/UserContext';
import axios from "axios";
import { API } from "@/api";
import AttendanceIcon from '@/assets/icons/attendance.svg';
import QuizIcon from '@/assets/icons/Group.svg';

const ParentQuickAccess = () => {
 const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const dayName = days[today.getDay()];
  const {loggedInUserId,loggedInUserRole,loggedInUserChild} = userData()
  const [schedule, setSchedule] = useState([])

  async function getSchedule()
    {
      try
      {
        let userData = 
        {
          user_id : loggedInUserChild,
          role : "Student"
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
    <>
      <View style={styles.main}>
        {/* <ViewAll title="Quick Access" PageLink="Courses" /> */}
        <Text style={{fontSize:20,fontWeight:'bold'}}>Quick Access</Text>
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              router.push("Attendance");
            }}
            style={styles.innerBox}
          >
            <AttendanceIcon height={35} width={35} />
            <Text style={styles.boxTitle}> Attendance </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerBox}
            onPress={() => {
              router.navigate("Timetable");
            }}
          >
            <Image style={{height:35,width:35}} source={require("@/assets/icons/Schedule.png")} />

            <Text style={styles.boxTitle}> Schedule </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerBox}
            onPress={() => {
              router.navigate("QuizParent");
            }}
          >
            <QuizIcon height={35} width={35} />

            <Text style={styles.boxTitle}> Quizes </Text>
          </TouchableOpacity>
          
        </View>
        <ViewAll title="Schedule" PageLink="(tabs-parent)/(home-parent)/Timetable"/>
                    
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "transparent",
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  innerBox: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    borderRadius: 8,
    padding: 9,
    height: 80,
    width: 109,
    marginHorizontal: 10,
    marginVertical: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  SubTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "#2B3032",
    fontWeight: "600",
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
  boxTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B3032',
    marginTop: 10
  }
});

export default ParentQuickAccess;
