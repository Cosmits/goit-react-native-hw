import { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

import HeaderIconBtnLogout from '../components/HeaderIconBtnLogout';
import Posts from '../components/Post';
import Photo_BG from '../images/Photo_BG.jpg';
import { postsData } from '../data/data';
import { selectUser } from '../redux/selectors';
import { UploadAvatar } from '../components/SelectAvatar';

export default ProfileScreen = () => {
  const user = useSelector(selectUser);
  const [imageBlob, setImageBlob] = useState(null);

  const [posts, setPosts] = useState(postsData);

  const renderItem = ({ item }) => (
    <Posts
      key={item.id}
      id={item.id}
      img={item.img}
      title={item.title}
      locationName={item.locationName}
      likes={item.likes}
      geolocation={item.geolocation}
      comments={item.comments}
      email={item.email} />
  );

  const handleGetAvatar = (imageBlob) => {
    setImageBlob(imageBlob);
  };

  return (
    <ImageBackground source={Photo_BG} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.logOutIcon}>
          <HeaderIconBtnLogout />
        </View>

        <View style={styles.avatarWrap}>
          <UploadAvatar
            getAvatar={handleGetAvatar}
            propImage={user?.photoURL}
            dynamicMargin={0} />
        </View>

        <Text style={styles.title}>{user?.displayName}</Text>

        {posts?.length ? (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.FlatList}
            // This line hides the scrollbar
            showsVerticalScrollIndicator={false} />
        ) : (
          <View style={styles.textWrapper}>
            <Text style={styles.text}>No posts</Text>
          </View>
        )}
      </View>
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

  FlatList: {
    marginBottom: 50,
  },
});