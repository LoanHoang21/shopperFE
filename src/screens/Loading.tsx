import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Loading = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#F55539', '#F1215A', '#F42384']}
        style={{flex: 1}}>
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Image source={require('../assets/images/nameApp.png')} />
            {/* <Image source={nameApp}/> */}
            <Text style={styles.text}>Mua sắm nhanh chóng và tiện lợi</Text>
          </View>

          <View style={styles.imageLoading}>
            <Image source={require('../assets/images/imageLoading.png')}/>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic',
    marginVertical: 15,
  },
  content: {
    flex: 1,
  },
  textContent: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageLoading: {
    flex: 1,
    justifyContent: 'center',
  },

});

export default Loading;
