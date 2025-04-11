import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import S from '../assets/images/s.png';
import ImageLoading from '../assets/images/Screenshot_2025-04-10_135427-removebg-preview.png';
const Loading = () => {
  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#F55539', '#F1215A', '#F42384']}
        style={{flex: 1}}
        >
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'center', borderColor: 'black', borderWidth: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={S} style={{width: 30, height: 60}} />
            <Text style={{fontSize: 40, color: 'white'}}>hopper</Text>
          </View>
          <Text style = {{color: 'white', fontSize: 20}}>Mua sắm nhanh chóng và tiện lợi</Text>
          <Image source={ImageLoading} style={{width: '100%', flexDirection:'column-reverse'}}/>
        </View>
      </LinearGradient>
    </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Loading;
