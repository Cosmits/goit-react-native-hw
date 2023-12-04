import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../redux/authUser/authOperators';

export default HeaderIconBtnLogout = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  handlerLogout = () => {
    dispatch(logoutUser());
    navigation.navigate("LoginScreen");
  };

  return (
    <TouchableOpacity
      style={styles.HeaderIconBtnLogout}
      onPress={handlerLogout} >
      <Feather name='log-out' size={24} color='#BDBDBD' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HeaderIconBtnLogout: {
    right: 16,
  },
});