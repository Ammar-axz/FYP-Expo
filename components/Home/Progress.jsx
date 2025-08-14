import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { router } from "expo-router";

export default function Progress({ quiz }) {
  const progressValue =
    quiz.quiz.T_Questions > 0
      ? (quiz.completed / quiz.quiz.T_Questions) * 100
      : 0;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = quiz.quiz.Due_Date.substring(0, 4);
  let month = Number(quiz.quiz.Due_Date.substring(5, 7));
  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={()=>{router.navigate('QuizDetails', {course:quiz})}}
      onPress={() => {
        router.push({
          pathname: "QuizDetails",
          params: {
            course: encodeURIComponent(JSON.stringify(quiz)), // ← Encode it!
          },
        });
      }}
    >
      {/* <View style={styles.container}> */}
      <ImageBackground
        style={styles.cardImg}
        source={require("../../assets/images/QuizCardDesign.png")}
        resizeMode="cover"
      >
        <ImageBackground
          style={styles.cardHighlight}
          source={require("../../assets/images/QuizCardHighlight.png")}
          resizeMode="cover"
        ></ImageBackground>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.card}>
            <Text style={styles.title}>{quiz.quiz.Title}</Text>
            <Text style={styles.questions}>
              Questions – {quiz.quiz.T_Questions}
            </Text>
            <View style={styles.dueContainer}>
              <Text style={styles.dueText}>
                ⏰ Due: {months[month] + " " + year}
              </Text>
            </View>
          </View>
          <Image
            source={require("../../assets/images/Preview.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.progressWrapper}>
          <ProgressBar
            progress={progressValue / 100}
            color={"rgb(30, 112, 68)"}
            style={styles.progressBar}
          />
          <View style={styles.progressTextBox}>
            <Text
              style={[styles.percentageText, { left: `${progressValue}%` }]}
            >
              {progressValue}%
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: "rgba(54,178,112,255)",
    width: Dimensions.get("window").width - 40,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    marginBottom: 25,
    marginTop: 5,
  },

  card: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  cardImg: {
    padding: 20,
    width: 360,
  },
  cardHighlight: {
    position: "absolute",
    height: 70,
    width: "106%",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    lineHeight: 31,
  },
  questions: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.8,
    fontWeight: "500",
  },
  dueContainer: {
    backgroundColor: "rgba(49,152,98,255)",
    padding: 7,
    width: 171,
    borderRadius: 30,
    marginTop: 5,
  },
  dueText: {
    fontSize: 14,
    color: "#ffffff",
  },
  image: {
    resizeMode: "contain",
    width: 121,
    height: 100,
    marginLeft: 10,
  },
  progressWrapper: {
    marginTop: 10,
    position: "relative",
    // borderWidth:1,
    // borderColor:'black'
  },
  progressTextBox: {
    position: "absolute",
    width: "90%",
    height: "100%",
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  percentageText: {
    fontSize: 12,
    position: "absolute",
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    top: -5,
    // left: 55,
    backgroundColor: "#FFFFFF",
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
});
