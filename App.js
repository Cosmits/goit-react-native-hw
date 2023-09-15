import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/routes/RootNavigator';

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
  
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
};

