import Courses from "@/app/(tabs-student)/(course)/index";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Card from "@/components/Home/Card";
import CourseData from "@/components/Home/CourseData";
import ViewAll from "@/components/Home/ViewAll";
import Quiz from "@/app/(tabs-parent)/(home-parent)/QuizParent";

const QuickAccess = () => {
  return (
    <>
      <View style={styles.main}>
        <ViewAll title="Quick Access" PageLink="Courses" />
        <View style={styles.box}>
          <TouchableOpacity
            onPress={() => {
              router.push("Attendance");
            }}
            style={styles.innerBox}
          >
            <Image source={require("@/assets/icons/clock1.png")} />
            <Text style={styles.SubTitle}> Attendance </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerBox}
            onPress={() => {
              router.navigate("Timetable");
            }}
          >
            <Image source={require("@/assets/icons/attendance.png")} />
            <Text style={styles.SubTitle}> Schedule </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerBox}
            onPress={() => {
              router.navigate("QuizParent");
            }}
          >
            <Image source={require("@/assets/icons/task.png")} />
            <Text style={styles.SubTitle}> Quizes </Text>
          </TouchableOpacity>
        </View>
        {/* <ViewAll title="Quiz results" PageLink="Courses" PageLink={Courses} /> */}
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
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
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
    // width: 109,
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
});

export default QuickAccess;
