import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const Progress = () => {
  const progressValue = 0.25;

  return (
    <View style= {styles.wrapper}>
    <View style={styles.container}>
      <View
      style={styles.cardImg}
      >
      <ImageBackground
      style={styles.cardHighlight}
      source={require('@/assets/images/QuizCardHighlight.png')}
      resizeMode="cover"
      ></ImageBackground>
        
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.card}>
          <Image
            source={require('@/assets/icons/home-noti.png')}
            style={styles.NotiIcon}
          />
          <Text style={styles.title}>Discover Quran Facts Quiz</Text>
        </View>
        
      </View>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    width:"100%"
  },
  container: {
    borderRadius: 12,
    backgroundColor: 'rgba(54,178,112,255)',
    width: "90%",
    height:100,
    alignSelf: 'center',
    marginVertical: 25
  },
  NotiIcon:{
    height:50,
    width:50,
    marginRight:10
  },
  card: {
    flex: 1,
    justifyContent:'flex-start' ,
    flexDirection:'row'
  },
  cardImg:{
    padding:15,
  },
  cardHighlight:{
    position:'absolute',
    height:70,
    width:'106%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 31,
  },
  questions: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
    fontWeight: '500',
  },
  dueContainer: {
    backgroundColor: 'rgba(49,152,98,255)',
    padding: 7,
    borderRadius: 30,
    marginTop: 5,
  },
  dueText: {
    fontSize: 14,
    color: '#ffffff',
  },
  image: {
    resizeMode: 'contain',
    width: 121,
    height: 100,
    marginLeft: 10,
  },
  progressWrapper: {
    marginTop: 10,
    position: 'relative',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
  },
  percentageText: {
    fontSize:12,
    position: 'absolute',
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    top: -5,
    left: 55,
    backgroundColor: '#FFFFFF',
    padding: 3,
    paddingHorizontal:10,
    borderRadius: 100
  },
});

export default Progress;
