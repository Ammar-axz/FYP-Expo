import Progress from '@/components/Home/Progress';
import QuickAccess from '@/components/Home/QuickAccess';
import { userData } from '@/Context/UserContext';
import React from 'react';
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

const DATA = [
  {id: '1', title: 'Item 1', image: 'https://via.placeholder.com/150'},
  {id: '2', title: 'Item 2', image: 'https://via.placeholder.com/150'},
  {id: '3', title: 'Item 3', image: 'https://via.placeholder.com/150'},
  {id: '4', title: 'Item 4', image: 'https://via.placeholder.com/150'},
];

const Home = () => {
  const {loggedInUser,loggedInUserPfp, loggedInUserId} = userData()
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
            data={DATA}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Progress title={item.title} image={item.image} />
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
