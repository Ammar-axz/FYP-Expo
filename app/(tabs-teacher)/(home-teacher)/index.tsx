import HomeNotification from "@/components/Home/HomeNotification";
import QuickAccessTeacher from "@/components/Home/QuickAccessTeacher";
import { userData } from "@/Context/UserContext";
import axios from "axios";
import { API } from "@/api";
import React, { useState,useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


const Home = () => {
  const { loggedInUser,loggedInUserId,loggedInUserRole, loggedInUserPfp,setLoggedInUserClasses } = userData();
  
  useEffect(()=>{
    getClasses()
  },[loggedInUserId,loggedInUserRole])

  async function getClasses()
  {
    try
    {
      let userData = { user_id : loggedInUserId , role : loggedInUserRole }
      const classData = await axios.post(`${API.BASE_URL}/api/getClasses`,userData)
      setLoggedInUserClasses(classData.data)
    }
    catch(e)
    {
      console.log(e)
    }
  }

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        <Image
          style={styles.headerImg}
          source={require("@/assets/images/QuizHeaderBG.png")}
          resizeMode="stretch"
        />
        {/* Header Section */}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Assalamualaikum,</Text>
            <Text style={styles.name}>{loggedInUser} 👋</Text>
          </View>

          <View style={styles.iconsContainer}>
            {/* <TouchableOpacity
              style={styles.bellButton}
              onPress={() => alert("Notifications Pressed")}
            >
              <Image
                source={require("@/assets/icons/bell-white.png")}
                style={styles.topNotiIcon}
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity> */}

            <Image
              source={loggedInUserPfp?{uri:`${API.BASE_URL}/Images/ProfilePictures/${loggedInUserPfp}`}:require("@/assets/icons/user-pic.png")}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Progress List */}
        <View style={styles.progressContainer}>
          <HomeNotification />
        </View>

        <QuickAccessTeacher />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  headerImg: {
    position: "absolute",
    height: 400,
  },
  container: {
    marginTop: 25,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    color: "black",
    fontSize: 14,
  },
  name: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 10,
    marginRight:10,
    resizeMode: "contain",
  },
  bellButton: {
    borderRadius: 100,
  },
  topNotiIcon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    resizeMode: "contain",
  },
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
