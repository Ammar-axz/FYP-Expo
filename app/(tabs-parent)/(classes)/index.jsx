import Card from '@/components/Home/Card';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { userData } from '@/Context/UserContext';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const CourseCard = ({ student_class }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      // onPress={()=>{router.navigate('QuizDetails', {course:quiz})}}
      onPress={() => {
        router.push({
          pathname: "ClassDetails",
          params: {
            Class: encodeURIComponent(JSON.stringify(student_class)), // ← Encode it!
          },
        });
      }}
    >
      <View style={styles.textView}>
        <Text style={styles.title}>{student_class.Class_Name}</Text>
      </View>
      <Image style={{height:32,width:32}} source={require('@/assets/icons/DateRightArrow.png')} />
    </TouchableOpacity>
  );
};

const Courses = () => {
  const {loggedInUserClasses} = userData();

  return (
    <View style={styles.container}>
            
      <View >
      <FlatList
          data={loggedInUserClasses}
          renderItem={({ item }) => <CourseCard student_class={item}/>}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} // Allows nested scrolling inside another ScrollView
          contentContainerStyle={{ paddingBottom: '40%' }} // Avoids cutting the last item
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:'2%',
    marginHorizontal:'2%'
  },
  input:{
    width:'80%',
    backgroundColor:'rgba(235, 235, 235, 0.7)',
    borderRadius:100,
    marginRight:'4%',
    padding:'3%',
    paddingHorizontal:'5%'
  },
  searchContainer2:{
    alignItems:'flex-end',
    backgroundColor:'rgba(235, 235, 235, 0.7)',
    padding:'2%',
    borderRadius:100
  },
  searchIcon:{
    // padding:15
    },
  tabContainer:{
    // flex:1,
    flexDirection:'row',
    width:'100%',
  },
  tabButtons:{
    width:'33%',
  },
  tabButtonText:{
    fontSize:18,
    textAlign:'center',
    paddingVertical:'8%'
  },
  underline:{
    borderBottomWidth:2
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: 'rgba(235, 235, 235, 0.7)',
    padding: 10,
    paddingVertical:15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 20,
    marginTop:40,
    marginHorizontal:'3%',
    alignSelf:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color:'#3f3f3fff'
  },
  textView: {
    marginLeft: "3%",
    marginRight: "-4%",
  },
});

export default Courses;
