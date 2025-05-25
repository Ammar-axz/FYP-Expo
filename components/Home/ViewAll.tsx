import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ViewAll = ({ title, PageLink }) => {

  const viewPage = () => {
    router.navigate(PageLink);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={viewPage}>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    color: '#000', // Replace with your desired color
  },
  viewAllText: {
    fontSize: 14,
    color: '#2B3032',
    fontWeight: '600',
    textDecorationLine: 'underline',
    textDecorationColor: '#2F7E83',
  },
});

export default ViewAll;
