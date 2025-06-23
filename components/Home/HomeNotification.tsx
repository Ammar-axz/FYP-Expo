import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

const Progress = () => {
  const progressValue = 0.25; // 25% progress

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.cardImg}>
          <ImageBackground
            style={styles.cardHighlight}
            source={require('@/assets/images/QuizCardHighlight.png')}
            resizeMode="cover"
          />
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.card}>
              <Image
                source={require('@/assets/icons/home-noti.png')}
                style={styles.notiIcon}
              />
              <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                <Text style={styles.title}>Urgent Notice!</Text>
                <Text style={styles.subtitle}>Weekly hifz assessments due this evening.</Text>
              </View>
            </View>
          </View>

          {/* Progress Bar */}
          {/* <View style={styles.progressWrapper}>
            <View style={[styles.progressBar, { backgroundColor: '#D3D3D3' }]}>
              <View
                style={{
                  height: '100%',
                  width: `${progressValue * 100}%`,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 6,
                }}
              />
            </View>
            <Text style={styles.percentageText}>{Math.round(progressValue * 100)}%</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    borderRadius: 12,
    backgroundColor: 'rgba(54,178,112,255)',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    marginVertical: 15,
  },
  cardImg: {
    padding: 15,
  },
  cardHighlight: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  notiIcon: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
    fontWeight: '500',
    lineHeight: 20,
  },
  // progressWrapper: {
  //   marginTop: 10,
  //   position: 'relative',
  // },
  // progressBar: {
  //   height: 12,
  //   borderRadius: 6,
  //   width: '100%',
  // },
  // percentageText: {
  //   fontSize: 12,
  //   position: 'absolute',
  //   alignSelf: 'center',
  //   color: '#000',
  //   fontWeight: 'bold',
  //   top: -5,
  //   backgroundColor: '#FFFFFF',
  //   padding: 3,
  //   paddingHorizontal: 10,
  //   borderRadius: 100,
  // },
});

export default Progress;
