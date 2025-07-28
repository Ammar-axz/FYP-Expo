import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import React from "react";
import HeadderHeading from "@/components/Home/HeadderHeading";
import chatIcon from "@/assets/icons/message-chat-circle.svg";
import { useRouter } from "expo-router"; // 👈 import router
import { API } from '@/api'
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { useState,useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { io } from "socket.io-client";
import { router } from "expo-router";


const StudentListComp = ({contact}) => {
  
  return(
    <TouchableOpacity
      onPress={()=>{
      router.push({
      pathname: 'ChatScreen',
      params: {
        ContactId:contact.contactId._id ,
        CommonId:contact.commonId,
        ContactName:contact.contactId.Name
      },
    })}}  
    >
      <View style={styles.listItem}>
        <View style={{flex:1, flexDirection:'row'}}>
          <Image 
          source={contact.contactId.pfp?{uri:`${API.BASE_URL}/Images/ProfilePictures/${contact.contactId.pfp}`}:require("@/assets/icons/user-pic.png")}
          style={styles.ltQuizIcon}/>
          <Text style={styles.listItemText}>{contact.contactId.Name}</Text>
        </View>
          <Image style={styles.DateArrow} source={require('@/assets/icons/DateRightArrow.png')}></Image>
      </View>
    </TouchableOpacity>
  )
}


const index = () => {
  const {loggedInUserId,loggedInUserClasses} = userData()
  const [users,getUsers] = useState([])
  const isFocused = useIsFocused()
  const router = useRouter(); // 👈 initialize router
  const socket = io(`${API.BASE_URL}`)


  useEffect(()=>{
    if(isFocused)
    checkContacts()
  },[isFocused])

  useEffect(()=>{
    if(users)
      joinRooms()
  },[users])


  function joinRooms()
  {
    users.map((i)=>{
      socket.emit("joinRoom", i.contactId._id.valueOf());
    })
  }

  async function checkContacts()
  {
    try
    {
      let ClassIds =[]
      loggedInUserClasses.map((i)=>(
          ClassIds.push(i._id)
      ))


      let students = await axios.post(`${API.BASE_URL}/api/getStudentsfromClasses`,ClassIds)

      students = students.data

      let StudentIds =[]
      students.map((i)=>(
        StudentIds.push(i.Student_id)
      ))

      console.log(students)
      
      const uniqueStudentIds = [...new Set(StudentIds)];
      console.log(uniqueStudentIds);
      
      let parents = await axios.post(`${API.BASE_URL}/api/getParentsfromStudents`,uniqueStudentIds)
      parents = parents.data

      let ParentIds =[]
      parents.map((i)=>(
        ParentIds.push(i.Parent_id)
      ))
      const uniqueParentIds = [...new Set(ParentIds)];
      
      let contacts = await axios.post(`${API.BASE_URL}/api/getContacts`,{id:loggedInUserId})
      contacts = contacts.data

      let contactsToAdd = []

      uniqueParentIds.forEach(parentId => {
        let flag = true
        
        for(let element = 0 ; element < contacts.length ; element++)
        {
          if(contacts[element].contactId._id == parentId)
          {
            flag = false
            break
          }
        }
        if(flag == true)
        {
          contactsToAdd.push({
              UserId1 : loggedInUserId,
              UserId2 : parentId
            })
        }
      });

      await axios.post(`${API.BASE_URL}/api/addMultipleContacts`,contactsToAdd)

      let Users = await axios.post(`${API.BASE_URL}/api/getContacts`,{id:loggedInUserId})
      getUsers(Users.data)
  }
    catch(e)
    {console.log(e)}
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 16 }}>
      <HeadderHeading HeadTitle="Messages" />
      <View
        style={{
          flex: 1,
          // justifyContent: "center",
          // alignContent: "center",
          // alignItems: "center",
        }}
      >
        
        {users.length == 0?
        <View>
          <View
            style={{
              backgroundColor: "#0000000A",
              width: 50,
              height: 50,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Image
              source={chatIcon}
              style={{ width: 24, height: 24, resizeMode: "contain" }}
            />
          </View>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 16, color: "#121212", fontWeight: "500", textAlign: 'center' }}>
              You don’t have any messages
            </Text>
            <Text style={{ fontSize: 14, color: "#12121280" }}>
              When you receive a message, it will appear here
            </Text>
          </View>
        </View>
        :
        <View style={{flex:1}}>
          <FlatList
            data={users}
            keyExtractor={item => item.commonId}
            renderItem={({item})=>( <StudentListComp contact={item} /> )}
            />
        </View>
        }
        {/* <TouchableOpacity onPress={() => router.push("/ChatScreen")}>
          <Text style={{ color: "blue", fontSize: 16 }}>Next Screen</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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
})
