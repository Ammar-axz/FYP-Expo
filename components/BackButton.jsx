import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';
import Arrow from '@/assets/icons/chevron-left.svg';
export const BackButton = () => (
  <>
  <TouchableOpacity
    onPress={() => router.back()}
    style={styles.backButton}>
    {/* <Image
      source={require('@assets/icons/chevron-left.svg')}
      style={styles.backArrow}
    /> */}
    <Arrow height={24} width={24} />
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
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth:1,
    borderColor:'#d8d8d8'
    },
    backArrow: {
    tintColor: '#000',
    resizeMode: 'contain',
    height:24,
    width:24,
    marginRight:0
    }
}