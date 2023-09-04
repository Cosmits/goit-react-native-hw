import { View, Text, StyleSheet, Image } from "react-native";
import UserAvatar from '../images/userAvatar.jpg'

export default PostsScreen = () => {


  return (
    <View style={styles.PostsScreenView}>
      {/* <Text>PostsScreen!</Text> */}
      <View style={styles.userContainer}>
        <Image style={styles.avatarImg} source={UserAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  PostsScreenView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 31,
    marginTop: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
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
});