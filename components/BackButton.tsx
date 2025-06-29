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
    height:40,
    width:40,
    alignItems:'center',
    justifyContent:'center',
    marginVertical:15,
    marginLeft:10,
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth:1,
    borderColor:'gray'
    },
    backArrow: {
    tintColor: '#000',
    resizeMode: 'contain',
    height:18,
    width:18,
    marginRight:3
    }
}