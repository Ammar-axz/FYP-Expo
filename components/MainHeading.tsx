import { StyleSheet, Text } from 'react-native'
import React from 'react'

const MainHeading = ({title}) => {
  return (
      <Text style={styles.Heading}>{title}</Text>
  )
}

const styles = StyleSheet.create({
    Heading: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: 36,
    color: '#121212',
    marginVertical: 20
    }
  });
  

export default MainHeading