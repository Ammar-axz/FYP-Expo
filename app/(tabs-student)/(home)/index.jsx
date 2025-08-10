import Progress from "@/components/Home/Progress";
import QuickAccess from "@/components/Home/QuickAccess";
import { userData } from "@/Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "@/api";
import { useIsFocused } from "@react-navigation/native";
import { format } from "date-fns";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Button,
  Alert,
} from "react-native";
import Header from "@/components/Home/Header";



const Home = () => {
  const {
    loggedInUser,
    loggedInUserPfp,
    loggedInUserId,
    loggedInUserRole,
    loggedInUserClasses,
    setLoggedInUserClasses,
    incQuizes,
    setIncQuizes,
  } = userData();
  // const [quizes,setQuizes] = useState([])
  const [reminder, setReminder] = useState();
  const [show, setShow] = useState(false);
  const isFocused = useIsFocused();
  let incQuizesData = [];


  const DATA = [
  {id: '1', title: 'Item 1', image: 'https://via.placeholder.com/150'},
  {id: '2', title: 'Item 2', image: 'https://via.placeholder.com/150'},
  {id: '3', title: 'Item 3', image: 'https://via.placeholder.com/150'},
  {id: '4', title: 'Item 4', image: 'https://via.placeholder.com/150'},
];

  useEffect(() => {
    getClasses();
  }, [loggedInUserRole, loggedInUserId]);

  useEffect(() => {
    if (isFocused) getReminder();
  }, [isFocused]);

  useEffect(() => {
    if (loggedInUserClasses.length > 0) {
      getQuizes();
    }
  }, [loggedInUserClasses]);

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

  async function getQuizes() {
    try {
      let id = {
        user_id: loggedInUserId,
        class_id: loggedInUserClasses,
        role: loggedInUserRole,
      };
      let Quizes = await axios.post(`${API.BASE_URL}/api/getQuizes`, id);

      Quizes.data.map((i) => {
        if (i.completed > 0 && i.quiz.T_Questions != i.completed) {
          incQuizesData.push(i);
        }
      });
      setIncQuizes(incQuizesData);
    } catch (e) {
      console.log(e);
    }
  }

  async function getReminder() {
    try {
      let reminders = [];
      let resp = await axios.get(`${API.BASE_URL}/api/getReminders`, {
        params: {
          user_id: loggedInUserId,
        },
      });
      reminders = resp.data;

      if (reminders.length == 0) {
        setReminder();
      }

      const today = new Date();
      let closestReminder = null;
      let minDiff = Infinity;

      reminders.forEach((reminder) => {
        const reminderDate = new Date(reminder.Date);
        if (reminderDate > today) {
          const diff = reminderDate - today;
          if (diff < minDiff) {
            minDiff = diff;
            closestReminder = reminder;
          }
        }
      });

      if (closestReminder) {
        setReminder(closestReminder);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleBellPress = () => {
    Alert.alert("Notification", "You pressed the bell icon!");
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "white" }}>
        <ImageBackground
          style={styles.wrapper}
          source={require("@/assets/images/Bg.png")}
          resizeMode="cover"
        >
          <Header
            name={loggedInUser}
            profileImage={loggedInUserPfp}
            onBellPress={handleBellPress}
            bellButtonStyle={{ backgroundColor: "#fff" }}
          />

          {/* Progress List */}
          <View style={styles.progressContainer}>
             <FlatList
              data={incQuizes}
              keyExtractor={(item) => item.quiz._id}
              renderItem={({ item }) => <Progress quiz={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            /> 
             
          </View>
{/* <FlatList
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Progress title={item.title} image={item.image} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          /> */}
          {/* Schedule Notification */}
          <View style={styles.schedule}>
            <TouchableOpacity
              style={styles.scheduleBtn}
              onPress={() => setShow(true)}
            >
              {/* <View style={styles.clockIcon}> */}
              <View style={{backgroundColor: '#29403b', borderRadius: 30, padding: 10}}>
                <Image
                source={require("@/assets/icons/clock2.png")}
                resizeMode="contain"
                style={{ height: 25, width: 25, tintColor: "#35b170" }}
              />
              </View>
              {/* </View> */}
              <Text style={styles.scheduleText}>
                {reminder ? reminder.Title : "No Upcoming Reminders"}
              </Text>
              <Image
                source={require("@/assets/icons/arrow.png")}
                resizeMode="contain"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>

            {reminder ? (
              <Modal style={styles.modal} visible={show} transparent={true}>
                <View style={styles.overlay}>
                  <View style={styles.dialog}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                      }}
                    >
                      Upcoming Reminder
                    </Text>
                    <Text style={{ fontSize: 20 }}>{reminder.Title}</Text>
                    <Text style={{ fontSize: 18 }}>
                      Date : {format(reminder.Date, "dd MMM yyyy")}
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                      Time : {format(reminder.Date, "hh:mm a")}
                    </Text>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#3dc29aff",
                        padding: 8,
                        borderRadius: 100,
                        marginTop: 10,
                      }}
                      onPress={() => setShow(false)}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        OK
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            ) : null}
          </View>
           
        </ImageBackground>
        <QuickAccess />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "rgba(15,65,56,1)",
  },
  // container: {
  //   marginTop:25,
  //   padding: 16,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  modal: {
    position: "absolute",
  },
  overlay: {
    height: "120%",
    width: "100%",
    backgroundColor: "#000000a8",
  },
  dialog: {
    top: "25%",
    backgroundColor: "white",
    padding: 20,
  },
  // textContainer: {
  //   flex: 1,
  // },
  // greeting: {
  //   color: '#B0C4B1',
  //   fontSize: 16,
  // },
  // name: {
  //   color: '#fff',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  // },
  // iconsContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // bellButton: {
  //   backgroundColor: '#3C7060',
  //   padding: 15,
  //   borderRadius: 100,
  // },
  // notificationDot: {
  //   position: 'absolute',
  //   top: -3,
  //   right: -3,
  //   width: 8,
  //   height: 8,
  //   backgroundColor: 'red',
  //   borderRadius: 4,
  // },
  // profileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 100,
  //   marginLeft: 10,
  //   resizeMode: 'contain',
  // },
  progressContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  schedule: {
    backgroundColor: "#0F2823",
    padding: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scheduleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockIcon: {
    // backgroundColor: '#fff',
    borderRadius: 30,
    padding: 7,
  },
  scheduleText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    flex: 1,
    marginLeft: 15,
  },
  arrowIcon: {
    marginTop: 5,
    height: 20,
    width: 20
  },
});

export default Home;
