import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Posts from '../components/Post';
import UserAvatar from '../images/userAvatar.jpg'

import { postsData } from '../data/data';

export default PostsScreen = () => {
  const [posts, setPosts] = useState(postsData);

  return (
    <View style={styles.PostsScreenView}>
      <View style={styles.userContainer}>
        <Image style={styles.avatarImg} source={UserAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView} >
        {posts?.length && (
          posts.map(
            ({
              id,
              img,
              title,
              locationName,
              comments,
              email,
            }) => (
              <Posts
                key={id}
                id={id}
                img={img}
                title={title}
                locationName={locationName}
                likes={null}
                geolocation={locationName}
                comments={comments}
                email={email}
              />
            )
          )
        )}
      </ScrollView>
    </View>
  )
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



  scrollView: {
    display: 'flex',
    width: '100%',
    gap: 8,
    marginTop: 32,
  },
});