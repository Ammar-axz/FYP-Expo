import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";


const sabaqData = [
  { id: "1", month: "Mar", day: "Thu 21", title: "Sabaq (سبق)", marks: "10 / 20 Marks" },
  { id: "2", month: "Mar", day: "Fri 22", title: "Sabaqi (سباقی)", marks: "16 / 20 Marks" },
];

export default function Sabaq() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 ,width:'22%'}}>
        <Text style={styles.month}>{item.month}</Text>
        <Text style={styles.day}>{item.day}</Text>
      </View>
      <View style={styles.uploadContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.marks}>{item.marks}</Text>
      </View>
      
    </View>
  );

  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={sabaqData}
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
    flexDirection: "column",
    gap: 5 ,
    flex:1,
    justifyContent:'space-between',
    borderLeftWidth:3,
    borderColor:'#eaebea',
    paddingLeft:15,
    padding:5
  }
})