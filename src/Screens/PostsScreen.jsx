import { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Posts from '../components/Post';

import { postsData } from '../data/data';
import { selectUser } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { sendVerifyEmail } from '../redux/authUser/authOperators';

export default PostsScreen = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState(postsData);

  const renderItem = ({ item }) => (
    <Posts
      key={item.id}
      id={item.id}
      img={item.img}
      title={item.title}
      locationName={item.locationName}
      likes={null}
      geolocation={item.geolocation}
      comments={item.comments}
      email={item.email} />
  );

  const handleSendVerifyEmail = () => { 
   Alert.alert(
      "Verify email",
      "Send email for verification ?",
      [
        {
          text: "OK",
          onPress: () => dispatch(sendVerifyEmail())
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
  }

  return (
    <View style={styles.PostsScreenView}>
      <View style={styles.userContainer}>
        {user?.photoURL ? (
          <Image style={styles.avatarImg}
            source={{ uri: user?.photoURL }} />
        ) : (
          <View style={[styles.photoBox,]}>
            <Feather name='user' size={36} color='#212121CC' style={styles.avatar} />
          </View>
        )}

        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {user?.email.includes("@gmail.com") &&
          <View style={styles.emailInfo}>
            {user?.emailVerified ? (
              <View style={[styles.userEmailBox]}>
                <Feather name="check-circle" size={24} color="black" />
              </View>
            ) : (

              <TouchableOpacity
                style={styles.HeaderIconBtnBack}
                  onPress={handleSendVerifyEmail} >
                <Feather name='alert-triangle' size={24} color='#FFFFFF' left={31} />
                <Text style={styles.verifyEmailBtn}>Verify email</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      </View>

      {posts?.length ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.FlatList}
          // This line hides the scrollbar
          showsVerticalScrollIndicator={false} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  photoBox: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",

  },


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
    fontWeight: '700',
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

  emailInfo: {
    marginLeft: 'auto',
    fontWeight: '700',
    borderRadius: 16,
    // borderWidth: 1,
    backgroundColor: '#FF6C00',
  },

  verifyEmailBtn: {
    marginLeft: 8,
    marginRight: 8,
    color: '#FFFFFF',
  },
  HeaderIconBtnBack: {
    // left: 16,
    // marginLeft: 'auto',
    // marginRight: 'auto', 
    marginBottom: 2,
    marginTop: 2,
  },

  userEmailBox: {
    backgroundColor: '#FFFFFF',
    // right: 12,
  }

});