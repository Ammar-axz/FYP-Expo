import { BackButton } from "@/components/BackButton";
import { Stack } from "expo-router";
import React from "react";

const CourseStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: "index",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "white", elevation: 0 },
        })}
      />
      <Stack.Screen
  name="AddSchedule"
  options={({ route, navigation }) => ({
    headerShown: true,
    headerTitle: route.params?.course?.title || "Add Schedule",
    headerLeft: () => <BackButton navigation={navigation} />,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: "#fff" },
  })}
/>

    </Stack>
  );
};

export default CourseStack;
