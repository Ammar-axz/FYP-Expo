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

const Tab = createMaterialTopTabNavigator();

// Sample data for Exam and Sabaq
const examData = [
  { id: "1", month: "Feb", day: "Mon 12", title: "Sabaq (سبق)", marks: "0 / 20 Marks" },
  { id: "2", month: "Feb", day: "Tue 13", title: "Manzil (منزل)", marks: "15 / 20 Marks" },
  { id: "3", month: "Feb", day: "Wed 14", title: "Sabaqi (سباقی)", marks: "18 / 20 Marks" },
];

const sabaqData = [
  { id: "1", month: "Mar", day: "Thu 21", title: "Sabaq (سبق)", marks: "10 / 20 Marks" },
  { id: "2", month: "Mar", day: "Fri 22", title: "Sabaqi (سباقی)", marks: "16 / 20 Marks" },
];

// Tab Screens
function Exam() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.marks}>{item.marks}</Text>
      </View>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={examData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function Sabaq() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.marks}>{item.marks}</Text>
      </View>
      
    </View>
  );

  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={sabaqData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function Attendance() {
  return (
    <View style={styles.tabScreen}>
      <Text>📊 Attendance Tab</Text>
    </View>
  );
}

// Main Content with Profile and Tabs
export default function MainScreen() {
  return (
    <View style={{ flex: 1 }}>
      <SecondScreen />
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "#000",
          tabBarActiveTintColor: "#36B295",
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarIndicatorStyle: { backgroundColor: "#36B295" },
        }}
      >
        <Tab.Screen name="Exam" component={Exam} />
        <Tab.Screen name="Sabaq" component={Sabaq} />
        <Tab.Screen name="Attendance" component={Attendance} />
      </Tab.Navigator>
    </View>
  );
}

// Header/Profile Section
function SecondScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/icons/user-pic.png")}
        style={{ width: 80, height: 80, marginBottom: 10 }}
      />
      <Text style={styles.heading}>Fahad Khalique</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>74%</Text>
          <Text style={styles.statLabel}>Average Attendance</Text>
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


// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  heading: {
    color: "#121212",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 10,
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
    padding: 20,
    alignItems: "center",
    width: "45%",
  },
  statValue: {
    fontWeight: "600",
    fontSize: 22,
  },
  statLabel: {
    fontWeight: "500",
    fontSize: 12,
    color: "rgba(43, 48, 50, 0.5)",
    textAlign: "center",
    marginTop: 5,
  },
  overview: {
    fontWeight: "700",
    fontSize: 20,
    color: "#2B3032",
    marginTop: 20,
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