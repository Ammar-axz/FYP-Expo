import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Tabs } from "expo-router";
import Logo from "@/assets/images/logo.svg";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const SplashLayout = () => {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: { display: "none" },
        // Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: 'absolute',
        //   },
        //   default: {},
        // }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Splash",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="OnboardingItem"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTitle: () => (
            <>
              <View style={{ flexDirection: "row" }}>
                <Logo width={36} height={38} />
                <Text
                  style={{ fontSize: 27, fontWeight: "bold", color: "#fff" }}
                >
                  IlmPro
                </Text>
              </View>
            </>
          ),

          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Onboarding2"
        options={{
          title: "Onboarding2",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default SplashLayout;
