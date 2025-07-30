import { StyleSheet, Text, View } from 'react-native';

const TimeTableItem = ({ startTime, endTime, courseText, groupName }) => {
  return (
    <View style={styles.TTContainer}>
      <View style={styles.TTDates}>
        <Text style={styles.TTStartTimeTxt}>{startTime}</Text>
        <Text style={styles.TTEndTimeTxt}>{endTime}</Text>
      </View>
      <View style={styles.TTCourse}>
        <Text style={styles.TTCourseTxt}>{courseText}</Text>
        <Text>{groupName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TTContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(237,247,240,255)",
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 10,
  },
  TTDates: {
    height: 80,
    flexDirection: "column",
    justifyContent: "center",
    borderRightWidth: 3,
    borderRightColor: "rgba(225,235,228,255)",
    paddingRight: 20,
  },
  TTCourse: {
    marginLeft: 20,
    justifyContent: "center",
  },
  TTStartTimeTxt: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#36B295",
  },
  TTEndTimeTxt: {
    fontSize: 16,
    fontWeight: "normal",
    color: "rgba(0, 0, 0, 0.50)",
  },
  TTCourseTxt: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default TimeTableItem;
