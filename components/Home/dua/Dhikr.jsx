import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';

const DATA = [
  {
    id: '1',
    title: 'Daily Dhikr',
    image: require('../../../assets/icons/DuaDhikr/tasbih.png'),
  },
  {
    id: '2',
    title: 'After Prayers',
    image: require('../../../assets/icons/DuaDhikr/pray.png'),
  },
  {
    id: '3',
    title: 'Knowledge',
    image: require('../../../assets/icons/DuaDhikr/knowledge.png'),
  },
  {
    id: '4',
    title: 'Forgiveness',
    image: require('../../../assets/icons/DuaDhikr/forgiveness.png'),
  },
];

const DhikrCard = ({title, image}) => {
  return (
    <View style={styles.card}>
      <Image
        source={typeof image === 'string' ? {uri: image} : image}
        style={styles.icon}
      />
      <Text style={styles.title}>{title}</Text>
      <Image
        source={require('../../../assets/icons/rightarrowblack.png')} // Always local
        style={styles.arrowIcon}
      />
    </View>
  );
};

const Dhikr = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={styles.heading}>Dhikr’s</Text>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <DhikrCard title={item.title} image={item.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    width: 360,
    height: 70,
  },
  icon: {
    resizeMode: 'cover',
    marginRight: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
    flex: 1,
  },
  arrowIcon: {
    resizeMode: 'contain',
  },
});

export default Dhikr;
