import {
  ImageBackground, Keyboard,
  KeyboardAvoidingView, StyleSheet,
  Text, TextInput, TouchableOpacity,
  TouchableWithoutFeedback, View
} from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import globalRegex from '../helpers/regexp';
import Spinner from 'react-native-loading-spinner-overlay';
import { selectError, selectIsLoading } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

import imageBG from '../images/Photo_BG.jpg'
import { UploadAvatar } from '../components/SelectAvatar';
import { registerUser } from '../redux/authUser/authOperators';

export default RegistrationScreen = () => {

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageBlob, setImageBlob] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const errorRegister = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!globalRegex.loginRegexp.test(login)) return dispatch(setError("Login is not valid"))
    if (!globalRegex.emailRegexp.test(email)) return dispatch(setError("Email is not valid"))
    if (!globalRegex.passwordRegexp.test(password)) return dispatch(setError("Password must contain min 6 symbol A-Z, a-z, 0-9"))

    dispatch(registerUser({ login, email, password, imageBlob }))

    setLogin('')
    setEmail('')
    setPassword('')
    setImageBlob('')
  };

  const handleGetAvatar = (imageBlob) => {
    setImageBlob(imageBlob);
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
            keyboardVerticalOffset={-100}>

            <View style={{ ...styles.wrapContainer, ...styles.flexContainer }}>

              <View style={{ ...styles.boxAuth, }}>
                <UploadAvatar getAvatar={handleGetAvatar} />
          
                <Text style={styles.title}>Реєстрація</Text>
                <View style={styles.inputContainer}>

                  <TextInput
                    style={[styles.inputData, focusedInput === 'login' && styles.isFocus]}
                    onFocus={() => setFocusedInput('login')}
                    onBlur={() => setFocusedInput(null)}
                    value={login}
                    onChangeText={setLogin}
                    placeholder='Логін' >
                  </TextInput>

                  <TextInput
                    style={[styles.inputData, focusedInput === 'email' && styles.isFocus]}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    value={email}
                    keyboardType='email-address'
                    autoCapitalize='none'
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
                  {errorRegister && <Text style={styles.errorTitle}>{errorRegister}</Text>}

                </View>

                <TouchableOpacity style={styles.btnRegister}
                  onPress={handleRegister} >
                  <Text style={styles.btnRegisterText}>Зареєструватися</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={() => navigation.navigate('LoginScreen')} >
                  <Text style={styles.btnLoginText}>Вже є аккаунт? Увійти</Text>
                </TouchableOpacity>

              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback >
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

    paddingBottom: 78,
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