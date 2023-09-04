import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  Image, View,
  Keyboard, KeyboardAvoidingView,
  StyleSheet, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
// import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, EvilIcons, Ionicons } from '@expo/vector-icons';

export default CreatePostsScreen = () => {
  
  // Використання хука useNavigation для навігації між екранами
  const navigation = useNavigation();

  // Створення станів за допомогою useState хука
  const [postPhoto, setPostPhoto] = useState(null); // Збереження URL фотографії для публікації
  const [photoName, setPhotoName] = useState(''); // Збереження назви фотографії
  const [photoLocationName, setPhotoLocationName] = useState(''); // Збереження місцевості фотографії
  const [hasPermission, setHasPermission] = useState(null); // Дозвіл на використання камери
  const [currentGeoLocation, setCurrentGeoLocation] = useState({}); // Поточна геолокація
  const cameraRef = useRef(null); // Посилання на об'єкт камери

  // Використання useEffect хука для отримання поточної геолокації
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('У доступі до місцезнаходження відмовлено');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    })();
  }, []);

  // Використання useEffect хука для отримання дозволу на використання камери
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Функція для зйомки фотографії за допомогою камери
  const makePhoto = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPostPhoto(uri);
    }
  };

  // Умовна конструкція для відображення компонентів залежно від наявності дозволу на використання камери
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Немає доступу до камери</Text>;
  }

  // Функція для очищення даних після створення публікації
  const clearData = () => {
    setPostPhoto(null);
    setPhotoName('');
    setPhotoLocationName('');
  };

  // Функція для завантаження фотографії з галереї пристрою
  const uploadPhoto = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.cancelled) setPostPhoto(result.assets[0].uri);
  };

  // Функція для обробки натискання кнопки "Опубліковати"
  const handleSubmit = () => {
    const data = {
      img: postPhoto,
      description: photoName,
      comments: [],
      likes: 0,
      locationName: photoLocationName,
      geoLocation: currentGeoLocation,
    };
    posts.unshift(data); // Додавання нової публікації до списку постів
    clearData(); // Очищення даних після створення публікації
    navigation.navigate('PostsScreen'); // Перехід на екран постів
  };

  return (
    // <View style={styles.CreatePostsScreenView}>
    //   <Text>CreatePostsScreen!</Text>
    // </View>

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.flexContainer} >
      <View style={{ ...styles.container, ...styles.flexContainer }}>
        <KeyboardAvoidingView style={styles.flexContainer}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={20}>

          <View style={{ ...styles.wrapContainer, ...styles.flexContainer }}>

            {postPhoto ? (
              <Image
                source={{ uri: postPhoto }}
                style={{
                  width: '95%',
                  height: 240,
                  borderRadius: 8,
                }}
              />
            ) : (
              <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                ref={cameraRef}
              >
                <TouchableOpacity
                  style={styles.imageAddButton}
                  opacity={0.5}
                  onPress={makePhoto}
                >
                  <FontAwesome name="camera" size={24} color="gray" />
                </TouchableOpacity>
              </Camera>
            )}
            <TouchableOpacity onPress={uploadPhoto}>
              <Text style={styles.imageText}>
                {postPhoto ? 'Редагувати фото' : 'Завантажте фото'}
              </Text>
            </TouchableOpacity>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                type={'text'}
                name={'photoName'}
                value={photoName}
                onChangeText={setPhotoName}
              />
              <TextInput
                style={styles.input}
                placeholder="Місцевість..."
                type={'text'}
                name={'photoLocation'}
                value={photoLocationName}
                onChangeText={setPhotoLocationName}
              />
              <TouchableOpacity
                style={[
                  styles.button,
                  postPhoto
                    ? {
                      color: '#FFFFFF',
                      backgroundColor: '#FF6C00',
                    }
                    : {
                      color: '#BDBDBD',
                      backgroundColor: '#F6F6F6',
                    },
                ]}
                activeOpacity={0.5}
                onPress={handleSubmit}
              >
                <Text
                  style={[
                    styles.buttonText,
                    postPhoto
                      ? {
                        color: '#FFFFFF',
                      }
                      : {
                        color: '#BDBDBD',
                      },
                  ]}
                >
                  Опубліковати
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </KeyboardAvoidingView>
      </View >
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  CreatePostsScreenView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  flexContainer: {
    flex: 1,
  },

  // container: {
  //   position: "relative",
  //   fontFamily: 'Roboto-Bold',
  //   alignItems: "flex-start",
  //   justifyContent: "flex-start",
  //   paddingTop: 31,
  //   marginTop: 1,
  //   paddingHorizontal: 16,
  //   backgroundColor: "#FFFFFF",
  // },

  // bgImage: {
  //   flex: 1,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  // },

  wrapContainer: {
    justifyContent: "flex-end",
  },

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  camera: {
    width: '92%',
    height: 240,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAddButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: '#BDBDBD',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
  },
  formContainer: {
    flex: 3,
  },
  button: {
    height: 50,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 44,
  },
  buttonText: {
    fontWeight: '400',
  },
  input: {
    width: 340,
    height: 50,
    marginTop: 33,
    padding: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },

});