import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uriToBlob, compressImage, urlToBlob } from "../helpers/img";
import { selectPhotoURL, selectUser } from "../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAvatar } from "../redux/authUser/authOperators";


export const UploadAvatar = ({ getAvatar, propImage = null, dynamicMargin = -60 }) => {

  const user = useSelector(selectUser);
  const photoURL = useSelector(selectPhotoURL)
  const dispatch = useDispatch();

  const [image, setImage] = useState(propImage);
  const [imageBlob, setImageBlob] = useState(null);

  const dynamicStyles = StyleSheet.create({
    box: {
      marginTop: dynamicMargin,
    },
  });

  const selectAvatar = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      let result = null;

      if (status === 'granted') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
      if (result?.canceled) return

      const uri = await compressImage(result.assets[0].uri, 600, 600)
      const blob = await uriToBlob(uri);

      const fileSizeInKB = blob.size / 1024;

      if (fileSizeInKB > 800) {
        Alert.alert(`The selected photo after compression is 
        ${(fileSizeInKB).toFixed(1)} kb, but must not exceed 800 kb`);
        return;
      }
      setImage(result.assets[0].uri);
      setImageBlob(blob);
      //set img
      if (user?.displayName) dispatch(updateUserAvatar({ uploadBlob: blob }))
    } catch (error) {
      Alert.alert('RegistrationScreen => ImagePicker: ', error.message);
    }
  };

  const handleClearAvatar = () => {
    setImage(null);
    setImageBlob(null);
    //del image
    if (photoURL) dispatch(updateUserAvatar({ delImg: photoURL }))
  };


  useEffect(() => {
    if (imageBlob) getAvatar(imageBlob)

    async function convertImgToBlob() {
      if (image) {
        try {
          const blob = await urlToBlob(image.split("?")[0]);
          getAvatar(blob)
        } catch (err) {
          console.error(err);
        }
      } else {
        getAvatar(null)
      }
    }
    if (photoURL) convertImgToBlob()

  }, [imageBlob, photoURL]);

  return (
    <>
      {image ? (
        <View style={styles.box}>
          <ImageBackground
            source={{ uri: image }}
            style={[styles.photoBoxWithImage, dynamicStyles.box]} >
          </ImageBackground>
          <TouchableOpacity
            style={styles.addBtnWithImage}
            onPress={() => {
              handleClearAvatar();
            }} >
            <AntDesign
              name="closecircleo"
              style={styles.addSvgWithImage}
              size={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.photoBox, dynamicStyles.box]}>
          <Feather name='user' size={60} color='#212121CC' style={styles.avatar} />
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              selectAvatar();
            }} >
            <AntDesign name="pluscircleo" style={styles.addSvg} size={25} />
          </TouchableOpacity>
        </View>
      )}
    </>
  )
};

const styles = StyleSheet.create({
  photoBox: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 16,
  },

  photoBoxWithImage: {
    width: 120,
    height: 120,
    marginLeft: "auto",
    marginRight: "auto",
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 16,
    overflow: "hidden",
  },

  box: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },
  addBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: "auto",
    marginTop: "auto",
    backgroundColor: "#FFFFFF",
    marginBottom: 14,
    marginRight: -13,
  },
  addSvg: {
    color: "#FF6C00",
  },
  addSvgWithImage: {
    color: "#BDBDBD",
  },
  addBtnWithImage: {
    position: "absolute",
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    bottom: 14,
    right: -13,
  },

  avatar: {
    // width: 120,
    // height: 120,
    // backgroundColor: '#F6F6F6',
    // borderRadius: 16,
    // overflow: 'hidden',
    paddingTop: 30,
    paddingLeft: 30,
  },
});