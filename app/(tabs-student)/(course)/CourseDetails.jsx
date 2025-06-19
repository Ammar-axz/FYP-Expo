import Card from '@/components/Home/Card';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const Courses = ({route}) => {
  
  //true = Enrolled Tab || false = Register Tab
  return (
  <View >
    <View style={styles.listStyle}>
    <FlatList
          data={route.params?.course.courses}
          renderItem={({ item }) => <Card title={item.title} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true} // Allows nested scrolling inside another ScrollView
          contentContainerStyle={{ paddingBottom: 40 }} // Avoids cutting the last item
    />
    </View>
  </View>
  )
}

export default Courses

const styles = StyleSheet.create(
  {
    courseContainer:{
    backgroundColor:'#0C6844',
    },
    mainHeading:{
      color:'#FFFFFF',
      fontSize : 28,
      textAlign:'center',
      paddingBottom:10,
      paddingTop:10,
    },
    listStyle:{
      paddingTop:10,
      paddingHorizontal:20,
      backgroundColor:'white'
    }
  }
)