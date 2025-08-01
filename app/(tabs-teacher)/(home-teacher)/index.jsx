import HomeNotification from "@/components/Home/HomeNotification";
import QuickAccessTeacher from "@/components/Home/QuickAccessTeacher";
import { userData } from "@/Context/UserContext";
import axios from "axios";
import { API } from "@/api";
import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
} from "react-native";
import Header from "@/components/Home/Header";

const Home = () => {
  const {
    loggedInUser,
    loggedInUserId,
    loggedInUserRole,
    loggedInUserPfp,
    setLoggedInUserClasses,
  } = userData();

  useEffect(() => {
    getClasses();
  }, [loggedInUserId, loggedInUserRole]);

  async function getClasses() {
    try {
      let userData = { user_id: loggedInUserId, role: loggedInUserRole };
      const classData = await axios.post(
        `${API.BASE_URL}/api/getClasses`,
        userData
      );
      setLoggedInUserClasses(classData.data);
    } catch (e) {
      console.log(e);
    }
  }
  // const handleBellPress = () => {
  //   Alert.alert("Notification", "You pressed the bell icon!");
  // };

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {/* <Image
          style={styles.headerImg}
          source={require("@/assets/images/QuizHeaderBG.png")}
          resizeMode="stretch"
        /> */}
        {/* <ImageBackground
          style={styles.wrapper}
          source={require('@/assets/images/Bg.png')}
          resizeMode="cover"> */}
        {/* Header Section */}

        <Header
          name={loggedInUser}
          profileImage={loggedInUserPfp}
          onBellPress={() => console.log("Bell pressed")}
          greetingStyle={{ color: "#00000080" }}
          nameStyle={{ color: "#000" }}
          bellButtonStyle={{ backgroundColor: "#fff" }}
          profileImageStyle={{ borderWidth: 2, borderColor: "#fff" }}
        />

        {/* Progress List */}
        <View style={styles.progressContainer}>
          <HomeNotification />
        </View>

        {/* </ImageBackground> */}
        <QuickAccessTeacher />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(15,65,56,1)",
    paddingBottom: 10,
  },
  mainContainer: {
    backgroundColor: "#d4eee0",
  },
  headerImg: {
    position: "absolute",
    height: 400,
  },
  // container: {
  //   marginTop: 25,
  //   padding: 16,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // textContainer: {
  //   flex: 1,
  // },
  // greeting: {
  //   color: "#B0C4B1",
  //   fontSize: 16,
  // },
  // name: {
  //   color: "white",
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  // iconsContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // notificationDot: {
  //   position: "absolute",
  //   top: -3,
  //   right: -3,
  //   width: 8,
  //   height: 8,
  //   backgroundColor: "red",
  //   borderRadius: 4,
  // },
  // profileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100,
  //   marginLeft: 10,
  //   marginRight:10,
  //   resizeMode: "contain",
  // },
  // bellButton: {
  //   borderRadius: 100,
  // },
  // topNotiIcon: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 100,
  //   resizeMode: "contain",
  // },
  progressContainer: {
    flexDirection: "row",
  },
  schedule: {
    backgroundColor: "#0F2823",
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scheduleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 7,
  },
  scheduleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    flex: 1,
    marginLeft: 10,
  },
  arrowIcon: {
    marginTop: 5,
  },
});

export default Home;
