import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import HeadderHeading from "@/components/Home/HeadderHeading";
import chatIcon from "@/assets/icons/message-chat-circle.svg";
import { useRouter } from "expo-router"; // 👈 import router

const index = () => {
  const router = useRouter(); // 👈 initialize router

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 16 }}>
      <HeadderHeading HeadTitle="Messages" />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#0000000A",
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Image
            source={chatIcon}
            style={{ width: 24, height: 24, resizeMode: "contain" }}
          />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 16, color: "#121212", fontWeight: "500", textAlign: 'center' }}>
            You don’t have any messages
          </Text>
          <Text style={{ fontSize: 14, color: "#12121280" }}>
            When you receive a message, it will appear here
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/ChatScreen")}>
          <Text style={{ color: "blue", fontSize: 16 }}>Next Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
