import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground, View,
  Keyboard, KeyboardAvoidingView,
  StyleSheet, Text, TextInput,
  TouchableOpacity, TouchableWithoutFeedback, Dimensions
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
// import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default CreatePostsScreen = () => {

  const navigation = useNavigation();

  const [focusedInput, setFocusedInput] = useState(null);

  const [postPhoto, setPostPhoto] = useState(null); 
  const [photoName, setPhotoName] = useState(''); 
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back); 
  const [flashCamera, setFlashCamera] = useState(Camera.Constants.FlashMode.off); 
  const [hasPermission, setHasPermission] = useState(null); 
  const cameraRef = useRef(null); 

  const [photoLocationName, setPhotoLocationName] = useState(''); 
  const [currentGeoLocation, setCurrentGeoLocation] = useState({});



  // =================================================================
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('No access to Location');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    })();
  }, []);

  // =================================================================
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();


    return () => {
      cameraRef.current = null;
      console.log('Unmounting phase: same when componentWillUnmount runs');
    };
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera!</Text>;
  }

  // =================================================================
  const makePhoto = async () => {
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setPostPhoto(uri);
      } catch (error) {
        console.log('No access to Camera:', error)
      }
    }
  };

  const clearForm = () => {
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

  const handleSubmit = () => {
    const data = {
      img: postPhoto,
      description: photoName,
      comments: [],
      likes: 0,
      locationName: photoLocationName,
      geoLocation: currentGeoLocation,
    };
    // posts.unshift(data); 
    clearForm(); 
    navigation.navigate('PostsScreen'); 
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <View style={{ ...styles.container, ...styles.flexContainer }}>

        <View style={{ ...styles.wrapContainer, ...styles.flexContainer }}>

          {postPhoto ? (
            <ImageBackground
              source={{ uri: postPhoto }}
              style={styles.image}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={makePhoto}
              >
                <FontAwesome name='camera' size={24} color='white' />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <Camera
              style={styles.camera}
              type={typeCamera}
              ratio='16:9'
              flashMode={flashCamera}
              ref={cameraRef}
            >
              <TouchableOpacity
                style={styles.imageAddButton}
                opacity={0.5}
                onPress={makePhoto}
              >
                <FontAwesome name='camera' size={24} color='gray' />
              </TouchableOpacity>
            </Camera>
          )}
          <TouchableOpacity onPress={uploadPhoto} >
            <Text style={styles.imageText}>
              {postPhoto ? 'Редагувати фото' : 'Завантажте фото'}
            </Text>
          </TouchableOpacity>

          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
          >

            <View style={styles.flexContainer}>
              <TextInput
                style={[styles.input, styles.margin32, focusedInput === 'photoName' && styles.isFocus]}
                onFocus={() => setFocusedInput('photoName')}
                onBlur={() => setFocusedInput(null)}
                // style={styles.input}
                placeholder='Назва...'
                type={'text'}
                name={'photoName'}
                value={photoName}
                onChangeText={setPhotoName}
              />

              <View style={styles.containerLocalIcon}>
                <TouchableOpacity style={styles.boxLocalIcon}>
                  <Feather name='map-pin' size={24} color='#BDBDBD'
                    style={[focusedInput === 'photoLocationName' && styles.isFocus]} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, styles.margin16, styles.locationPaddingLeft,
                  focusedInput === 'photoLocationName' && styles.isFocus]}
                  onFocus={() => setFocusedInput('photoLocationName')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder='Місцевість...'
                  type={'text'}
                  name={'photoLocation'}
                  value={photoLocationName}
                  onChangeText={setPhotoLocationName}
                />
              </View>

            </View>

          </KeyboardAvoidingView>
        </View>
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
              postPhoto ? { color: '#FFFFFF', } : { color: '#BDBDBD', },
            ]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
      </View >
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  CreatePostsScreenView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 31,
    marginTop: 1,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },

  wrapContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  camera: {
    display: 'flex',
    width: '100%',
    height: 240,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    display: 'flex',
    width: '100%',
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
    justifyContent: 'flex-start',
    marginTop: 8,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
  },

  input: {
    width: Dimensions.get('window').width - 32,
    height: 50,
    paddingVertical: 15,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 2,
  },

  margin16: {
    marginTop: 16,
  },

  margin32: {
    marginTop: 32,
  },

  containerLocalIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  boxLocalIcon: {
    position: 'absolute',
    top: 30,
  },
  locationPaddingLeft: {
    paddingLeft: 28,
  },

  button: {
    height: 51,
    width: Dimensions.get('window').width - 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 220,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
  },


  isFocus: {
    borderBottomColor: 'black',
    color: 'black',
  },

});