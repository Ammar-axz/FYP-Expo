import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "@react-native-picker/picker";

import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AddSchedule = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [showDate, setShowDate] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Class name</Text>
      <View style={styles.dropdown}>
        <RNPickerSelect
          placeholder={{ label: "Select Category", value: null }}
          onValueChange={(value) => setCategory(value)}
          items={[
            { label: "Hifz Group A", value: "Hifz Group A" },
            { label: "Tajweed Group B", value: "Tajweed Group B" },
            { label: "Fiqh Group C", value: "Fiqh Group C" },
          ]}
        />
      </View>

      <Text style={styles.label}>Date</Text>
      <TouchableOpacity
        style={styles.inputWithIcon}
        onPress={() => setShowDate(true)}
      >
        <Text style={styles.inputText}>
          {date.toDateString()}
        </Text>
        <Ionicons name="calendar-outline" size={20} />
      </TouchableOpacity>
      {showDate && (
<DateTimePicker
  value={date}
  mode="date"
  display={Platform.OS === 'android' ? 'default' : 'spinner'} // ✅ safe
/>


      )}

      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={styles.label}>Start time</Text>
          <TouchableOpacity
            style={styles.inputWithIcon}
            onPress={() => setShowStart(true)}
          >
            <Text style={styles.inputText}>
              {startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Ionicons name="calendar-outline" size={20} />
          </TouchableOpacity>
          {showStart && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={(e, selected) => {
                setShowStart(false);
                if (selected) setStartTime(selected);
              }}
            />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.label}>End time</Text>
          <TouchableOpacity
            style={styles.inputWithIcon}
            onPress={() => setShowEnd(true)}
          >
            <Text style={styles.inputText}>
              {endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
            <Ionicons name="calendar-outline" size={20} />
          </TouchableOpacity>
          {showEnd && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={(e, selected) => {
                setShowEnd(false);
                if (selected) setEndTime(selected);
              }}
            />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add new schedule</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 15,
    fontSize: 14,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 15 : 10,
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  inputWithIcon: {
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 15,
    color: "#000",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
