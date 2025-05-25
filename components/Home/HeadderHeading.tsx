import { Text, StyleSheet } from 'react-native'
import React from 'react'

const HeadderHeading = ({HeadTitle}) => {
  return (
    <Text style={styles.header}>{HeadTitle}</Text>
  )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#121212',
        marginVertical: 10
      },
})

export default HeadderHeading;
