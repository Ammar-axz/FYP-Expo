import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState,useEffect } from 'react';
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import {API} from '@/api'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const StudentListComp = ({studentData}) => {
  const [student,setStudent] = useState()
  
    async function getStudent()
    {
      try
      {
        let Data = {
          student_id : studentData.Student_id
        }
        let student = await axios.post(`${API.BASE_URL}/api/getStudent`,Data)
        setStudent(student.data)
      }
      catch(e)
      {
        console.log(e)
      }
    }
  
    useEffect(() => {
      getStudent()
    }, [])

  if (!student) return null;

  return(
    <TouchableOpacity
      onPress={()=>{
      router.push({
      pathname: 'StudentDetails',
      params: {
        studentData: encodeURIComponent(JSON.stringify({student:student, Class_id : studentData.Class_id})),
      },
    })}}  
    >
      <View style={styles.listItem}>
        <View style={{flex:1, flexDirection:'row'}}>
          <Image source={require('@/assets/icons/LatestQuizIcon.png')} style={styles.ltQuizIcon}/>
          <Text style={styles.listItemText}>{student.Name}</Text>
        </View>
          <Image style={styles.DateArrow} source={require('@/assets/icons/DateRightArrow.png')}></Image>
      </View>
    </TouchableOpacity>
  )
}

const Courses = () => {
  const navigation = useNavigation(); 

  const {loggedInUserId,loggedInUserClasses} = userData()
  const [selectedClass, setSelectedClass] = useState(loggedInUserClasses[0])
  const [students,setStudents] = useState([])


  useEffect(()=>{
    getStudentsOfClass()
  },[selectedClass])

  async function getStudentsOfClass()
    {
      let Data = 
      {
        class_id:selectedClass
      }
      
      try
      {
        let resp = await axios.post(`${API.BASE_URL}/api/getStudentsOfClass`,Data)
        setStudents(resp.data)
      }
      catch(e)
      {
        console.log(e)
      }
  
    }

  return (
    <View style={styles.container}>
      
      <Text style={styles.mainHeading}>Courses</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedClass}
          onValueChange={(itemValue) => setSelectedClass(itemValue)}
          style={styles.picker}
        >
          {loggedInUserClasses.map((item, index) => (
            <Picker.Item key={index} label={item.Class} value={item._id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Students</Text>

      <View style={{flex:1}}>
        <FlatList
          data={students}
          keyExtractor={item => item._id}
          renderItem={({item})=>( <StudentListComp studentData={item} /> )}
          />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mainHeading:{
    fontSize:24,
    fontWeight:'500',
    textAlign:'center',
    marginTop:30
  },
    pickerContainer: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop:20,
    marginBottom: 20,
    backgroundColor: 'rgba(247,247,247,255)',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  listItem:{
    borderColor:'lightgrey',
    borderBottomWidth:1,
    height:80,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
  },
  listItemText:{
    fontSize:20,
    marginLeft:20,
    textAlignVertical:'center',
    fontWeight:'bold'
  },
  ltQuizIcon:{
    width:50,
    height:50,
    borderRadius:25,
  },
  DateArrow:{
    width:30,
    height:30,
    marginHorizontal:5
  },
  label: {
    marginLeft:5,
    color: '#000000',
    height:40,
    fontSize: 30,
    fontWeight: '500',
    marginBottom:10
  },
});

export default Courses;
