import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/uk';

export default function CommentsPost({ avatar, index, comment, date }) {
  return (
    <View style={{
      ...styles.container,
      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
    }} >
      <ImageBackground style={styles.avatar} source={{ uri: avatar }} />
      <View style={{
        ...styles.textWrap,
        borderTopLeftRadius: index % 2 === 0 ? 0 : 6,
        borderTopRightRadius: index % 2 === 0 ? 6 : 0,
      }} >
        <Text style={styles.comment}>{comment}</Text>
        <Text style={styles.date}>
          {moment(date).locale('uk').format('DD MMMM, YYYY | HH:mm')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 24,
    gap: 16,
  },

  avatar: {
    borderRadius: 25,
    width: 28,
    height: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    overflow: 'hidden',
  },

  textWrap: {
    position: 'relative',
    width: Dimensions.get('window').width - 80,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 35,
  },

  comment: {
    fontFamily: 'Roboto',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },

  date: {
    position: 'absolute',
    bottom: 16,
    right: 16,

    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#BDBDBD',
  },
});