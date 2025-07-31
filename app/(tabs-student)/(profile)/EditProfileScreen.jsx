import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { userData } from "@/Context/UserContext";
import { API } from "@/api";
import { router } from "expo-router";
import ConfirmBtn from "@/components/ConfirmBtn";
import Heading from '@/components/Heading'


export default function EditProfileScreen() {
  const {
    loggedInUser,
    loggedInUserPfp,
    loggedInUserId,
    setLoggedInUser,
    setLoggedInUserPfp,
    setLoggedInUserId,
    setLoggedInUserRole,
    setLoggedInUserPoints,
  } = userData();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    imageUri: "",
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  async function getUserDetails() {
    try {
      let user = await axios.get(`${API.BASE_URL}/api/getUser`, {
        params: {
          User: loggedInUserId,
        },
      });

      setForm((prev) => ({
        ...prev,
        name: loggedInUser || "",
        email: user.data.Email,
        age: user.data.Age,
        gender: user.data.Gender,
        phone: user.data.Phone,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Camera roll access is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      handleChange("imageUri", result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (form.imageUri != "") {
        formData.append("pfp", {
          uri: form.imageUri,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("gender", form.gender);
      formData.append("password", form.password);

      let userResp = await axios.put(
        `${API.BASE_URL}/api/updateUserProfile/${loggedInUserId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Alert.alert("Success", "Profile updated successfully!");

      setLoggedInUser(userResp.data.userResp.Name);
      if (userResp.data.userResp.pfp)
        setLoggedInUserPfp(userResp.data.userResp.pfp);
    } catch (error) {
      console.error("Error updating profile: ", error.response?.data || error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  function handleLogOut() {
    setLoggedInUserId();
    setLoggedInUser();
    setLoggedInUserRole();
    setLoggedInUserPoints();
    setLoggedInUserPfp();

    router.dismissTo("Onboarding2");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Edit Profile</Text> */}
                <Heading heading='Edit Profile' />


      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            form.imageUri
              ? { uri: form.imageUri }
              : loggedInUserPfp
              ? {
                  uri: `${API.BASE_URL}/Images/ProfilePictures/${loggedInUserPfp}`,
                }
              : require("@/assets/icons/user-pic.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.editImageText}>Tap to change photo</Text>
      </TouchableOpacity>

      {renderInput("Full Name", form.name, (value) =>
        handleChange("name", value)
      )}
      {renderInput(
        "Phone Number",
        form.phone,
        (value) => handleChange("phone", value),
        "phone-pad"
      )}
      {renderInput("Gender", form.gender, (value) =>
        handleChange("gender", value)
      )}
      {renderInput(
        "Email Address",
        form.email,
        (value) => handleChange("email", value),
        "email-address"
      )}
      {renderInput(
        "Change Password",
        form.password,
        (value) => handleChange("password", value),
        "default",
        true
      )}
      {/*
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      */}
      <ConfirmBtn title="Save Changes" handlePress={handleSave} />
      <ConfirmBtn title="Logout" handlePress={handleLogOut} />
    </ScrollView>
  );
}

const renderInput = (
  label,
  value,
  onChangeText,
  keyboardType = "default",
  secure = false
) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secure}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fefefe",
    flexGrow: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 20,
    color: "#333",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#ccc",
  },
  editImageText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 8,
  },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#12121224',
    borderRadius: 12,
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  // label: {
  //   fontSize: 15,
  //   color: "#444",
  //   marginBottom: 6,
  //   marginLeft: 6,
  // },
  // input: {
  //   height: 50,
  //   backgroundColor: "#f2f2f2",
  //   borderColor: "#ddd",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   paddingHorizontal: 14,
  //   fontSize: 16,
  // },
  // button: {
  //   backgroundColor: "#0a0a0a",
  //   paddingVertical: 15,
  //   borderRadius: 14,
  //   width: "100%",
  //   marginTop: 20,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontWeight: "600",
  //   fontSize: 17,
  //   textAlign: "center",
  // },
});
