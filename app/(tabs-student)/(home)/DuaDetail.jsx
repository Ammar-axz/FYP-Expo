import Paragraph from '@/components/Paragraph';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DuaDetail = () => {
  const {dua} = useLocalSearchParams()
  const [showFull, setShowFull] = useState(false);
  console.log('Received dua:', dua || 'No data received');
  console.log('Received dua:', JSON.stringify(dua, null, 2));


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>When you wake up</Text>

      {/* Icons Row */}
      <View style={styles.iconRow}>
        <View style={styles.icon}>
          <Image
            source={require('@/assets/icons/DuaDhikr/Play.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.icon}>
          <Image
            source={require('@/assets/icons/DuaDhikr/bookmark.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.icon}>
          <Image
            source={require('@/assets/icons/DuaDhikr/Share.png')}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Arabic Text */}
      <Text style={styles.arabic}>{dua.arabic}</Text>

      {showFull && (
        <>
          <Paragraph paragraph={dua.english} />
          <Text style={styles.subtitle}>Translation</Text>
          <Text style={styles.translation}>{dua.translation}</Text>
          <Text style={styles.subtitle}>Reference</Text>
          <Text style={styles.translation}>{dua.reference}</Text>
        </>
      )}
      {/* Show More / Show Less Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowFull(!showFull)}>
        <View style={styles.buttonContent}>
          <Text style={styles.showMore}>
            {showFull ? 'Show Less' : 'Show More'}
          </Text>
          <Image
            source={
              showFull
                ? require('@/assets/icons/DuaDhikr/arrow-up.png')
                : require('@/assets/icons/DuaDhikr/arrow-down.png')
            }
            resizeMode="contain"
            style={styles.iconImage}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: '#F5F5F5',
    height: 32,
    width: 32,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  arabic: {
    fontSize: 41,
    textAlign: 'right',
    fontWeight: '400',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
    marginVertical: 15,
  },
  translation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#F5F5F5',
    height: 34,
    width: 132,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showMore: {
    color: '#36B295',
    fontWeight: 'bold',
    marginRight: 5,
  },
  iconImage: {
    width: 16,
    height: 16,
  },
});

export default DuaDetail;
