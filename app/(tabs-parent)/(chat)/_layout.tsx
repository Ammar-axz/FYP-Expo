import React from "react";
import { Stack } from "expo-router";
import { BackButton } from "@/components/BackButton";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchIcon from "@/assets/icons/search.svg";

const ChatStck = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Chat",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
          },
          headerTitleStyle: {
            color: "#121212",
            fontWeight: 600,
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Search tapped")}
              style={{
                padding: 10,
                borderColor: "#00000026",
                borderWidth: 1,
                borderRadius: 30,
              }}
            >
              {" "}
              <Image source={SearchIcon} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Name",
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
          },
          headerTitleStyle: {
            color: "#121212",
            fontWeight: 600,
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Search tapped")}
              style={{
                padding: 10,
                borderColor: "#00000026",
                borderWidth: 1,
                borderRadius: 30,
              }}
            >
              {" "}
              <Image source={SearchIcon} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
};

export default ChatStck;
