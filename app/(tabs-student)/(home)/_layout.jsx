import React from "react";
import { BackButton } from "@/components/BackButton";
import { Search } from "@/components/Search";
import { Stack } from "expo-router";


// Reusable header style to remove border/shadow
const cleanHeader = {
  backgroundColor: "#fff",
};

const HomeStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Stack.Screen name="index" />

      <Stack.Screen
        name="Attendance"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

      <Stack.Screen
        name="Reminder"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
          headerBackTitleVisible: false,

        })}
      />

      <Stack.Screen
        name="Timetable"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Exam"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Exams",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

        <Stack.Screen
        name="Courses"
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: "Courses",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

      <Stack.Screen
        name="Sabaq"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Sabaq",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

      <Stack.Screen
        name="DuaDhikr"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

      <Stack.Screen
        name="DuaDetail"
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: route.params?.dua?.title || "Dua Detail",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: () => <Search navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />
      

      <Stack.Screen
        name="QuranHadith"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />

      <Stack.Screen
        name="QuranDetail"
        options={({ route, navigation }) => ({
          headerShown: true,
          headerTitle: route.params?.quran?.title || "Quran Detail",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerRight: () => <Search navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: cleanHeader,
        })}
      />
    </Stack>
  );
};

export default HomeStack;
