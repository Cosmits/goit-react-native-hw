import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';


export default App = () => {

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={styles.container} >
      <StatusBar style="auto" />
      {/* <RegistrationScreen /> */}
      <LoginScreen />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Roboto-Bold',
  },

  // title: {
  //   marginTop: 16,
  //   paddingVertical: 8,
  //   borderWidth: 4,
  //   borderColor: "#20232a",
  //   borderRadius: 6,
  //   backgroundColor: "#61dafb",
  //   color: "#20232a",
  //   textAlign: "center",
  //   fontSize: 30,
  //   fontWeight: "bold"
  // }
});