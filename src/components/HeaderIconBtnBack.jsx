import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default HeaderIconBtnBack = () => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.HeaderIconBtnBack}
      onPress={() => navigation.navigate('PostsScreen')} >
      <Feather name='arrow-left' size={24} color='#212121CC' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HeaderIconBtnBack: {
    left: 16,
  },
});