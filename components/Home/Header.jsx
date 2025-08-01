import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { API } from '@/api';
import NotificationIcon from '@/assets/icons/Notification.svg';

const Header = ({
  name,
  profileImage,
  onBellPress,
  containerStyle,
  greetingStyle,
  nameStyle,
  bellButtonStyle,
  notificationDotStyle,
  profileImageStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Texts */}
      <View style={styles.textContainer}>
        <Text style={[styles.greeting, greetingStyle]}>Assalamualaikum,</Text>
        <Text style={[styles.name, nameStyle]}>{name} 👋</Text>
      </View>

      {/* Icons */}
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={[styles.bellButton, bellButtonStyle]} onPress={onBellPress}>
          {/* <Image
            source={require('@/assets/icons/bell.png')}
            resizeMode="contain"
          /> */}
          <NotificationIcon />
          <View style={[styles.notificationDot, notificationDotStyle]} />
        </TouchableOpacity>

        <Image
          source={
            profileImage
              ? { uri: `${API.BASE_URL}/Images/ProfilePictures/${profileImage}` }
              : require('@/assets/icons/user-pic.png')
          }
          style={[styles.profileImage, profileImageStyle]}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    color: '#B0C4B1',
    fontSize: 16,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellButton: {
    backgroundColor: '#3C7060',
    padding: 15,
    borderRadius: 100,
  },
  notificationDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 10,
    resizeMode: 'contain',
  },
});
