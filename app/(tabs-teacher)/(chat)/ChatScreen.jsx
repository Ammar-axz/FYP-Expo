import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState,useEffect } from 'react';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { API } from '@/api'
import { userData } from '@/Context/UserContext';
import axios from 'axios';
import { io } from "socket.io-client";

const ChatScreen = () => {
  const {loggedInUserId,loggedInUser,loggedInUserClasses} = userData()
  const {ContactId,CommonId} = useLocalSearchParams()
  const [messages,setMessages] = useState([])
  const [inputMsg,setInputMsg] = useState()
  const socket = io(`${API.BASE_URL}`)


 useEffect(()=>{
    socket.on("messageResponse",(msg)=>{
      if(msg.Type === false)
      {
        setMessages([...messages,msg])
      }
    })
  },[socket,messages])
  
  useEffect(()=>{
    getMessages()
  },[])

  async function getMessages(){
    let user = {
      SocketId:CommonId
    }

    let msg = await axios.post(`${API.BASE_URL}/api/getMessages`,user)
    setMessages(msg.data)
  }


  function handleSubmit(){
    if (inputMsg) 
    {
      let data = {
        Id:`${socket.id}${Math.random()}`,
        Type:false,
        Text:inputMsg,
        Sender:loggedInUser,
        SocketId:CommonId,
        SenderId:loggedInUserId,
        ReceiverId:ContactId
      }
      
      socket.emit("message",data,CommonId)
      setMessages(prev => [...prev,data])
      setInputMsg('')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messages}>
        {
          messages.map((msg)=>{
            if(msg.Type === false)
            {
              let recId= msg.ReceiverId[0]
              
              if(msg.SenderId == loggedInUserId)
              {
                return(
                <View key={msg._id} style={styles.userMsg}>
                  <Text style={styles.userText}>{msg.Text}</Text>
                </View>
                )
              }
              else
              {
                return(
                <View key={msg._id} style={styles.agentMsg}>
                  <Text style={styles.agentText}>{msg.Text}</Text>
                </View>
                )
              }
            }
          })
        }
              
        {/* User messages (green right) */}
        {/* <View style={styles.userMsg}>
          <Text style={styles.userText}>Hi there! Nice to meet you!.</Text>
        </View>
        <View style={styles.userMsg}>
          <Text style={styles.userText}>I'm John and I need help for apartment booking</Text>
        </View>

        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Can you tell me more about your requirements ?</Text>
        </View>
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Do you have a range?</Text>
        </View>

        <View style={styles.userMsg}>
          <Text style={styles.userText}>Sure! I’ve 13,555+ budget to book an apartment for a week</Text>
        </View>

        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Amazing!</Text>
        </View>
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Thanks for the info! I'll get in touch with you!</Text>
        </View>*/}
      
      </ScrollView> 

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          placeholder="Aa"
          placeholderTextColor="#999"
          style={styles.input}
          value={inputMsg}
          onChangeText={ text => setInputMsg(text)}
        />
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit}>
          <Image source={require('@/assets/icons/send-message.png')}/>
          {/* <FontAwesome name="send-message" size={24} color="#36B295" style={styles.icon} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messages: {
    padding: 16,
    paddingBottom: 80,
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#16AA5C',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userText: {
    color: '#fff',
    fontSize: 15,
  },
  agentMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#12121208',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    maxWidth: '80%',
  },
  agentText: {
    color: '#000',
    fontSize: 15,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 8,
    fontSize: 15,
  },
  icon: {
    marginHorizontal: 4,
  },
});
