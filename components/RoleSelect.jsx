import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

const RoleSelect = ({ Role, imgSrc, Desc, onPress, isSelected, bgImage }) => {
  return (
    <TouchableOpacity
      style={[styles.touchable, isSelected && styles.selectedBorder]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {isSelected ? (
        <ImageBackground
          source={bgImage}
          imageStyle={styles.backgroundImage}
          style={styles.RoleContainer}
        >
          <View>
            <Image
              source={imgSrc}
              style={[
                styles.RoleImage,
                { tintColor: isSelected ? "#ffffff" : "#000" },
              ]}
            />

            <Text style={[styles.RoleTitle, styles.textWhite]}>{Role}</Text>
            <Text style={[styles.RoleDesc, styles.textWhite]}>{Desc}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={[styles.RoleContainer, { backgroundColor: "#ffffff" }]}>
          <Image source={imgSrc} style={styles.RoleImage} />
          <Text style={styles.RoleTitle}>{Role}</Text>
          <Text style={styles.RoleDesc}>{Desc}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8,
    borderRadius: 16,
    borderColor: "#12121226",
    borderWidth: 1,
    overflow: "hidden",
    height: 150
  },
  selectedBorder: {
    borderColor: "#0f9b0f",
    borderWidth: 2,
  },
  RoleContainer: {
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
  },
  backgroundImage: {
    borderRadius: 12,
    resizeMode: "cover",
    height: 150
  },
  RoleImage: {
    marginBottom: 10,
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  RoleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#121212",
    marginBottom: 8,
    lineHeight: 19,
  },
  RoleDesc: {
    color: "#12121280",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  },
  textWhite: {
    color: "#ffffff",
  },
});

export default RoleSelect;
