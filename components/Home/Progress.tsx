import React from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const Progress = () => {
  const progressValue = 0.25;

  return (
    <View style={styles.container}>
      <ImageBackground
      style={styles.cardImg}
      source={require('../../assets/images/QuizCardDesign.png')}
      resizeMode="cover"
      >
      <ImageBackground
      style={styles.cardHighlight}
      source={require('../../assets/images/QuizCardHighlight.png')}
      resizeMode="cover"
      ></ImageBackground>
        
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.card}>
          <Text style={styles.title}>Discover Quran Facts Quiz</Text>
          <Text style={styles.questions}>Questions – 20</Text>
          <View style={styles.dueContainer}>
            <Text style={styles.dueText}>⏰ Due: 25 Jan 2025</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/Preview.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progressValue}
          color={'rgb(30, 112, 68)'}
          style={styles.progressBar}
        />
        <Text style={styles.percentageText}>{Math.round(progressValue * 100)}%</Text>
      </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'rgba(54,178,112,255)',
    flexDirection: 'column',
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
    marginRight: 10,
    marginVertical: 25
  },
  card: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  cardImg:{
    padding:20,
  },
  cardHighlight:{
    position:'absolute',
    height:70,
    width:'106%',
  },
  title: {
    fontSize: 22,
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
