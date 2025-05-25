import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';

const QuickAccessMenu = ({IconSrc, PageTitle}) => {
  return (
    <>
      <Image source={IconSrc} style={styles.icon} />
      <Text style={styles.subTitle}>{PageTitle}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  innerBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 9,
    height: 80,
    width: 109,
    marginHorizontal: 10,
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#2B3032',
    fontWeight: '600',
    lineHeight: 20,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default QuickAccessMenu;
