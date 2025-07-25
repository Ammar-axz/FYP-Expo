import { userData } from '@/Context/UserContext';
import { API } from '@/api';
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from '@react-navigation/native';
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
      let data = {class_id : selectedClass._id}
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
              <Picker.Item key={index} label={item.Class} value={item} />
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
        <View style={styles.newQuizContainer}>
          <TouchableOpacity style={styles.newQuiz} 
            onPress={()=>{
              router.push({
              pathname: 'CreateExam',
              params: {
                Class: encodeURIComponent(JSON.stringify({Class:selectedClass})), // ← Encode it!
              }
              })
            }}>
              
            <Text style={styles.newQuizText} >+</Text>
          </TouchableOpacity>
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
  headerImg:{
      position:'absolute'
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop:10
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:2
  },
  bellButton: {
    backgroundColor: '#3C7060',
    padding: 15,
    borderRadius: 100,
  },
  notificationDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  progressContainer: {
    flexDirection: 'row',
  },
  schedule: {
    backgroundColor: '#0F2823',
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scheduleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clockIcon: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 7,
  },
  scheduleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
    marginLeft: 10,
  },
  // arrowIcon: {
  //   marginTop: 5,
  // },
  latestQuiz:{
    flex:1,
  },
  card: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth:1,
    borderColor:'rgba(0, 0, 0, 0.15)',
    padding: 10,
    borderRadius: 15,
    marginHorizontal: '5%',
    marginVertical: '1.5%',
    height: 80,
  },
  title: {
    color:'rgb(53, 53, 53)',
    fontSize: 19,
    fontWeight: '500',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  ltQuizHeadContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:'5%',
    marginBottom:10
  },
  ltQuizHead:{
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgb(25, 25, 25)'
  },
  ltQuizIcon:{
    width:50,
    height:50,
    borderRadius:25
  },
  textView:{
    width:'70%',
    marginLeft:'3%',
    marginRight:'-4%'
  },
  questions:{
    color:'rgb(133, 133, 133)'
  },
  coinContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'70%',
    maxWidth:'24%',
    borderRadius:25,
    backgroundColor:'rgb(226, 226, 226)',
  },
  coinText:{
    fontSize:18,
    fontWeight:'bold',
    marginLeft:'13%'
  },
  coinImage:{
    height:30,
    width:30
  },
  coinImageWrapper:{
    backgroundColor:'rgba(54,178,149,1)',
    borderRadius:25,
    padding:3
  },
  newQuizContainer:{
    alignItems:'flex-end'
  },
  newQuiz:{
    backgroundColor:'#36b295',
    height:70,
    width:70,
    margin:20,
    borderRadius:100
  },
  newQuizText:{
    color:'white',
    fontSize:50,
    fontWeight:'300',
    textAlign:'center'
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