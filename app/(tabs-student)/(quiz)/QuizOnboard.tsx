import { router } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const QuizOnboard = () => {

  const ChangePage = () => {
    router.navigate('(Quiz)');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('@/assets/images/Bg.png')} 
        resizeMode="cover" 
        style={styles.imageBackground}
      >
        <Image 
          source={require('@/assets/images/quizonboard.png')} 
          resizeMode="cover"  
        />
        <View style={styles.container}>
          <Text style={styles.title}>Start the journey of competitive mode</Text>
          <TouchableOpacity style={styles.nextButton} onPress={ChangePage}>
            <Text style={styles.nextText}>Let's Start</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0C3E35',
  },
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50, // Adjust padding for better spacing
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 47,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 60, // Adjusted padding to fit the text
    marginTop: 20,
  },
  nextText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default QuizOnboard;
