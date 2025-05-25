import logo from '@/assets/images/logo.png';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const Splash = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('OnboardingItem');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={require('@/assets/images/Bg.png')} 
        resizeMode='cover' 
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>IlmPro</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0C3E35'
  },
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 72,
    height: 75,
  },
  title: {
    fontSize: 31,
    fontWeight: '600',
    lineHeight: 47,
    color: '#fff',
    marginTop: 20,
  },
});

export default Splash;
