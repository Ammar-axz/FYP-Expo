import TimeTableItem from "@/components/TimeTableItem";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ViewAll from "./ViewAll";

const QuickAccessTeacher = () => {

  const schedule = [
    {
      id: "1",
      day: 0,
      startTime: "08:30 AM",
      endTime: "09:30 AM",
      courseText: "Surah Al-Baqarah, Ayah 183–186",
      groupName: "Hifz Group A",
    },
    {
      id: "2",
      day: 0,
      startTime: "09:45 AM",
      endTime: "10:45 AM",
      courseText: "Tajweed Rules Review",
      groupName: "Tajweed Group B",
    },
    {
      id: "3",
      day: 0,
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      courseText: "Arabic Grammar Basics",
      groupName: "Language Group",
    },]

  return (
    <View style={styles.main}>
      <ViewAll title="Quick Access" PageLink="Courses" />
      <View style={styles.box}>
        <TouchableOpacity
          onPress={() => {
            router.push("Reminder");
          }}
          style={styles.innerBox}
        >
          <Image source={require("@/assets/icons/clock1.png")} />
          <Text style={styles.SubTitle}> Classes </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerBox}
          onPress={() => {
            router.navigate("Attendance-Teacher");
          }}
        >
          <Image source={require("@/assets/icons/attendance.png")} />
          <Text style={styles.SubTitle}> Attendance </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.innerBox}
          onPress={() => {
            router.push("Timetable");
          }}>
          <Image source={require("@/assets/icons/task.png")} />
          <Text style={styles.SubTitle}> TimeTable </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.innerBox}
          onPress={() => {
            router.navigate("DuaDhikr");
          }}
        >
          <Image source={require("@/assets/icons/dua.png")} />
          <Text style={styles.SubTitle}> Dua Q&A </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.innerBox}
          onPress={() => {
            router.navigate("QuranHadith");
          }}
        >
          <Image source={require("@/assets/icons/book.png")} />
          <Text style={styles.SubTitle}> Books </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerBox}>
          <Image source={require("@/assets/icons/donate.png")} />
          <Text style={styles.SubTitle}> Donate </Text>
        </TouchableOpacity>
      </View>
      <ViewAll title="Schedule" PageLink="(home-teacher)/Timetable"/>
      
      <View style={styles.headingContainer}>
        <Text style={styles.DayHeading}>Today</Text>
        <Text style={styles.DayHeading2}>Tue, 23 may</Text>
      </View>

      <FlatList
        data={schedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimeTableItem
            startTime={item.startTime}
            endTime={item.endTime}
            courseText={item.courseText}
            groupName={item.groupName}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            No schedule for this day.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  box: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 10,
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
    fontSize: 14,
    color: "#2B3032",
    fontWeight: "600",
    lineHeight: 20,
  },
  courseList: {
    marginVertical: 20,
  },
  DayContainer: {
    flex: 1,
    flexDirection: "row",
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
  Days: {
    fontSize: 14,
    marginVertical: 5,
    color: "rgba(0, 0, 0, 0.50)",
    fontWeight: "700",
  },
  TTContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(237,247,240,255)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  TTDates: {
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    borderRightWidth: 3,
    borderRightColor: "rgba(225,235,228,255)",
    paddingRight: 20,
  },
  TTCourse: {
    marginLeft: 20,
    justifyContent: "center",
  },
  TTStartTimeTxt: {
    marginBottom: 10,
    fontWeight: "normal",
    fontSize: 14,
    color: "#36B295",
  },
  TTEndTimeTxt: {
    fontSize: 14,
    fontWeight: "normal",
    color: "rgba(0, 0, 0, 0.50)",
  },
  TTCourseTxt: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default QuickAccessTeacher;
