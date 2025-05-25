import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
export const BackButton = () => (
  <>
  <TouchableOpacity
    onPress={() => router.back()}
    style={styles.backButton}>
    <Image
      source={require('@/assets/icons/left-arrow.png')}
      style={styles.backArrow}
    />
  </TouchableOpacity>
</>
);

const styles = {
    backButton: {
    padding: 15,
    marginVertical:15,
    backgroundColor: '#1212120D',
    borderRadius: 100,
    },
    backArrow: {
    tintColor: '#000',
    resizeMode: 'contain',
    }
}