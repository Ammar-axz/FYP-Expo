import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { userData } from '@/Context/UserContext';

export default function EditProfileScreen() {
  const { loggedInUser, loggedInUserPfp, loggedInUserId } = userData();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    setName(loggedInUser || '');
    setEmail('');
    setPhone('');
    setGender('');
    setPassword('');
    setImageUri(loggedInUserPfp || '');
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll access is needed.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  const handleSave = async () => {
    try {
      // Optional: Upload image
      if (imageUri && imageUri !== loggedInUserPfp) {
        const formData = new FormData();
        formData.append('image', {
          uri: imageUri,
          name: 'profile.jpg',
          type: 'image/jpeg',
        });

        await axios.post(`http://localhost:5000/api/updateUserProfile/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

     await axios.put(`http://localhost:5000/api/updateUserProfile/${loggedInUserId}`, {
  name,
  email,
  phone,
  gender,
  password,
  loggedInUserPfp,
});


      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require('@/assets/icons/user-pic.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.editImageText}>Tap to change photo</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="+92 XXX XXX XXXX"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Male / Female"
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fefefe',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 20,
    color: '#333',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#ccc',
  },
  editImageText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    marginLeft: 6,
  },
  input: {
    height: 50,
    backgroundColor: '#f2f2f2',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a0a0a',
    paddingVertical: 15,
    borderRadius: 14,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
  },
});
