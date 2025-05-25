import { StyleSheet, Text } from 'react-native'
import React from 'react'

const Paragraph = ({paragraph}) => {
  return (
    <Text style={styles.RoleDesc}>{paragraph}</Text>
  )
}

const styles = StyleSheet.create({
    RoleDesc: {
        color: '#12121280',
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 24
      },
  });

export default Paragraph