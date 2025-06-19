import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const StudentListComp = ({student}) => {
  return(
    <View style={styles.listItem}>
      <View style={{flex:1, flexDirection:'row'}}>
        <Image source={require('@/assets/icons/LatestQuizIcon.png')} style={styles.ltQuizIcon}/>
        <Text style={styles.listItemText}>{student.name}</Text>
      </View>
      <TouchableOpacity>
        <Image style={styles.DateArrow} source={require('@/assets/icons/DateRightArrow.png')}></Image>
      </TouchableOpacity>
    </View>
  )
}

const Courses = () => {
  const navigation = useNavigation(); 

    const categories = [
      'Hifz Group 1',
      'Tajweed Group 2',
      'Taharat Group 2',
    ];
    const [selectedCourse, setSelectedCourse] = useState(categories[0])

  const attendanceData = [
    {id: '0', name:'abcd', date: '2024-12-01', marked: false,  status: 'Absent' },
    {id: '1', name:'abcd', date: '2024-12-08', marked: true,  status: 'Present' },
    {id: '2', name:'abcd', date: '2024-12-10', marked: true,  status: 'Present' },
    {id: '3', name:'abcd', date: '2024-12-18', marked: false,  status: 'Absent' },
    {id: '4', name:'abcd', date: '2024-12-26', marked: true,  status: 'Present' },
    {id: '5', name:'abcd', date: '2024-12-27', marked: false,  status: 'Absent' },
    {id: '6', name:'abcd', date: '2024-12-27', marked: false,  status: 'Absent' },
    {id: '7', name:'abcd', date: '2024-12-27', marked: false,  status: 'Absent' },
    {id: '8', name:'abcd', date: '2024-12-27', marked: true,  status: 'Present' },
    {id: '9', name:'abcd', date: '2024-12-27', marked: true,  status: 'Present' },
    {id: '10', name:'abcd', date: '2024-12-27', marked: false,  status: 'Absent' },
    {id: '11', name:'abcd', date: '2024-12-27', marked: true,  status: 'Present' },
  ];

  return (
    <View style={styles.container}>
      
      <Text style={styles.mainHeading}>Courses</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          {categories.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Students List</Text>

      <View style={{flex:1}}>
        <FlatList
          data={attendanceData}
          keyExtractor={item => item.id}
          renderItem={({item})=>( <StudentListComp student={item} /> )}
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
  mainHeading:{
    fontSize:22,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:30
  },
    pickerContainer: {
    width: '100%',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop:20,
    marginBottom: 20,
    backgroundColor: 'rgba(247,247,247,255)',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  listItem:{
    borderColor:'lightgrey',
    borderBottomWidth:1,
    height:80,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
  },
  listItemText:{
    fontSize:20,
    marginLeft:20,
    textAlignVertical:'center',
    fontWeight:'bold'
  },
  ltQuizIcon:{
    width:50,
    height:50,
    borderRadius:25,
  },
  DateArrow:{
    width:30,
    height:30,
    marginHorizontal:5
  },
  label: {
    color: '#000000',
    height:40,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom:20
  },
});

export default Courses;
