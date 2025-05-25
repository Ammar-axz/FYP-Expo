import Card from '@/components/Home/Card';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const Data = 
[
  {
    id:'1',
    category:'Web Development',
    courses:
      [
        {
          id: '1',
          title: 'Basic Web Development',
          courses:[
            {
              id: '1',
              title: 'Html Basics',
            },
            {
              id: '2',
              title: 'CSS Basics',
            },
            {
              id: '3',
              title: 'Introduction to JavaScript',
            }  
          ]
        },
        {
          id: '2',
          title: 'React Js Course',
          courses:[
            {
              id: '1',
              title: 'Introduction to React Js',
            },
            {
              id: '2',
              title: 'Intermediate React Js Course',
            },
            {
              id: '3',
              title: 'Advanced React Js Course',
            }  
          ]
        },
        {
          id: '3',
          title: 'Node Js Course',
          courses:[
            {
              id: '1',
              title: 'Introduction to Node Js',
            },
            {
              id: '2',
              title: 'Intermediate Node Js Course',
            },
            {
              id: '3',
              title: 'Advanced Node Js Course',
            }  
          ]
        }  
      ]
  },
  {
    id:'2',
    category:'Data Analysis',
    courses:
    [
      {
        id: '1',
        title: 'Data Analysis 1',
        courses:[
          {
            id: '1',
            title: 'Introduction to Data Analysis 1',
          },
          {
            id: '2',
            title: 'Intermediate Data Analysis 1',
          },
          {
            id: '3',
            title: 'Advanced Data Analysis 1',
          }  
        ]
      },
      {
        id: '2',
        title: 'Data Analysis 2',
        courses:[
          {
            id: '1',
            title: 'Introduction to Data Analysis 2',
          },
          {
            id: '2',
            title: 'Intermediate Data Analysis 2',
          },
          {
            id: '3',
            title: 'Advanced Data Analysis 2',
          }  
        ]
      },
      {
        id: '3',
        title: 'Data Analysis 3',
        courses:[
          {
            id: '1',
            title: 'Introduction to Data Analysis 3',
          },
          {
            id: '2',
            title: 'Intermediate Data Analysis 3',
          },
          {
            id: '3',
            title: 'Advanced Data Analysis 3',
          }  
        ]
      }  
    ]
  },
  {
    id:'3',
    category:'Cyber Security',
    courses:
    [
      {
        id: '1',
        title: 'CyberSecurity 1',
        courses:[
          {
            id: '1',
            title: 'Introduction to CyberSecurity 1',
          },
          {
            id: '2',
            title: 'Intermediate CyberSecurity 1',
          },
          {
            id: '3',
            title: 'Advanced CyberSecurity 1',
          }  
        ]
      },
      {
        id: '2',
        title: 'CyberSecurity 2',
        courses:[
          {
            id: '1',
            title: 'Introduction to CyberSecurity 2',
          },
          {
            id: '2',
            title: 'Intermediate CyberSecurity 2',
          },
          {
            id: '3',
            title: 'Advanced CyberSecurity 2',
          }  
        ]
      },
      {
        id: '3',
        title: 'CyberSecurity 3',
        courses:[
          {
            id: '1',
            title: 'Introduction to CyberSecurity 3',
          },
          {
            id: '2',
            title: 'Intermediate CyberSecurity 3',
          },
          {
            id: '3',
            title: 'Advanced CyberSecurity 3',
          }  
        ]
      }  
    ]
  },
];

