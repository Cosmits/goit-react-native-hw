import { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import Posts from '../components/Post';
import UserAvatar from '../images/userAvatar.jpg'

import { postsData } from '../data/data';

export default PostsScreen = () => {
  const [posts, setPosts] = useState(postsData);

  const renderItem = ({ item }) => (
    <Posts
      key={item.id}
      id={item.id}
      img={item.img}
      title={item.title}
      locationName={item.locationName}
      likes={null}
      geolocation={item.locationName}
      comments={item.comments}
      email={item.email}
    />
  );

  return (
    <View style={styles.PostsScreenView}>
      <View style={styles.userContainer}>
        <Image style={styles.avatarImg} source={UserAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      {posts?.length ? (
        <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.FlatList}
        showsVerticalScrollIndicator={false} // This line hides the scrollbar
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  PostsScreenView: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 31,
    marginTop: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 8,
    fontWeight: '700',
  },
  userName: {
    color: '#212121',
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '400',
  },
  userEmail: {
    color: '#212121',
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  },



  FlatList: {
    display: 'flex',
    width: '100%',
    gap: 8,
    marginTop: 32,
  },
});