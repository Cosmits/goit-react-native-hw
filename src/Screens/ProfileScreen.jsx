import { View, Text, StyleSheet } from "react-native";

export default ProfileScreen = () => {


  return (
    <View style={styles.ProfileScreenView}>
      <Text>ProfileScreen!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ProfileScreenView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});