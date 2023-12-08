import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/routes/RootNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { persistor, store } from './src/redux/store';
import Toast from 'react-native-easy-toast';

export default App = () => {

  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./src/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    "Roboto-Light": require("./src/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./src/fonts/Roboto-Thin.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={<Spinner
          textContent={'Loading...'}
          textStyle={{ color: '#BDBDBD' }} />}>
        <NavigationContainer>
          <RootNavigator />
          <Toast
            ref={(toast) => (this.toast = toast)}
            // style={{ backgroundColor: "red" }}
            // position="top"
            // textStyle={{ color: "white", fontSize: 25 }}
          />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}


