import TimeTableItem from "@/components/TimeTableItem";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Timetable = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const schedule = [
    {
      id: "1",
      day: 0,
      startTime: "08:30 AM",
      endTime: "09:30 AM",
      courseText: "Surah Al-Baqarah, Ayah 183–186",
      groupName: "Hifz Group A",
    },
    {
      id: "2",
      day: 0,
      startTime: "09:45 AM",
      endTime: "10:45 AM",
      courseText: "Tajweed Rules Review",
      groupName: "Tajweed Group B",
    },
    {
      id: "3",
      day: 0,
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      courseText: "Arabic Grammar Basics",
      groupName: "Language Group",
    },
    {
      id: "4",
      day: 0,
      startTime: "08:30 AM",
      endTime: "09:30 AM",
      courseText: "Quran Recitation",
      groupName: "Hifz Group A",
    },
    {
      id: "5",
      day: 0,
      startTime: "08:30 AM",
      endTime: "09:30 AM",
      courseText: "Fiqh Essentials",
      groupName: "Taharat Group C",
    },
    {
      id: "6",
      day: 2,
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      courseText: "Hadith Study",
      groupName: "Hadith Group",
    },
    {
      id: "7",
      day: 3,
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      courseText: "Seerah of the Prophet",
      groupName: "History Group",
    },
    {
      id: "8",
      day: 4,
      startTime: "08:00 AM",
      endTime: "09:00 AM",
      courseText: "Morning Review Session",
      groupName: "All Groups",
    },
    {
      id: "9",
      day: 5,
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      courseText: "Tafseer Overview",
      groupName: "Advanced Group",
    },
    {
      id: "10",
      day: 6,
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      courseText: "General Knowledge",
      groupName: "Youth Group",
    },
  ];

  const days = [
    { no: 0, day: "MON", date: 24 },
    { no: 1, day: "TUE", date: 25 },
    { no: 2, day: "WED", date: 26 },
    { no: 3, day: "THU", date: 27 },
    { no: 4, day: "FRI", date: 28 },
    { no: 5, day: "SAT", date: 29 },
    { no: 6, day: "SUN", date: 30 },
  ];

  const filteredSchedule = schedule.filter((item) => item.day === selectedDay);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Schedule</Text>
      <Text style={styles.label2}>Select day to view timetable</Text>

{/* <TouchableOpacity
  style={{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#36B295",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 10,
  }}
  onPress={() => {
    router.navigate("./add-schedule");
  }}
> */}
  {/* <Image
    source={require('@/assets/icons/plus.png')} // make sure this path is correct
    style={{ width: 16, height: 16, marginRight: 6, tintColor: 'white' }}
  /> */}
  {/* <Text style={{ color: "white", fontWeight: "600" }}>Add New Schedule</Text>
</TouchableOpacity> */}


      <View style={{ height: 110 }}>
        <ScrollView horizontal style={styles.daysContainer}>
          {days.map((i) => (
            <TouchableOpacity
              key={i.no}
              style={
                selectedDay === i.no
                  ? styles.daysBoxSelected
                  : styles.daysBoxUnselected
              }
              onPress={() => setSelectedDay(i.no)}
            >
              <Text
                style={
                  selectedDay === i.no
                    ? styles.daysLabelSelected
                    : styles.daysLabelUnselected
                }
              >
                {i.day}
              </Text>
              <Text
                style={
                  selectedDay === i.no
                    ? styles.daysValueSelected
                    : styles.daysValueUnselected
                }
              >
                {i.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

<Text style={styles.DayHeading}>
  {`${days[selectedDay].day}, ${days[selectedDay].date} May`}
</Text>


      <FlatList
        data={filteredSchedule}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimeTableItem
            startTime={item.startTime}
            endTime={item.endTime}
            courseText={item.courseText}
            groupName={item.groupName}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            No schedule for this day.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  daysContainer: { flexDirection: "row" },
  daysBoxSelected: {
    height: 70,
    width: 70,
    justifyContent: "center",
    backgroundColor: "rgba(54,178,149,255)",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 20,
  },
  daysBoxUnselected: {
    height: 70,
    width: 70,
    justifyContent: "center",
    backgroundColor: "rgba(242,242,242,255)",
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 20,
  },
  daysValueSelected: { fontSize: 16, fontWeight: "bold", color: "white" },
  daysLabelSelected: { fontSize: 18, color: "white", fontWeight: "bold" },
  daysValueUnselected: { fontSize: 16, fontWeight: "bold", color: "#000" },
  daysLabelUnselected: { fontSize: 18, color: "#000", fontWeight: "bold" },
  label: { color: "#121212", fontSize: 28, fontWeight: "bold", marginTop: 60 },
  label2: { color: "grey", fontSize: 18, marginBottom: 5 },
  DayHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default Timetable;
