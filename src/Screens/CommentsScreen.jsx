import { useState } from "react";
import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, ImageBackground,
  KeyboardAvoidingView, TouchableWithoutFeedback,
  Keyboard, TextInput, FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import { useRoute } from "@react-navigation/native";
import { postsData } from '../data/data';

export default CommentsScreen = () => {
  const [comment, setComment] = useState("");
  // const post = route?.params?.post;

  const route = useRoute();
  const postImg = route?.params?.img
  const postId = route?.params?.id
  const reverseComment = postsData.filter(item => item.id === postId)[0].comments.reverse()

  const handleAddComment = () => {
    const now = new Date();
    const formattedDate = format(now, "dd MMMM, yyyy | HH:mm");

    //addComment
    console.log(comment);
    setComment(comment);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} >
        <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
              style={styles.image}
              source={postImg} >
            </ImageBackground>
          </TouchableWithoutFeedback>
          <FlatList
            data={reverseComment}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.mainCommentContainer,
                  item.user === "I" && { flexDirection: "row-reverse" },
                ]} >
                {/* <View style={styles.userAvatar}>
                  <Text>{item.user}</Text>
                </View> */}
                <ImageBackground
                  source={item.userAvatar}
                  style={styles.userAvatar} >
                </ImageBackground>
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{item.text}</Text>
                  <Text
                    style={[styles.dataTimeText, item.user === "I" ? { marginRight: "auto" } : { marginLeft: "auto" }]}
                  >
                    {item.date} | {item.time}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false} >
          </FlatList>

          <View style={styles.boxComment}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              value={comment}
              onChangeText={setComment} >
            </TextInput>
            <TouchableOpacity
              style={styles.btnCommentInput}
              onPress={handleAddComment} >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  inner: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },

  flexContainer: {
    flex: 1,
  },

  image: {
    height: 240,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginVertical: 32,
  },

  publishedBox: {
    backgroundColor: "#E8E8E8",
    height: 240,
    borderRadius: 8,
    marginVertical: 32,
  },

  boxComment: {
    position: "relative",
    marginTop: "auto",
    marginBottom: 16,
    paddingTop: 16,
  },

  commentInput: {
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19.36,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 30,
    color: "#212121",
  },

  btnCommentInput: {
    position: "absolute",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    transform: [{ translateY: -1 }],
    right: 8,
  },

  mainCommentContainer: {
    flexDirection: "row",
    columnGap: 16,
  },

  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
    justifyContent: "center",
    resizeMode: "cover",
    overflow: "hidden",
    alignItems: "center",
  },

  userAvatarColor: {
    backgroundColor: "#00000008"
  },
  
  commentContainer: {
    backgroundColor: "#00000008",
    padding: 16,
    marginBottom: 24,
    flex: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
  },
  
  dataTimeText: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    marginTop: 8,
    color: "#BDBDBD",
  },
});