import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import HeaderIconBtnLogout from '../components/HeaderIconBtnLogout';
import Posts from '../components/Post';
import Photo_BG from '../images/Photo_BG.jpg';
import newAvatar from '../images/userAvatarBig.jpg';

import { postsData } from '../data/data';

export default ProfileScreen = () => {
  const [posts, setPosts] = useState(postsData);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        // if (!result.canceled) {
        //
        // }
      }
    } catch (error) {
      console.log('ProfileScreen => ImagePicker: ', error.message);
    }
  };

  return (
    <ImageBackground source={Photo_BG} style={styles.backgroundImage}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logOutIcon}>
            <HeaderIconBtnLogout />
          </View>

          <View style={styles.avatarWrap}>
            <ImageBackground
              source={newAvatar}
              style={styles.avatar}
            />

            <View style={styles.icon}>
              <AntDesign
                name="pluscircleo"
                size={25}
                color="#FF6C00"
                onPress={pickImage}
              />
            </View>
          </View>

          <Text style={styles.title}>Natali Romanova</Text>

          {posts?.length ? (
            posts.map(
              ({
                id,
                img,
                title,
                locationName,
                likes,
                comments,
                email,
              }) => (
                <Posts
                  key={id}
                  id={id}
                  img={img}
                  title={title}
                  locationName={locationName}
                  likes={likes}
                  geolocation={locationName}
                  comments={comments}
                  email={email}
                />
              )
            )
          ) : (
            <View style={styles.textWrapper}>
              <Text style={styles.text}>No posts</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'relative',
    flex: 1,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },

  container: {
    position: 'relative',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: '#FFFFFF',
  },

  logOutIcon: {
    position: 'absolute',
    top: 22,
    right: 16,
  },

  avatarWrap: {
    position: 'absolute',
    top: -60,
    left: '50%',
    transform: [{ translateX: -50 }],
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    overflow: 'hidden',
  },

  icon: {
    position: 'absolute',
    right: -12,
    bottom: 14,

    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 32,
    color: '#212121',
  },

  textWrapper: {
    display: 'flex',
    gap: 8,
    marginTop: 32,
  },

  text: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
    color: '#212121',
  },
});