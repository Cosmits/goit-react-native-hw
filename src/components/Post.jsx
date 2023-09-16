import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function Posts({
  id,
  img,
  title,
  locationName,
  likes,
  geolocation,
  comments,
}) {

  const addLike = () => {
    //add like
  };

  return (
    <View style={styles.post}>
      <ImageBackground source={img}
        style={styles.image}
      >
      </ImageBackground>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.infoBox}>
        <View style={styles.box}>
          <Feather
            name="message-circle"
            size={24}
            style={[styles.icon,
            comments?.length && styles.iconActive]}
          />
          <Text style={{ ...styles.postsNumber, marginRight: 24 }}>
            {comments?.length || 0}
          </Text>

          {likes &&
            (<View style={styles.box}>
              <Feather
                name="thumbs-up"
                size={24}
                style={[styles.icon,
                likes > 0 && styles.iconActive]}
                onPress={addLike}
              />
              <Text style={styles.postsNumber}>{likes}</Text>
            </View >)}
        </View>
        <View style={styles.box}>
          <Feather
            name="map-pin"
            size={24}
            style={styles.icon}
          />
          <Text style={styles.locationText}>{locationName}</Text>
        </View>
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

  text: {
    fontFamily: 'Roboto',
    fontWeight: '500',
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

  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    color: '#BDBDBD',
    marginRight: 6
  },
  iconActive: {
    color: '#FF6C00',
  },

  postsNumber: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },

  locationText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});