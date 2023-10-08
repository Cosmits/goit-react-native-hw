import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavіgator';
import CommentsScreen from '../Screens/CommentsScreen';
import MapScreen from '../Screens/MapScreen';
import HeaderTittle from '../components/HeaderTittle';
import HeaderIconBtnBack from '../components/HeaderIconBtnBack';


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
          headerTitle: () => <HeaderTittle Tittle={"Коментарі"} />,
          headerLeft: () => <HeaderIconBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: () => <HeaderTittle Tittle={"Карта"} />,
          headerLeft: () => <HeaderIconBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
        }}
      />
    </MainStack.Navigator>
  )
}
