  import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
  import imageBG from '../../assets/Photo_BG.jpg'
  import { useState } from 'react';
  import { AntDesign } from "@expo/vector-icons";

export default RegistrationScreen = () => {

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    console.log("Register:", {
      login: login,
      email: email,
      password: password,
    });
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    console.log('Go to page Login');
  }

  return (

    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={imageBG} >

        <View style={styles.boxAuth}>
          <View style={styles.avatarBox}>
            <TouchableOpacity style={styles.plusBtn}>
              <AntDesign
                name="pluscircleo"
                style={styles.pluscircleo}
                size={25}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Реєстрація</Text>

          <View style={styles.inputContainer}>

            <TextInput style={styles.inputData}
              value={login}
              onChangeText={setLogin}
              placeholder="Логін"
            ></TextInput>

            <TextInput style={styles.inputData}
              value={email}
              onChangeText={setEmail}
              placeholder="Адреса електронної пошти"
            ></TextInput>

            <View style={styles.divPassword}>
              <TextInput style={styles.inputData}
                autoCompleteType="password"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                placeholder="Пароль"
                secureTextEntry={!showPassword}
              >
              </TextInput>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.showPasswordTextStyle}>{showPassword ? "Приховати" : "Показати"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.btnRegister}
            onPress={handleRegister}
          >
            <Text style={styles.btnRegisterText}>Зареєструватися</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnLogin}
            onPress={handleLogin}
          >
            <Text style={styles.btnLoginText}>Вже є аккаунт? Увійти</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    fontFamily: 'Roboto-Bold',
  },


  boxAuth: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
    marginTop: -60,
    // top:-60,
  },

  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: 14,
    marginRight: -13,
  },

  pluscircleo: {
    color: "#FF6C00",
  },

  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  title: {
    marginTop: 32,
    // paddingVertical: 8,
    backgroundColor: "#ffffff",
    color: "#212121",

    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 35,
  },


  inputContainer: {
    paddingTop: 32,
    rowGap: 16,
    paddingBottom: 43,
    backgroundColor: "#ffffff",
  },

  inputData: {
    marginHorizontal: 16,
    // marginRight: 16,
    paddingHorizontal: 16,
    // paddingRight: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 6,
    borderWidth: 1,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
  },

  divPassword: {
    position: "relative",
  },

  showPasswordTextStyle: {
    position: "absolute",
    bottom: 15,
    right: 32,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
  },

  btnRegister: {
    // marginTop: 43,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    paddingVertical: 16,
  },

  btnRegisterText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",

  },


  btnLogin: {
    marginTop: 16,
    marginBottom: 45,
  },

  btnLoginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
    marginRight: "auto",
    marginLeft: "auto",
  },
});