const QuranCourses = [
  {id: '1', name: 'Quran Reading for Beginners'},
  {id: '2', name: 'Noorani Qaida: Learn to Read Quran'},
  {id: '3', name: 'Tajweed Basics: Proper Quranic Pronunciation'},
  {id: '4', name: 'Quranic Arabic for Beginners'},
  {id: '5', name: 'Quranic Retention Techniques'},
  {id: '6', name: 'Introduction to Quranic Tafsir'},
  {id: '7', name: 'Mastering Quranic Tajweed'},
];
const HadeesCourses = [
  {id: '1', name: 'Foundations of Hadith: An Introduction'},
  {id: '2', name: 'What is Hadith? Understanding Prophetic Teachings'},
  {id: '3', name: 'The Role of Hadith in Islam'},
  {id: '4', name: 'Principles of Hadith Authentication'},
  {id: '5', name: 'Introduction to Ilm al-Rijal (Science of Narrators)'},
  {id: '6', name: 'Hadith Compilation & Preservation'},
  {id: '7', name: "Understanding Sahih, Da'if, and Mawdu' Hadith"},
];
const DunyawiCourses = [
  {id: '1', name: 'Islamic Time Management: Balancing Deen & Dunya'},
  {id: '2', name: 'Success & Leadership in Light of Islam'},
  {id: '3', name: 'Emotional Intelligence & Self-Development in Islam'},
  {id: '4', name: 'Mindfulness & Mental Well-being in Islam'},
  {id: '5', name: 'Islamic Finance & Halal Investment'},
  {id: '6', name: 'Business Ethics in Islam'},
  {id: '7', name: 'Zakat & Wealth Management'},
];


const CoursesCard = ({ course }) => {
  
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={()=>{router.navigate('CourseDetails', {course:course})}}
    >
      <Text style={styles.title2}>{course.title}</Text>
      <Image source={require('@/assets/icons/rightarrowblack.png')} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const Courses = () => {
  const navigation = useNavigation(); 
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('QuranCourses')
  const [courseType,setCourseType] = useState(QuranCourses)

  const handleSearch = (text) => {
    setQuery(text);
    // Add your search logic here
    console.log('Searching for:', text);
  };
  
  const handleOnPress = (item)=>{
    setActive(item)
    if(item === 'QuranCourses')
    {
      setCourseType(QuranCourses)
    }
    else if(item === 'HadeesCourses')
    {
      setCourseType(HadeesCourses)
    }
    else if(item === 'DunyawiCourses')
    {
      setCourseType(DunyawiCourses)
    }
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.searchContainer}>
        {/* <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={handleSearch}
        /> */}
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:'-3%'}}>
        <Image style={{height:40}} resizeMode='contain' source={require('@/assets/images/logo.png')}/>
        <Text style={{fontSize:28,fontWeight:'bold'}}>Ilm Pro</Text>
        </View>
        <View style={styles.searchContainer2}>
        <Image style={styles.searchIcon} source={require('@/assets/icons/search-md.png')}/>
        </View>
      </View>
      <Text style={styles.header}>Latest Courses</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButtons} onPress={()=>handleOnPress('QuranCourses')}>
          <Text style={styles.tabButtonText}>Quran</Text>
          {active === 'QuranCourses' &&
          <View style={styles.underline}></View>
          }
          </TouchableOpacity>
        <TouchableOpacity style={styles.tabButtons} onPress={()=>handleOnPress('HadeesCourses')}>
          <Text style={styles.tabButtonText}>Hadees</Text>
          {active === 'HadeesCourses' &&
          <View style={styles.underline}></View>
          }
          </TouchableOpacity>
        <TouchableOpacity style={styles.tabButtons} onPress={()=>handleOnPress('DunyawiCourses')}>
          <Text style={styles.tabButtonText}>Dunyawi</Text>
          {active === 'DunyawiCourses' &&
          <View style={styles.underline}></View>
          }
          </TouchableOpacity>
      </View>
      <View >
      <FlatList
          data={courseType}
          renderItem={({ item }) => <Card title={item.name}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} // Allows nested scrolling inside another ScrollView
          contentContainerStyle={{ paddingBottom: '40%' }} // Avoids cutting the last item
      />
      </View>
      {/* {Data.map((type)=>(
        <View key={type.id}>
        <Text style={styles.title}>{type.category}</Text>
        {type.courses.map((item)=>(
        <View key={item.id}>
          <CoursesCard course={item}/>
        </View>
        ))}
        </View>
      ))} */}
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
    backgroundColor: 'rgba(235, 235, 235, 0.7)',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 70,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
    marginVertical: 5,
    marginTop:0,
    marginHorizontal:'3%'
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    marginBottom:10
  },
  title2: {
    fontSize: 18,
    flex: 1,
    marginBottom:10
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Courses;
