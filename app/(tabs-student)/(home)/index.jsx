import Progress from '@/components/Home/Progress';
import QuickAccess from '@/components/Home/QuickAccess';
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { API } from '@/api';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = () => {
  const {loggedInUser,loggedInUserPfp,loggedInUserId,loggedInUserRole,loggedInUserClasses,setLoggedInUserClasses} = userData()
    const [quizes,setQuizes] = useState([])
    let incQuizes = []
  
    useEffect(()=>{
      getClasses()
    },[])
  
    useEffect(()=>{
      if (loggedInUserClasses.length > 0) {
        getQuizes()
      }
    },[loggedInUserClasses])
    
    async function getClasses()
    {
      try
      {
        let userData = { user_id : loggedInUserId , role : loggedInUserRole }
        const classData = await axios.post(`${API.BASE_URL}/api/getClasses`,userData)
        setLoggedInUserClasses(classData.data)        
      }
      catch(e)
      {
        console.log(e)
      }
    }
    async function getQuizes()
    {
      try
      {        
        let id = {user_id: loggedInUserId , class_id : loggedInUserClasses, role : loggedInUserRole}
        let Quizes = await axios.post(`${API.BASE_URL}/api/getQuizes`,id)
        
        Quizes.data.map((i)=>{
          if(i.completed > 0)
          {
            incQuizes.push(i)
          }
        })
        setQuizes(incQuizes)
      }
      catch(e)
      {
        console.log(e)
      }
    }

  return (
    <>
    <ScrollView style={{backgroundColor:'white'}}>
      <ImageBackground
        style={styles.wrapper}
        source={require('@/assets/images/Bg.png')}
        resizeMode="cover">
        {/* Header Section */}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Assalamualaikum,</Text>
            <Text style={styles.name}>{loggedInUser} 👋</Text>
          </View>

          <View style={styles.iconsContainer}>
            <TouchableOpacity
              style={styles.bellButton}
              onPress={() => alert('Notifications Pressed')}>
              <Image
                source={require('@/assets/icons/bell.png')}
                resizeMode="contain"
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>

            <Image
              source={require('@/assets/icons/user-pic.png')}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Progress List */}
        <View style={styles.progressContainer}>
          <FlatList
            data={quizes}
            keyExtractor={item => item.quiz._id}
            renderItem={({item}) => (
              <Progress quiz={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Schedule Notification */}
        <View style={styles.schedule}>
          <TouchableOpacity
            style={styles.scheduleBtn}
            onPress={() => alert('Schedule Pressed')}>
            <View style={styles.clockIcon}>
              <Image
                source={require('@/assets/icons/clock.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.scheduleText}>
              You have scheduled for reading Saba’q
            </Text>
            <Image
              source={require('@/assets/icons/arrow.png')}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <QuickAccess />
      </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(15,65,56,1)',
  },
  container: {
    marginTop:25,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    color: '#B0C4B1',
    fontSize: 14,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  arrowIcon: {
    marginTop: 5,
  },
});

export default Home;
