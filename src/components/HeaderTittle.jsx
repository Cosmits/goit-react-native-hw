import { View, Text, StyleSheet } from 'react-native';

export default HeaderTittle = ({ Tittle }) => {
  return (
    <View>
      <Text style={styles.HeaderTittle}>{Tittle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderTittle: {
    paddingVertical: 11,
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 22,
    color: '#212121',
    backgroundColor: '#ffffff',
  },
});
