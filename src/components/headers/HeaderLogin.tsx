import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import * as data from '../../types/data';

const HeaderLogin = () => {
    const navigation: NavigationProp<data.RootStackParamList> = useNavigation();
    return (
        <View style = {styles.container}>
            <LinearGradient start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#F55539', '#F1215A', '#F42384']} 
                style={styles.header}
            >
                <Image source={require('../../assets/images/logoNameApp.png')}/>
            </LinearGradient>
            <Icon name="left" style={styles.iconLeft} onPress={() =>{navigation.goBack()}}/>
        </View>
    );
}

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },
    header: {
        height: screenHeight * 0.35,
        borderBottomLeftRadius: screenWidth * 0.45,
        borderBottomRightRadius: screenWidth * 0.45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLeft: {
        color: 'white',
        fontSize: 15,
        position: 'absolute',
        paddingLeft: 30,
        paddingTop: 50,
    },
});

export default HeaderLogin;