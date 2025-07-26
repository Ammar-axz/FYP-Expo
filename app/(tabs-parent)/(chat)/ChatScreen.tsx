import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messages}>
        {/* User messages (green right) */}
        <View style={styles.userMsg}>
          <Text style={styles.userText}>Hi there! Nice to meet you!.</Text>
        </View>
        <View style={styles.userMsg}>
          <Text style={styles.userText}>I'm John and I need help for apartment booking</Text>
        </View>

        {/* Agent messages (white left) */}
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Can you tell me more about your requirements ?</Text>
        </View>
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Do you have a range?</Text>
        </View>

        {/* User reply */}
        <View style={styles.userMsg}>
          <Text style={styles.userText}>Sure! I’ve 13,555+ budget to book an apartment for a week</Text>
        </View>

        {/* Agent reply */}
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Amazing!</Text>
        </View>
        <View style={styles.agentMsg}>
          <Text style={styles.agentText}>Thanks for the info! I'll get in touch with you!</Text>
        </View>
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
        />
        <TouchableOpacity>
          <Entypo name="emoji-happy" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="thumbs-up" size={24} color="black" style={styles.icon} />
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
