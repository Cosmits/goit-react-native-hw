import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavіgator';
import CommentsScreen from '../Screens/CommentsScreen';
import MapScreen from '../Screens/MapScreen';


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
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          header: () => <Header title="Коментарі" />,
          headerShown: 'true',
        }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          header: () => <Header title="Карта" />,
          headerShown: 'true',
        }}
      />
    </MainStack.Navigator>
  )
}
