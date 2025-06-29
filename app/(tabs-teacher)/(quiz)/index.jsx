import { userData } from '@/Context/UserContext';
import { API_URL, WEB_API_URL } from "@env";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

let image = 'https://via.placeholder.com/150';
// const DATA = [
//   {id: '1', title: 'Item 1', image: 'https://via.placeholder.com/150'},
//   {id: '2', title: 'Item 2', image: 'https://via.placeholder.com/150'},
//   {id: '3', title: 'Item 3', image: 'https://via.placeholder.com/150'},
//   {id: '4', title: 'Item 4', image: 'https://via.placeholder.com/150'},
// ];
// const latestQuiz = [
//   {id: '1', title: 'Quiz 1', questions: '20'},
//   {id: '2', title: 'Quiz 2', questions: '20'},
//   {id: '3', title: 'Quiz 3', questions: '20'},
//   {id: '4', title: 'Quiz 4', questions: '20'},
// ];

const QuizCard = ({ quiz }) => {
  const percent = quiz.quiz.T_Questions > 0 
  ? (quiz.completed / quiz.quiz.T_Questions) * 100 
  : 0;
  return (
    <TouchableOpacity
      style={styles.card}
      // onPress={()=>{router.navigate('QuizDetails', {course:quiz})}}
      onPress={()=>{
        router.push({
        pathname: 'QuizDetails',
        params: {
          course: encodeURIComponent(JSON.stringify(quiz)), // ← Encode it!
        },
      })}}
      >
      <Image source={require('@/assets/icons/LatestQuizIcon.png')} style={styles.ltQuizIcon}/>
      <View style={styles.textView}>
        <Text style={styles.title}>{quiz.quiz.Title}</Text>
        <Text style={styles.questions}>{quiz.quiz.T_Questions} Questions</Text>
        <Text style={styles.questions}>DueDate : 20/5/2025</Text>
      </View>
    </TouchableOpacity>
  );
};


const Quiz = () => {
  const {loggedInUser,loggedInUserPoints,loggedInUserId} = userData()
  const [quizes,setQuizes] = useState([])
  const isFocused = useIsFocused()

  const baseURL =
    Platform.OS === 'android'
      ? API_URL
      : WEB_API_URL;

  useEffect(()=>{
    if(isFocused)
      getQuizes();
  },[isFocused])
  
  async function getQuizes()
  {
    let id = {user_id: loggedInUserId}
    let Quizes = await axios.post(`${baseURL}/api/getQuizes`,id)
    setQuizes(Quizes.data)
        
  }
  
  return (
    <>
    <View style={styles.mainContainer}>
      
      {/* <Image
              style={styles.headerImg}
              source={require('@/assets/images/QuizHeaderBG.png')}
              /> */}
        {/* Header Section */}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Quizes</Text>
          </View>

        </View>

        {/* Progress List */}
        {/* <View style={styles.progressContainer}>
          <FlatList
            data={quizes}
            keyExtractor={item => item.quiz._id}
            renderItem={({item}) => (
              <QuizProgressCard title={item.quiz.Title}  image={image}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
        <View style={styles.ltQuizHeadContainer}>
          <Text style={styles.ltQuizHead}>Previous Quizes</Text>
        </View>
        <View style={styles.latestQuiz}>
            <FlatList
            data={quizes}
            keyExtractor={item => item.quiz._id}
            renderItem={({item})=>( <QuizCard quiz={item} /> )}
            />
        </View>
        <View style={styles.newQuizContainer}>
          <TouchableOpacity style={styles.newQuiz} onPress={()=>{router.push('CreateQuizPg1')}}>
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
    backgroundColor:'black',
    height:70,
    width:70,
    margin:10,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  newQuizText:{
    color:'white',
    fontSize:50,
    fontWeight:'300',
    textAlign:'center'
  }
});

export default Quiz;
