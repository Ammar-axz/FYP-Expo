import React from "react";
import { Stack } from "expo-router";
import { BackButton } from "@/components/BackButton";
import { Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchIcon from "@/assets/icons/search.svg";
import { userData } from '@/Context/UserContext';
import { API } from "@/api";

const ChatStck = () => {
  const {loggedInUserPfp } = userData()


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
            <Image source={{uri:`${API.BASE_URL}/Images/ProfilePictures/${loggedInUserPfp}`}} />
          ),
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        options={({ route,navigation }) => ({
          headerShown: true,
          headerTitle: route.params?.ContactName || 'Chat',
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
              <Image 
                source={loggedInUserPfp?{uri:`${API.BASE_URL}/Images/ProfilePictures/${loggedInUserPfp}`}:require("@/assets/icons/user-pic.png")}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
};

export default ChatStck;
