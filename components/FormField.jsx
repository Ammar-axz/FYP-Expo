import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import EyeIcon from '@/assets/icons/eye.png';
import EyeIconHide from '@/assets/icons/eye-hide.png';

const FormField = ({ title, value, placeholder, handleChangeText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text style={styles.formLabel}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title.toLowerCase() === 'password' && !showPassword}
          {...props}
        />
        {title.toLowerCase() === 'password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Image source={showPassword ? EyeIcon : EyeIconHide} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#12121224',
    borderRadius: 12,
    height: 57,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 57
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#121212',
  },
});

export default FormField;
