import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Exam from './Exam'
import Sabaq from './Sabaq'
import {API} from '@/api'
import { useEffect } from 'react';
import axios from 'axios'

function ClassDetails() {
    const {Class} = useLocalSearchParams()
    const selectedClass = JSON.parse(decodeURIComponent(Class));
    const [active, setActive] = useState('Exam')
    const [teacher,setTeacher] = useState('')

    const handleOnPress = (item)=>{
    setActive(item)
    }

    useEffect(()=>{
      getTeacherfromClass()
    },[])

    async function getTeacherfromClass()
    {
      let teacher = await axios.get(`${API.BASE_URL}/api/getTeacherfromClass`,
        {
          params:{
            Class_id: selectedClass.Class_id
          }
        })
        
      teacher = await axios.get(`${API.BASE_URL}/api/getUser`,
        {
          params:{
            User: teacher.data.Teacher_id
          }
        })
        setTeacher(teacher.data)

    }

    return (
    <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image
            // source={require("@/assets/icons/user-pic.png")}
            source={{uri:`${API.BASE_URL}/Images/ProfilePictures/${teacher.pfp}`}}
            style={styles.prof_pic}
          />
          <Text style={styles.heading}>Qari {teacher.Name}</Text>
        </View>

        <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButtons} onPress={()=>handleOnPress('Exam')}>
            <Text style={active === 'Exam' ? styles.tabButtonTextActive : styles.tabButtonText}>Exam</Text>
            {active === 'Exam' &&
            <View style={styles.underline}></View>
            }
            </TouchableOpacity>
        <TouchableOpacity style={styles.tabButtons} onPress={()=>handleOnPress('Sabaq')}>
            <Text style={active === 'Sabaq' ? styles.tabButtonTextActive : styles.tabButtonText}>Sabaq</Text>
            {active === 'Sabaq' &&
            <View style={styles.underline}></View>
            }
            </TouchableOpacity>
        </View>
        {active == "Exam" ?
            <Exam Class={selectedClass}/> :
            <Sabaq Class={selectedClass}/>
        }
    </View>
    );
}

export default ClassDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    color: "#3b3b3bff",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 10,
  },
  prof_pic:{
    width: 140,
    height: 140,
    marginTop:5,
    marginBottom: 5,
    borderRadius:100
  },
  searchContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:'2%',
    marginHorizontal:'2%'
  },
  input:{
    width:'80%',
    backgroundColor:'rgba(235, 235, 235, 0.7)',
    borderRadius:100,
    marginRight:'4%',
    padding:'3%',
    paddingHorizontal:'5%'
  },
  searchContainer2:{
    alignItems:'flex-end',
    backgroundColor:'rgba(235, 235, 235, 0.7)',
    padding:'2%',
    borderRadius:100
  },
  searchIcon:{
    // padding:15
    },
  tabContainer:{
    justifyContent:'space-evenly',
    flexDirection:'row',
    width:'100%',
    marginBottom:5
  },
  tabButtons:{
    // width:'100%',
    flex:1
  },
  tabButtonText:{
    color:'#616161ff',
    fontSize:20,
    fontWeight:'500',
    textAlign:'center',
    paddingVertical:'8%'
  },
  tabButtonTextActive:{
    color:'#36B295',
    fontSize:20,
    fontWeight:'500',
    textAlign:'center',
    paddingVertical:'8%'
  },
  underline:{
    borderBottomWidth:3,
    borderColor:'#36B295',
    marginBottom:5
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(235, 235, 235, 0.7)',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 70,
  },
  header: {
    fontSize: 26,
    fontWeight:'600',
    color: '#121212',
    marginVertical: 5,
    marginTop:0,
    marginHorizontal:'3%'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    marginBottom:10
  },
  title2: {
    fontSize: 18,
    flex: 1,
    marginBottom:10
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  }
)