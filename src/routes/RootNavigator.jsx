import React from 'react';
import 'react-native-gesture-handler';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavіgator';
import { createStackNavigator } from '@react-navigation/stack';


export default RootNavigator = () => {

  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  )
}
