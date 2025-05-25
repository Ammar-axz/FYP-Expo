import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ThreeDotButton = ({onPressFunction}) => (
  <>
  <TouchableOpacity
    onPress={onPressFunction}
    style={styles.backButton}>
    <Image
      source={require('../assets/icons/left-arrow.png')}
      style={styles.backArrow}
    />
  </TouchableOpacity>
</>
)

export default ThreeDotButton

const styles = StyleSheet.create({
    backButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#1212120D',
    borderRadius: 100,
    },
    backArrow: {
    tintColor: '#000',
    resizeMode: 'contain',
    },
})