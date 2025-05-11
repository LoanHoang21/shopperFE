import {StyleSheet, Text,  View} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/data';

type NotiRouteProp = RouteProp<RootStackParamList, 'notiShop'>;
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const HeaderNotificationShop = () => {
  const navigation = useNavigation<NavigationType>();
  const route = useRoute<NotiRouteProp>();
  const _id = route.params?._id;
  const name = route.params?.name;
  return (
    <View style={styles.header}>
      <Icon
        name="arrow-left"
        size={24}
        color="#ff3366"
        onPress={() => {
          _id === undefined
            ? navigation.navigate('homeShop')
            : navigation.navigate('notiTypeShop');
        }}
      />
      <Text style={styles.headerTitle}>
        {_id === undefined ? `Quản lý thông báo` : `${name}`}
      </Text>
    </View>
  );
};
export default HeaderNotificationShop;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff3366',
    paddingHorizontal: 20,
  },
});
