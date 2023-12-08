import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import RegistrationScreen from '../Screens/RegistrationScreen';
import LoginScreen from '../Screens/LoginScreen';
import BottomNavigator from './BottomNavigator';
import CommentsScreen from '../Screens/CommentsScreen';
import MapScreen from '../Screens/MapScreen';
import HeaderTittle from '../components/HeaderTittle';
import HeaderIconBtnBack from '../components/HeaderIconBtnBack';
import { imageExists } from '../helpers/img';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { selectPhotoURL, selectUser } from '../redux/selectors';
import { logoutUser, updateUserAvatar, updateUserData } from '../redux/authUser/authOperators';

export default RootNavigator = () => {

  const MainStack = createStackNavigator();

  const user = useSelector(selectUser);
  const photoURL = useSelector(selectPhotoURL)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        if (!user) dispatch(updateUserData(userAuth))
        navigation.navigate('BottomNavigator')
      } else {
        dispatch(logoutUser());
      }
    });
  }, []);


  // check at page load if a user is authenticated
  useEffect(() => {
    async function checkImg(imgURL) {
      let exists = false
      if (imgURL) {
        exists = await imageExists(imgURL.split("?")[0]);
      }
      return exists
    }

    // clear photoURL if photoURL is bad
    if (photoURL) {
      checkImg(photoURL)
        .then(function (exists) {
          if (!exists) dispatch(updateUserAvatar({}))
        });
    }

  }, [photoURL]);

  return (
    <MainStack.Navigator initialRouteName="LoginScreen" screenOptions={{
      headerShown: false
    }}>
      <MainStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <MainStack.Screen name="LoginScreen" component={LoginScreen} />
      <MainStack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }} />
      <MainStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: () => <HeaderTittle Tittle={"Коментарі"} />,
          headerLeft: () => <HeaderIconBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
          headerShown: true,
        }} />
      <MainStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitle: () => <HeaderTittle Tittle={"Карта"} />,
          headerLeft: () => <HeaderIconBtnBack />,
          headerStyle: { borderBottomWidth: 0.5, borderColor: "#0000004D" },
          headerTitleAlign: "center",
        }} />
    </MainStack.Navigator>
  )
}
