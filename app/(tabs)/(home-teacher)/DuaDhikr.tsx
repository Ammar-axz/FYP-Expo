import Dhikr from '@/components/Home/dua/Dhikr';
import Dua from '@/components/Home/dua/Dua';
import HeadderHeading from '@/components/Home/HeadderHeading';
import Paragraph from '@/components/Paragraph';
import { router } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

const DuaDhikr = () => {
  // const navigation = useNavigation(); // ✅ Get navigation object

  // ✅ Function to navigate when a Dua is clicked
  const handleNavigate = (dua) => {
    router.navigate('DuaDetail', { dua });
  };

  return (
    <ScrollView style={styles.container}>
      <HeadderHeading HeadTitle="Dhikr & Dua’s" />
      <Paragraph paragraph="Add your booking dates according to pricing" />
      {/* ✅ Pass handleNavigate to Dua component */}
      <Dua onPress={handleNavigate} />
      <Dhikr />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default DuaDhikr;
