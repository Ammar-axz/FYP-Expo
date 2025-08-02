import ConfirmBtn from "@/components/ConfirmBtn";
import Heading from "@/components/Heading";
import RoleSelect from "@/components/RoleSelect";
import LogoComponent from "@/components/LogoComponent";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import gradientImage from "@/assets/images/gradient.png";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      router.navigate(`/(auth)/${selectedRole}Form`, { role: selectedRole });
    }
  };

  const roles = [
    {
      title: "Student",
      desc: "Access all your Saba’q and latest video based online courses to level in deen",
      icon: require("@/assets/icons/User.png"),
    },
    {
      title: "Teacher",
      desc: "Stay updated with essential alerts like check-in ",
      icon: require("@/assets/icons/Host.png"),
    },
    {
      title: "Parent",
      desc: "Stay up to date with your child progress and stays connected with Qari (Teacher)",
      icon: require("@/assets/icons/User.png"),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LogoComponent logoTitleStyle={{ color: "#000", fontSize: 27 }} />

        <View style={styles.headingBox}>
          <Heading heading="What are you looking to be?" />
        </View>

        {roles.map((role) => (
          <RoleSelect
            key={role.title}
            Role={role.title}
            imgSrc={role.icon}
            Desc={role.desc}
            onPress={() => handleRoleSelect(role.title)}
            isSelected={selectedRole === role.title}
            bgImage={gradientImage}
          />
        ))}

        <ConfirmBtn
          title="Continue"
          handlePress={handleConfirm}
          disabled={!selectedRole}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headingBox: {
    marginTop: 100,
    marginBottom: 0
  }
});
