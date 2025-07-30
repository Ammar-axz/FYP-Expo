import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput
} from "react-native";
import axios from 'axios'
import {API} from '@/api'
import { useState,useEffect } from "react";
import { format } from "date-fns";
import { userData } from '@/Context/UserContext';


const RenderItem = ({ item, student_id }) => {
  const [marks,setMarks] = useState()
  const [text,setText] = useState("")
  const [showInput,setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(()=>{
    getExamMarks()
    
  },[])

  async function getExamMarks()
  {
    try
    {
      let examMarks = await axios.get(`${API.BASE_URL}/api/getStudentExamMarks`,
      {
      params:{
        student_id:student_id,
        exam_id:item._id
      } 
      })
      setMarks(examMarks.data.Obtained_Marks)
    }
    catch(e)
    {
      console.log(e)
    }
  }

  async function handleSubmit()
  {
    if (isSubmitting) 
    {
      return
    }
    else
    {
      setIsSubmitting(true)
      if(showInput == false)
      {
        setShowInput(true)
      }
      else
      {
        try
        {
          let data = {
            Student_id:student_id,
            Exam_id:item._id,
            Obtained_Marks:Number(text)
          } 
          let uploadMarks = await axios.post(`${API.BASE_URL}/api/uploadExamMarks`,data)
          // console.log(uploadMarks.data);
          
          setShowInput(false)
          getExamMarks()
        }
        catch(e)
        {
          console.log(e)
        }
      }
      setIsSubmitting(false)
    }
  }

  return(
  <View style={styles.item}>
    <View style={{ flexDirection: "column", gap: 5 ,width:'30%'}}>
      <Text style={styles.month}>{format(new Date (item.Date),"EEEE")}</Text>
      <Text style={styles.day}>{format(new Date (item.Date),"MMM dd yyyy")}</Text>
    </View>
    <View style={styles.uploadContainer}>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.marks}>{marks} / {item.Total_Marks}</Text>
      </View>
      <TouchableOpacity style={styles.uploadBtn}
        onPress={handleSubmit}
      >
        <Text style={styles.uploadText}>{showInput ? "Done" : marks ? "Edit" : "Upload"}</Text>
      </TouchableOpacity>
      {showInput?
      <View  style={styles.inputContainer}>
      <TextInput 
        style={styles.uploadInput}
        value={text}
        onChangeText={setText}
        placeholder="Enter Marks"
      />
      </View>
      : null}
    </View>
  </View>
)};

export default function Exam({studentData}) {
  const [exam,setExam] = useState([])
  
useEffect(()=>{
    getStudentExam()
},[])


 async function getStudentExam()
 {
    try
    {
      let data = {
        class_id:studentData.Class_id
      }
      let exams = await axios.post(`${API.BASE_URL}/api/getStudentExam`,data)
      setExam(exams.data)

    }
    catch(e)
    {
      console.log(e)
    }
 }

  return (
    <View style={styles.tabScreen}>
      <FlatList
        data={exam}
        renderItem={({ item }) => (
        <RenderItem item={item} student_id={studentData.student._id}  />
        )}
        keyExtractor={(item) => (item._id)}
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
  },
  inputContainer:{
    position:'absolute',
    width: '60%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },  
  uploadInput:{
    backgroundColor:'white',
    textAlign:'center',
    width:'100%',
    height: 47,
    fontSize:16,
    borderWidth: 1,
    borderColor: '#00000033',
    borderRadius: 30,
  },
})