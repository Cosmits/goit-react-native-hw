import {
  ImageBackground, View,
  Keyboard, KeyboardAvoidingView,
  StyleSheet, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import imageBG from '../images/Photo_BG.jpg'
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../redux/authUser/authOperators';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading } from '../redux/selectors';
import globalRegex from '../helpers/regexp';
import { setError } from '../redux/authUser/authSlice';
import Spinner from 'react-native-loading-spinner-overlay';


export default LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const errorLogin = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {

    if (!globalRegex.emailRegexp.test(email)) return dispatch(setError("Email is not valid"))
    if (!globalRegex.passwordRegexp.test(password)) return dispatch(setError("Password must contain min 6 symbol A-Z, a-z, 0-9"))

    dispatch(loginUser({ email, password })) 
    setPassword('')
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.flexContainer} >

      <View style={{ ...styles.container, ...styles.flexContainer }}>
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#BDBDBD' }} />
        <ImageBackground style={styles.bgImage} source={imageBG} >

          <KeyboardAvoidingView style={styles.flexContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-240}>

            <View style={{ ...styles.wrapContainer, ...styles.flexContainer }}>

              <View style={styles.boxAuth}>

                <Text style={styles.title}>Увійти</Text>

                <View style={styles.inputContainer}>

                  <TextInput
                    style={[styles.inputData, focusedInput === 'email' && styles.isFocus]}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Адреса електронної пошти' >
                    </TextInput>

                  <View style={styles.divPassword}>
                    <TextInput
                      style={[styles.inputData,
                      focusedInput === 'password' && styles.isFocus]}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      autoCompleteType='password'
                      autoCorrect={false}
                      value={password}
                      onChangeText={setPassword}
                      placeholder='Пароль'
                      secureTextEntry={!showPassword} >
                    </TextInput>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setShowPassword(!showPassword)}>
                      <Text style={styles.showPasswordTextStyle}>{showPassword ? 'Приховати' : 'Показати'}</Text>
                    </TouchableOpacity>
                  </View>
                  {errorLogin && <Text style={styles.errorTitle}>{errorLogin}</Text>}

                </View>

                <TouchableOpacity style={styles.btnRegister}
                  onPress={handleLogin} >
                  <Text style={styles.btnRegisterText}>Увійти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={() => navigation.navigate('RegistrationScreen')} >
                  <Text style={styles.btnLoginText}>Немає аккаунту? Зареєструватися</Text>
                </TouchableOpacity>

              </View>
            </View>

          </KeyboardAvoidingView>

        </ImageBackground>
      </View>

    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({

  flexContainer: {
    flex: 1,
  },

  container: {
    position: 'relative',
    fontFamily: 'Roboto-Bold',
  },

  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  wrapContainer: {
    justifyContent: 'flex-end',
  },

  boxAuth: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    paddingBottom: 111,
  },

  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 16,
    marginTop: -60,
  },

  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 14,
    marginRight: -13,
  },

  pluscircleo: {
    color: '#FF6C00',
  },

  title: {
    marginTop: 32,
    backgroundColor: '#ffffff',
    color: '#212121',

    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 35,
  },

  errorTitle: {
    color: '#FF0000',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    textAlign: 'center',
  },

  inputContainer: {
    paddingTop: 32,
    rowGap: 16,
    paddingBottom: 43,
    backgroundColor: '#ffffff',
  },

  inputData: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 6,
    borderWidth: 1,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },

  divPassword: {
    position: 'relative',
  },

  showPasswordTextStyle: {
    position: 'absolute',
    bottom: 15,
    right: 32,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#1B4371',
  },

  btnRegister: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    paddingVertical: 16,
  },

  btnRegisterText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#FFFFFF',
    marginRight: 'auto',
    marginLeft: 'auto',

  },

  btnLogin: {
    marginTop: 16,
    marginBottom: 45,
  },

  btnLoginText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#1B4371',
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  isFocus: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
});