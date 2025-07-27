import { userData } from '@/Context/UserContext';
import { API } from '@/api';
import { Picker } from "@react-native-picker/picker";
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';


const QuizCard = ({ exam }) => {
  return (
    <View style={styles.item}>
      <View style={{ flexDirection: "column", gap: 5 ,width:'30%'}}>
        <Text style={styles.month}>{format(new Date (exam.Date),"EEEE")}</Text>
        <Text style={styles.day}>{format(new Date (exam.Date),"MMM dd yyyy")}</Text>
      </View>
      <View style={styles.uploadContainer}>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={styles.title}>{exam.Title}</Text>
          <Text style={styles.marks}>Total Marks : {exam.Total_Marks}</Text>
        </View>
      </View>
    </View>
  );
};


const Exam = () => {
  const {loggedInUserId,loggedInUserRole,loggedInUserClasses} = userData()
  const [exams,setExams] = useState([])
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  
  useEffect(()=>{
    getExams()
  },[selectedClass])
  
  async function getExams()
  {
    try
    {      
      let data = {class_id : selectedClass.Class_id}
      
      let Exams = await axios.post(`${API.BASE_URL}/api/getExams`,data)
      
      setExams(Exams.data)
    }
    catch(e)
    {
      console.log(e)
    }
        
  }
  
  return (
    <>
    <View style={styles.mainContainer}>
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedClass}
            onValueChange={(itemValue) => setSelectedClass(itemValue)}
            style={styles.picker}
          >
            {loggedInUserClasses.map((item, index) => (
              <Picker.Item key={index} label={item.Class_Name} value={item} />
            ))}
          </Picker>
        </View>
        <View style={styles.latestQuiz}>
            <FlatList
            data={exams}
            keyExtractor={item => item._id}
            renderItem={({item})=>( <QuizCard exam={item} /> )}
            />
        </View>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white'
  },
  wrapper: {
    minHeight:100,
    backgroundColor: 'white',
  },
  container: {
    padding: 16,
    marginTop:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerContainer: {
    width: "90%",
    alignSelf:'center',
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 20,
    marginTop:20,
    backgroundColor: "rgba(247,247,247,255)",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  // arrowIcon: {
  //   marginTop: 5,
  // },
  latestQuiz:{
    flex:1,
  },
  title: {
    color:'rgb(53, 53, 53)',
    fontSize: 19,
    fontWeight: '500',
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
});

export default Exam