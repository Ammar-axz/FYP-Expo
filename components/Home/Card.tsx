import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const Card = ({ title,FunctionOnPress }) => {
  return (
    <View style={styles.wrapper} >
      <TouchableOpacity onPress={FunctionOnPress}>
      <ImageBackground
        style={styles.cardImage}
        source={require('../../assets/images/card.png')}
        resizeMode="cover"
      >
      </ImageBackground>
      <View style={styles.textRow}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require('../../assets/icons/star.png')}
            style={styles.starIcon}
            resizeMode="contain"
          />
          <Text style={styles.ratingText}>4.64</Text>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderColor: '#00000026',
    borderWidth: 1,
    flex: 1,
    marginVertical: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    flex: 2,
    fontSize: 20,
    fontWeight: '600',
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row', // Aligns icon and text in the same row
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  starIcon: {
    width: 16, // Adjust size as needed
    height: 16,
    marginRight: 5, // Add spacing between the icon and text
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default Card;
