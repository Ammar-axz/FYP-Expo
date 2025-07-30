import ConfirmBtn from '@/components/ConfirmBtn';
import Heading from '@/components/Heading';
import RoleSelect from '@/components/RoleSelect';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleConfirm = () => {
    if (selectedRole) {
      router.navigate(`/(auth)/${selectedRole}Form`, { role: selectedRole });
    }
  };

  const roles = [
    {
      title: 'Student',
      desc: 'Access Student Features',
      icon: require('@/assets/icons/User.png'),
    },
    {
      title: 'Teacher',
      desc: 'Manage Teaching Resources',
      icon: require('@/assets/icons/User.png'),
    },
    {
      title: 'Parent',
      desc: "Monitor Your Child's Progress",
      icon: require('@/assets/icons/User.png'),
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Heading heading="What are you looking to be?" />

        {roles.map((role) => (
          <RoleSelect
            key={role.title}
            Role={role.title}
            imgSrc={role.icon}
            Desc={role.desc}
            onPress={() => handleRoleSelect(role.title)}
            isSelected={selectedRole === role.title}
          />
        ))}

        <ConfirmBtn
          title="Confirm"
          handlePress={handleConfirm}
          disabled={!selectedRole}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RoleSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
