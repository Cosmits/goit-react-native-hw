import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import Home from './src/Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderIconBtnLogout from './src/components/HeaderIconBtnLogout';
import HeaderTittle from './src/components/HeaderTittle';


export default App = () => {

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./src/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./src/fonts/Roboto-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  const MainStack = createStackNavigator();

  return (

    // <View style={styles.container} >
    //   <StatusBar style="auto" />
    //   {/* <RegistrationScreen /> */}
    //   {/* <LoginScreen /> */}
    //   <Home />
    // </View>


    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            // headerTitleAlign: "center",
            // headerTitle: () => <HeaderTittle Tittle={"Публікації"} />,
            // headerRight: () => <HeaderIconBtnLogout />,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>

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