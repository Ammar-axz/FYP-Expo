import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "@/assets/images/logo.svg";

const LogoComponent = ({ logoTitleStyle,headerContainer }) => {
  return (
    <View style={[styles.header, headerContainer]}>
          {/* <Image source={Logo} style={styles.logo} /> */}
          <Logo width={36} height={38} />
          <Text style={[styles.subtitle, logoTitleStyle]}> IlmPro</Text>
        </View>
  );
};

export default LogoComponent;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 45,
    zIndex: 10,
    width: '100%',
  },
  subtitle: {
    fontSize: 27,
    fontWeight: '600',
    color: '#000',
    lineHeight: 41
  },
});
