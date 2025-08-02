import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ConfirmBtn = ({ handlePress, title, isLoading }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={handlePress}
    activeOpacity={0.7}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

export default ConfirmBtn;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#121212",
    height: 57,
    borderRadius: 100,
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    justifyContent: 'center'
  },
  text: {
    color: "#F5F5F5",
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
});
