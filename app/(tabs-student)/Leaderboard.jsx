import { userData } from '@/Context/UserContext';
import { API } from '@/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const QuizCard = ({ course }) => {
return (
    <TouchableOpacity
    style={styles.card}
    // onPress={()=>{navigation.navigate('QuizDetails', {course:course})}}
    >
    <Image source = { course.pfp ?{uri:`${API.BASE_URL}/Images/ProfilePictures/${course.pfp}`}:require("@/assets/icons/user-pic.png")} 
    style={styles.ltQuizIcon}/>
    <View style={styles.textView}>
        <Text style={styles.title}>{course.Name}</Text>
        <Text style={styles.questions}>{course.Points} QP </Text>
    </View>
    </TouchableOpacity>
);
};


const Leaderboard = () => {
  const {loggedInUserPoints} = userData();
  const [users,setUsers] = useState([])
  const isFocused = useIsFocused()
  let index = 0

  useEffect(()=>{
    if(isFocused)
    getAllUsers();
  },[isFocused])

  async function getAllUsers()
  {
    try
    {
      console.log("Get users called")
      let usersData = await axios.get(`${API.BASE_URL}/api/getAllUsers`)
      
      let studentsOnly = usersData.data
          .filter(user => user.Role === 'Student')
          .sort((a, b) => b.Points - a.Points);
      console.log(studentsOnly);
      setUsers(studentsOnly)
    }
    catch(err)
    {
      console.log(err)     
    }
      
  }

  return (
    <View style={{flex:1,backgroundColor:'white'}}>
        <Image style={styles.headerImg} source={require('@/assets/images/QuizHeaderBG.png')}/>
        <View style={styles.headerContainer}>
            {/* <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <Image
                    source={require('@/assets/icons/left-arrow.png')}
                    style={styles.backArrow}
                />
            </TouchableOpacity> */}
            <View style={styles.progress}>
            <Text style={{fontSize:24,fontWeight:'bold'}}>Leaderboard</Text>
            </View>
            <View style={styles.coinContainer}>
                <Text style={styles.coinText}>{loggedInUserPoints}</Text>
                <View style={styles.coinImageWrapper}>
                    <Image style={styles.coinImage} source={require('@/assets/images/coins.png')}/>
                </View>
            </View>
        </View>
    <ScrollView style={styles.container}>


      {/* <View style={styles.yellowContainer}>
        <View style={styles.yellowContainer2}>
            <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Top 3 Students</Text>
        </View>
        <Text style={{fontSize:18,width:'80%',color:'white',fontWeight:'bold'}}>You are doing better than 60% of other players!</Text>
      </View> */}
      <View style={styles.imgContainer}>
        <Image 
        style={styles.rankImg} 
        source={require('@/assets/images/leaderboardRanks.png')}
        resizeMode='contain'
        />
      <View style={styles.ranks}>
        { users.length >= 3 &&
        <View style={styles.profContainer}>
            <View style={styles.profContainer2}>
                <Image
                style={[styles.rankProfPic,{borderColor:'#adadadff',borderWidth:4}]}
                source={ users[1].pfp ?{uri:`${API.BASE_URL}/Images/ProfilePictures/${users[1].pfp}`}:require("@/assets/icons/user-pic.png")} 
                resizeMode='contain'
                />
                <View style={styles.points}>
                    <Text style={styles.pointsTxt}>{users[1].Points}</Text>
                </View>
            </View>
            <View style={styles.profContainer3}>
                <Image
                style={[styles.rankProfPic,{borderColor:'#fac105ff',borderWidth:4}]}
                source={ users[0].pfp ?{uri:`${API.BASE_URL}/Images/ProfilePictures/${users[0].pfp}`}:require("@/assets/icons/user-pic.png")} 
                resizeMode='contain'
                />
                <View style={styles.points}>
                    <Text style={styles.pointsTxt}>{users[0].Points}</Text>
                </View>
            </View>
            <View style={styles.profContainer4}>
                <Image
                style={[styles.rankProfPic,{borderColor:'#CD7F32',borderWidth:4}]}
                source={ users[2].pfp ?{uri:`${API.BASE_URL}/Images/ProfilePictures/${users[2].pfp}`}:require("@/assets/icons/user-pic.png")} 
                resizeMode='contain'
                />
                <View style={styles.points}>
                    <Text style={styles.pointsTxt}>{users[2].Points}</Text>
                </View>
            </View>
        </View>
        }
        </View>

        <View style={styles.ltQuizHeadContainer}>
            <Text style={styles.ltQuizHead}>Leaderboard</Text>
        </View>
        <View style={styles.latestQuiz}>
        {users.map((item)=>
        {
          if(index < 100)
          {
            index++
            return (
              <View key={item._id}>
                <QuizCard course={item} />
              </View>
            )
          }
        })
        }
        </View>

      </View>
    </ScrollView>
    
    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
    container:{
        backgroundColor:'transparent',
        flex:1,
    },
    yellowContainer:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'rgba(237,208,107,1)',
        padding:'4%',
        alignItems:'center',
        marginHorizontal:'5%',
        marginVertical:'6%',
        borderRadius:20,
        zIndex:2
    },
    yellowContainer2:{
        backgroundColor:'rgba(255,155,87,1)',
        padding:'4%',
        marginRight:'4%',
        borderRadius:15
    },
    imgContainer:{
        alignItems:'center',
        paddingTop:'27%',
        zIndex:2,
    },
    ranks:{
        flex:1,
        position:'absolute',
        // height:'80%',
        width:'85%',
    },
    rankImg:{
        width:'80%',
        marginVertical:'-12%'
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:20,
        paddingTop:10,
        backgroundColor:'transparent',
        marginTop:30
    },
    profContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    profContainer2:{
        alignItems:'center',
        top:35
    },
    profContainer3:{
        alignItems:'center',
    },
    profContainer4:{
        alignItems:'center',
        top:65
    },
    rankProfPic:{
        width:80,
        height:80,
        borderRadius:100,
        overflow:'hidden'
    },
    points:{
        backgroundColor:'rgba(54,178,112,1)',
        padding:6,
        paddingHorizontal:18,
        borderRadius:5,
        marginTop:20,
    },
    pointsTxt:{
        color:'white',
        fontWeight:'bold'
    },
    progress:{
        flex:1,
        width:'110%',
        position:'absolute',
        alignItems:'center',
    },
    headerImg:{
        position:'absolute',
        width:'100%',
    },
    coinContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // height:'10%',
        // marginVertical:'2%',
        marginTop:'3%',
        maxWidth:'26%',
        borderRadius:25,
        backgroundColor:'rgb(226, 226, 226)'
      },
      coinText:{
        fontSize:18,
        fontWeight:'bold',
        marginLeft:'13%'
      },
      coinImage:{
        height:32,
        width:32
      },
      coinImageWrapper:{
        backgroundColor:'rgba(54,178,149,1)',
        borderRadius:25,
        padding:3
      },
      backButton: {
        padding: 15,
        marginVertical:15,
        backgroundColor: '#1212120D',
        borderRadius: 100,
      },
      backArrow: {
        tintColor: '#000',
        resizeMode: 'contain',
      },
      ltQuizHeadContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:'5%',
        marginBottom:10,
        marginTop:'-5%'
      },
      ltQuizHead:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'rgb(25, 25, 25)'
      },
      latestQuiz:{
        flex:1,
        width:'90%'
      },
      card: {
        width:'100%',
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.15)',
        padding: 10,
        borderRadius: 15,
        marginVertical: 5,
        height: 80,
      },
      ltQuizIcon:{
        width:50,
        height:50,
        borderRadius:25
      },
      textView:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'82%',
        marginLeft:'3%',
      },
      questions:{
        fontSize:20,
        color:'#36B295',
        fontWeight:'bold'
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
})