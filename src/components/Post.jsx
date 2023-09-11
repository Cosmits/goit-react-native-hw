import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// import { deletePost, getLike } from '../../redux/operations';
// import { selectEmail } from '../../redux/selectors';

export default function Posts({
  photoUri,
  name,
  location,
  likes,
  geolocation,
  id,
  comments,
  email,
}) {
  const navigation = useNavigation();
  // const dispatch = useDispatch();
  // const currentEmail = useSelector(selectEmail);

  const addLike = () => {
    if (likes?.includes(currentEmail)) return;
    // dispatch(getLike({ id, currentEmail }));
  };

  const showAlert = () => {
    Alert.alert(
      'Видалення поста',
      'Ви точно хочете видалити пост?',
      [
        //  { text: 'Так, видалити', onPress: () => dispatch(deletePost(id)) },
        { text: 'Так, видалити', onPress: () => console.log(id) },
        { text: 'Ні, відмінити', style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.post}>
      <ImageBackground
        style={styles.image}
        source={{ uri: photoUri ? photoUri : null }}
      >
        {email === currentEmail && (
          <MaterialIcons
            name="delete"
            size={30}
            style={styles.deleteIcon}
            onPress={showAlert}
          />
        )}
      </ImageBackground>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <FontAwesome
            onPress={() => {
              navigation.navigate('Comments', { photoUri, id });
            }}
            name="comment"
            size={24}
            style={{
              ...styles.icon,
              color: comments?.length > 0 ? '#FF6C00' : '#BDBDBD',
            }}
          />
          <Text style={{ ...styles.postsNumber, marginRight: 24 }}>
            {comments?.length || 0}
          </Text>

          <AntDesign
            name="like2"
            size={24}
            style={{
              ...styles.icon,
              color: likes?.length > 0 ? '#FF6C00' : '#BDBDBD',
            }}
            onPress={addLike}
          />
          <Text style={styles.postsNumber}>{likes?.length ?? 0}</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Map', geolocation);
          }}
        >
          <View style={styles.box}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginBottom: 32,
  },

  image: {
    backgroundColor: '#F6F6F6',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
  },

  deleteIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    color: '#FF6C00',
    opacity: 0.8,
  },

  text: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    marginTop: 8,
    marginBottom: 8,
  },

  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  box: { display: 'flex', flexDirection: 'row', alignItems: 'center' },

  icon: { color: '#BDBDBD', marginRight: 6 },

  postsNumber: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },

  locationText: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});