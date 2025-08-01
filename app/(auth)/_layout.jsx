import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Tabs, useRouter } from "expo-router";
import LogoComponent from "@/components/LogoComponent";
import Arrow from "@/assets/icons/chevron-left.svg";

const AuthLayout = () => {
  const { role } = useLocalSearchParams();
  const router = useRouter();

  const initialScreen =
    role === "Student"
      ? "StudentForm"
      : role === "Teacher"
      ? "TeacherForm"
      : role === "Parent"
      ? "ParentForm"
      : "StudentForm";

  // try {
  //   router.back();
  // } catch {
  //   alert("No screen to go back to.");
  // }

  return (
    <View style={{ flex: 1 }}>
      {/* 🔼 Custom Header */}
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => router.back()}>
            <Arrow height={24} width={24} />
          </TouchableOpacity>
        </View>
        <LogoComponent
          logoTitleStyle={{ color: "#000", fontSize: 24 }}
          headerContainer={{ alignItems: "center" }}
        />
      </View>

      <Tabs
        initialRouteName={initialScreen}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="StudentForm" />
        <Tabs.Screen name="TeacherForm" />
        <Tabs.Screen name="ParentForm" />
      </Tabs>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: 42,
    zIndex: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    height: 36,
    width: 36,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
