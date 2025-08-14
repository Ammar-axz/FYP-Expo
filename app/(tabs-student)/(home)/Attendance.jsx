import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { userData } from "@/Context/UserContext";
import axios from "axios";
import { API } from "@/api";
import { format } from "date-fns";

const StudentListComp = ({ attendanceItem }) => (
  <View style={styles.item}>
    <View style={{ flexDirection: "column", gap: 5 }}>
      <Text style={styles.day}>{attendanceItem.Day}</Text>
      <Text style={styles.date}>
        {format(new Date(attendanceItem.Date), 'dd MMM yyyy')}
      </Text>
    </View>
    <Text
      style={attendanceItem.Status ? styles.present : styles.absent}>
      {attendanceItem.Status ? "Present" : "Absent"}
    </Text>
  </View>
);

const Attendance = () => {
  const { loggedInUserId, loggedInUserClasses } = userData();
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0]);
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({ Conducted: 0, Attended: 0, Percentage: 0 });
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (selectedClass) getAttendance();
  }, [selectedClass]);

  useEffect(() => {
    if (attendance) {
      calculateStats();
      mapAttendanceToCalendar();
    }
  }, [attendance]);

  const getAttendance = async () => {
    try {
      const attendanceData = {
        class_id: selectedClass.Class_id,
        student_id: loggedInUserId
      };
      const response = await axios.post(`${API.BASE_URL}/api/getStudentAttendance`, attendanceData);
      setAttendance(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateStats = () => {
    const total = attendance.length;
    const attended = attendance.filter(item => item.Status).length;
    const percentage = total ? (attended / total) * 100 : 0;
    setStats({ Conducted: total, Attended: attended, Percentage: percentage });
  };

  const mapAttendanceToCalendar = () => {
    const mapped = {};
    attendance.forEach(item => {
      const date = format(new Date(item.Date), 'yyyy-MM-dd');
      mapped[date] = {
        marked: true,
        dotColor: item.Status ? '#36B295' : '#c02e2e',
        customStyles: {
          container: {
            backgroundColor: item.Status ? '#d7f5eb' : '#ffe5e5',
            borderRadius: 10
          },
          text: {
            color: '#000',
            fontWeight: 'bold'
          }
        }
      };
    });
    setMarkedDates(mapped);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          {loggedInUserClasses.map((item, idx) => (
            <Picker.Item key={idx} label={item.Class_Name} value={item} />
          ))}
        </Picker>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Conducted</Text>
          <Text style={styles.statValue}>{stats.Conducted}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Attended</Text>
          <Text style={styles.statValue}>{stats.Attended}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Percentage</Text>
          <Text style={styles.statValue}>{stats.Percentage.toFixed(1)}%</Text>
        </View>
      </View>

      {/* Calendar */}
      <Calendar
        markingType={'custom'}
        markedDates={markedDates}
        theme={{
          todayTextColor: '#36B295',
          arrowColor: '#000',
          dotColor: '#36B295',
          textDayFontWeight: '500',
          textDayFontSize: 14,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          backgroundColor: 'red'
        }}
      />

      {/* Attendance List */}
      {/* <View style={{ flex: 1, marginTop: 10 }}>
        {attendance.length === 0 ? (
          <Text style={{ fontSize: 16, textAlign: "center" }}>No attendance records</Text>
        ) : (
          <FlatList
            data={attendance}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <StudentListComp attendanceItem={item} />}
          />
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  pickerContainer: {
    width: "100%", height: 50, borderRadius: 30,
    justifyContent: "center", marginBottom: 10,
    backgroundColor: "#f4f4f4"
  },
  picker: { width: "100%", height: 50 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  statBox: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f4f4f4",
    borderRadius: 21,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 30,
    fontWeight: 'medium',
    color: '#000',
    marginTop: 5
  },
  statLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'medium'
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  day: {
    fontWeight: "600",
    fontSize: 16,
  },
  date: {
    fontWeight: "500",
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.5)",
  },
  present: {
    fontWeight: "600",
    fontSize: 16,
    color: "#36B295",
  },
  absent: {
    fontWeight: "600",
    fontSize: 16,
    color: "#c02e2eff",
  },
});

export default Attendance;
