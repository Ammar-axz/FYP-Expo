import { View, FlatList, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from "react-native";
import { userData } from "@/Context/UserContext";
import Card from "../../../components/Home/Card";
import Logo from "../../../assets/images/logo.png";

const Courses = () => {
  const { loggedInUserClasses } = userData();

  return (
    <>
      <StatusBar style="auto" />

      <View style={styles.main}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.headTitle}>IlmPro</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.searchBar}>
                <Image source={require('../../../assets/icons/search-md.png')} style={{width: 21,height:21}} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={loggedInUserClasses || []}
          renderItem={({ item }) => <Card student_class={item} />}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={false}
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f6f6",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 36,
    height: 38,
  },
  headTitle: {
    color: '#000000',
    fontSize: 27,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 5
  },
  searchBar: {
    backgroundColor: '#1212120D',
    borderRadius: 100,
    padding: 10
  }
});

export default Courses;
