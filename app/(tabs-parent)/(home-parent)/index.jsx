import HomeNotification from "@/components/Home/HomeNotification";
import { userData } from "@/Context/UserContext";
import axios from "axios";
import { API } from "@/api";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Alert
} from "react-native";

import QuickAccess from "@/components/parent/ParentQuickAccess";
import Header from '@/components/Home/Header';


const Home = () => {
  const { loggedInUser,loggedInUserPfp,loggedInUserChild,setLoggedInUserClasses } = userData();

  useEffect(()=>{
    if(loggedInUserChild)
    getClasses()
  },[loggedInUserChild])

  async function getClasses() {
    try {
      let userData = { user_id: loggedInUserChild, role: "Student" };
      const classData = await axios.post(
        `${API.BASE_URL}/api/getClasses`,
        userData
      );
      setLoggedInUserClasses(classData.data);
    } catch (e) {
      console.log(e);
    }
  }
      console.log("image uri",loggedInUserPfp);
const handleBellPress = () => {
    Alert.alert('Notification', 'You pressed the bell icon!');
  };

  return (
    <>
      <ScrollView style={styles.mainContainer}>
        {/* <Image
          style={styles.headerImg}
          source={require("@/assets/images/QuizHeaderBG.png")}
          resizeMode="stretch"
        /> */}
        <ImageBackground
          style={styles.wrapper}
          source={require('@/assets/images/Bg.png')}
          resizeMode="cover">
        {/* Header Section */}
        {/* <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Assalamualaikum,</Text>
            <Text style={styles.name}>{loggedInUser} 👋</Text>
          </View>

          <View style={styles.iconsContainer}>
            <Image
              source={loggedInUserPfp?{uri:`${API.BASE_URL}/Images/ProfilePictures/${loggedInUserPfp}`}:require("@/assets/icons/user-pic.png")}
              style={styles.profileImage}
            />
          </View>
        </View> */}

         <Header
        name={loggedInUser}
        profileImage={loggedInUserPfp}
        onBellPress={handleBellPress}
          bellButtonStyle={{ backgroundColor: "#fff" }}

      />


        {/* Progress List */}
        {/* <View style={styles.progressContainer}>
          <HomeNotification />
        </View> */}
        <View style={styles.CardContainer}>
        <View style={styles.cardImg}>
          <ImageBackground
            style={styles.cardHighlight}
            source={require('@/assets/images/QuizCardHighlight.png')}
            resizeMode="stretch"
          />
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.card}>
              <Image
                source={require('@/assets/icons/home-noti.png')}
                style={styles.notiIcon}
              />
              <View style={{ flexDirection: 'column',bottom:3, flex: 1}}>
                <Text style={styles.title}>Welcome {loggedInUser} !</Text>
                <Text style={styles.subtitle}>Track your childs progress with just a few clicks</Text>
              </View>
            </View>
          </View>
        </View>
        </View>

        </ImageBackground>
        <QuickAccess />

        {/* <View style={{ paddingHorizontal: 20, backgroundColor: "white" }}>
        <ViewAll title="Schedule" PageLink='QuizParent' />
        </View> */}
        {/* <QuizesList/> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(15,65,56,1)',
    paddingBottom:10
  },
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
    color: "#B0C4B1",
    fontSize: 16,
  },
  name: {
    color: "white",
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
    borderRadius: 18,
    marginLeft: 10,
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
  CardContainer:{
    borderRadius: 12,
    backgroundColor: 'rgba(54,178,112,255)',
    width: '90%',
    height:120,
    alignSelf: 'center',
    marginVertical: 15,
  },
  cardImg: {
    padding: 15,
  },
  cardHighlight: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  notiIcon: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  card: {
    flex: 1,
    height:100,
    marginTop:20,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
    lineHeight: 20,
  },
});

export default Home;
