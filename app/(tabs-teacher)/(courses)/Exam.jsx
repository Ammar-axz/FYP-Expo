import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";


const examData = [
  { id: "1", month: "Feb", day: "Mon 12", title: "Sabaq (سبق)", marks: "0 / 20 Marks" },
  { id: "2", month: "Feb", day: "Tue 13", title: "Manzil (منزل)", marks: "15 / 20 Marks" },
  { id: "3", month: "Feb", day: "Wed 14", title: "Sabaqi (سباقی)", marks: "18 / 20 Marks" },
];

export default function Exam() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 ,width:'22%'}}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
      </View>
      <View style={styles.uploadContainer}>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.marks}>{item.marks}</Text>
        </View>
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={examData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabScreen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  month: {
    fontWeight: "600",
    fontSize: 16,
    color: "#36B295",
    textAlign:'center'
  },
  day: {
    fontWeight: "600",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.50)",
    textAlign:'center'
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000",
  },
  marks: {
    fontWeight: "600",
    fontSize: 16,
    color: "rgba(54, 178, 149, 0.50)",
  },
  uploadBtn: {
    backgroundColor: "#36B295",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  uploadText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
  },
  uploadContainer:
  {
    flexDirection:'row',
    alignItems:'center',
    flex:1,
    justifyContent:'space-between',
    borderLeftWidth:3,
    borderColor:'#eaebea',
    padding:5,
    paddingLeft:10
  }
})