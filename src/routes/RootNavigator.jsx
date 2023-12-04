import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
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
import { logoutUser,  updateUserData } from '../redux/authUser/authOperators';
import { imageExists } from '../helpers/img';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { setPhotoURL } from '../redux/authUser/authSlice';


export default RootNavigator = () => {

  const MainStack = createStackNavigator();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // check at page load if a user is authenticated
  useEffect(() => {

    async function checkImg(imgURL) {
      if (imgURL) {
        const exists = await imageExists(imgURL.split("?")[0]);
        if (!exists) dispatch(setPhotoURL(null))
      }
    }

    onAuthStateChanged(auth, async(userAuth) => {
      if (userAuth ) {
        // user is logged in, send the user's details to redux,
        // store the current user in the state
        dispatch(
          updateUserData({
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            emailVerified: auth.currentUser.emailVerified,
            displayName: auth.currentUser.displayName,
            isAnonymous: auth.currentUser.isAnonymous,
            photoURL: auth.currentUser.photoURL,
            createdAt: auth.currentUser.createdAt,
            lastLoginAt: auth.currentUser.lastLoginAt,
            apiKey: auth.currentUser.apiKey,
            appName: auth.currentUser.appName,
          }))
        
        // clear photoURL if photoURL is bad
        await checkImg(auth?.currentUser?.photoURL)
        navigation.navigate('BottomNavigator')
      } else {
        dispatch(logoutUser());
      }
    });
  }, []);

  return (
    <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
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
