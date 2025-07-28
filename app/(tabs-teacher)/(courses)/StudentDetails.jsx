import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from 'expo-router';
import Exam from './Exam'
import Sabaq from './Sabaq';
import Attendance from './Attendance'
import { useState,useEffect } from "react";
import axios from 'axios'
import {API} from '@/api'

const Tab = createMaterialTopTabNavigator();


// Main Content with Profile and Tabs
export default function StudentDetails() {

  const {studentData} = useLocalSearchParams()
  const StudentDetail = JSON.parse(decodeURIComponent(studentData))
  console.log(StudentDetail);
  
  const [attendancePercent,setAttendancePercent] = useState()
  

  return (
    <View style={{ flex: 1 }}>
      <SecondScreen studentDetail={StudentDetail} attendancePercent={attendancePercent}/>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "#000",
          tabBarActiveTintColor: "#36B295",
          tabBarLabelStyle: { fontSize: 18, fontWeight: '600' },
          tabBarIndicatorStyle: { backgroundColor: "#36B295" },
        }}
      >
        <Tab.Screen name="Exam" >
          {() => <Exam studentData={StudentDetail}/>}
        </Tab.Screen>
        <Tab.Screen name="Sabaq">
          {() => <Sabaq studentData={StudentDetail} />}
        </Tab.Screen>
        <Tab.Screen name="Attendance">
          {() => <Attendance studentData={StudentDetail} setAttendancePercent={setAttendancePercent}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}

// Header/Profile Section
function SecondScreen({studentDetail, attendancePercent}) {
  
  return (
    <View style={styles.container}>
      <Image
        // source={require("@/assets/icons/user-pic.png")}
        source={{uri:`${API.BASE_URL}/Images/ProfilePictures/${studentDetail.student.pfp}`}}
        style={styles.prof_pic}
      />
      <Text style={styles.heading}>{studentDetail.student.Name}</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{attendancePercent}%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>89%</Text>
          <Text style={styles.statLabel}>Test Score</Text>
        </View>
      </View>
      <Text style={styles.overview}>Overview</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  heading: {
    color: "#121212",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 5,
  },
  prof_pic:{
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius:100
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  statBox: {
    backgroundColor: "rgba(43, 48, 50, 0.05)",
    borderRadius: 16,
    padding: 10,
    // alignItems: "center",
    width: "45%",
  },
  statValue: {
    fontWeight: "600",
    fontSize: 22,
    marginLeft:10
  },
  statLabel: {
    fontWeight: "500",
    fontSize: 12,
    marginLeft:10,
    color: "rgba(43, 48, 50, 0.5)",
    // textAlign: "center",
    marginTop: 5,
  },
  overview: {
    fontWeight: "600",
    fontSize: 22,
    color: "#2B3032",
    marginTop: 20,
    marginLeft:30,
    alignSelf:'flex-start'
  },
  tabScreen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  month: {
    fontWeight: "600",
    fontSize: 14,
    color: "#36B295",
  },
  day: {
    fontWeight: "600",
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.50)",
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#000",
  },
  marks: {
    fontWeight: "600",
    fontSize: 14,
    color: "rgba(54, 178, 149, 0.50)",
  },
  uploadBtn: {
    backgroundColor: "#36B295",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  uploadText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fff",
  },
})