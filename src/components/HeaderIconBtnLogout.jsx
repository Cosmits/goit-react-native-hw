import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default HeaderIconBtnLogout = () => {

  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      style={styles.HeaderIconBtnLogout}
      onPress={() => navigation.navigate("LoginScreen")}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  HeaderIconBtnLogout: {
    right: 16,
  },
});