import { StyleSheet, Text } from 'react-native'
import React from 'react'

const Heading = ({heading}) => {
  return (
    <Text style={styles.title}>{heading}</Text>
  )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 32,
      marginBottom: 20,
      lineHeight: 36,
      fontWeight: '500',
    },
  });

export default Heading