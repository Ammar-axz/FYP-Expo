import { API } from "@/api";
import TimeTableItem from "@/components/TimeTableItem";
import { userData } from '@/Context/UserContext';
import axios from "axios";
import { useEffect, useState } from "react";
import { BackButton } from '@/components/BackButton';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Timetable = () => {
  const {loggedInUserId,loggedInUserChild,loggedInUserRole} = userData()
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [schedule, setSchedule] = useState([])

  async function getSchedule()
  {
    try
    {
      let userData = 
      {
        user_id : loggedInUserChild,
        role : loggedInUserRole
      }
      const schedule = await axios.post(`${API.BASE_URL}/api/getSchedule`,userData)
      setSchedule(schedule.data)
    }
    catch(e)
    {
      console.log(e)      
    }
  }

  useEffect(() => {
    getSchedule()
  }, [])
  

  const days = [
    { no: 0, day: "MON", ac_day: "Monday"},
    { no: 1, day: "TUE", ac_day: "Tuesday"},
    { no: 2, day: "WED", ac_day: "Wednesday"},
    { no: 3, day: "THU", ac_day: "Thursday"},
    { no: 4, day: "FRI", ac_day: "Friday"},
    { no: 5, day: "SAT", ac_day: "Saturday"},
    { no: 6, day: "SUN", ac_day: "Sunday"},
  ];

  const filteredSchedule = schedule.filter((item) => item.Day === selectedDay);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:'center',marginTop:30,gap:15}}>
        <BackButton/>
        <View >
          <Text style={styles.label}>Schedule</Text>
        </View>
      </View>
      <Text style={styles.label2}>Select day to view timetable</Text>
      <View style={{ height: 110 }}>
        <ScrollView horizontal style={styles.daysContainer}>
          {days.map((i) => (
            <TouchableOpacity
              key={i.no}
              style={
                selectedDay === i.ac_day
                  ? styles.daysBoxSelected
                  : styles.daysBoxUnselected
              }
              onPress={() => setSelectedDay(i.ac_day)}
            >
              <Text
                style={
                  selectedDay === i.ac_day
                    ? styles.daysLabelSelected
                    : styles.daysLabelUnselected
                }
              >
                {i.day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredSchedule}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TimeTableItem
            startTime={item.Start_Time}
            endTime={item.End_Time}
            courseText={item.Class_Name.split(" - ")[0]}
            groupName={item.Class_Name}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "gray", marginTop: 20 }}>
            No Classes for this day.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    padding: 16, 
    backgroundColor: "#fff" 
  },
  daysContainer: 
  { 
    flexDirection: "row" 
  },
  daysBoxSelected: 
  {
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
  daysValueSelected: 
  { fontSize: 16, 
    fontWeight: "bold", 
    color: "white" 
  },
  daysLabelSelected: 
  { fontSize: 18, 
    color: "white", 
    fontWeight: "bold" 
  },
  daysValueUnselected: 
  { fontSize: 16, 
    fontWeight: "bold", 
    color: "#000" 
  },
  daysLabelUnselected: 
  { fontSize: 18, 
    color: "#000", 
    fontWeight: "bold" 
  },
  label: 
  { color: "#121212", 
    fontSize: 28, 
    fontWeight: "bold"
  },
  label2: { 
    color: "grey", 
    fontSize: 18,
     marginBottom: 5 
    },
  DayHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default Timetable;
