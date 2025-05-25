import { Image, TouchableOpacity } from 'react-native';

export const Search = () => (
  <>
  <TouchableOpacity
  style={styles.backButton}>
  <Image
    source={require('@/assets/icons/bookmark.png')}
    style={styles.backArrow}
  />
</TouchableOpacity>
<TouchableOpacity
  style={styles.backButton}>
  <Image
    source={require('@/assets/icons/search-md.png')}
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