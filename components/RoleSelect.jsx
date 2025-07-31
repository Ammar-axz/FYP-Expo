import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RoleSelect = ({ Role, imgSrc, Desc, onPress, isSelected }) => {

  return (
    <TouchableOpacity
      style={[styles.touchable, isSelected && styles.selectedBorder]}
      activeOpacity={0.8}
      onPress={onPress} // No need to set `isSelected` inside this component
    >
      <LinearGradient
        colors={isSelected ? ['#0f9b0f', '#095C47'] : ['#ffffff', '#ffffff']}
        style={styles.RoleContainer}
      >
        <View>
          <Image source={imgSrc} style={styles.RoleImage} />
          <Text style={[styles.RoleTitle, isSelected && styles.textWhite]}>
            {Role}
          </Text>
          <Text style={[styles.RoleDesc, isSelected && styles.textWhite]}>
            {Desc}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    borderColor: '#12121226',
    borderWidth: 1,
  },
  selectedBorder: {
    borderColor: '#0f9b0f',
    borderWidth: 2,
  },
  RoleContainer: {
    padding: 15,
    borderRadius: 12,
  },
  RoleImage: {
    marginBottom: 10,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  RoleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 8,
    lineHeight: 19,
  },
  RoleDesc: {
    color: '#12121280',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  textWhite: {
    color: '#ffffff',
  },
});

export default RoleSelect;
