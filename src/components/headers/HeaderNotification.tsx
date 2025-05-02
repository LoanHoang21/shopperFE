import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import AllReadModal from '../navigation/AllReadModal';
import SettingModal from '../navigation/SettingNotiModal';

type NotiRouteProp = RouteProp<RootStackParamList, 'notiTypeDetails'>;
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

interface HeaderNotificationProps {
  onOpenMarkAllModal?: () => void;
  itemCount?: number;
}

const HeaderNotification: React.FC<HeaderNotificationProps> = ({ onOpenMarkAllModal, itemCount }) => {
  const navigation = useNavigation<NavigationType>();
  const route = useRoute<NotiRouteProp>();
  // const {_id, name, quantity} = route.params;
  const _id = route.params?._id;
  const name = route.params?.name;
  const sum = route.params?.sum;
  const [isActiveNoti, setIsActiveNoti] = useState(true);
  const [modalSettingNoti, setModalSettingNoti] = useState(false);

  // const handleConfirm = () => {
  //   // Gắn logic đánh dấu tất cả là đã đọc ở đây
  //   // console.log("Đã đánh dấu tất cả là đã đọc");
  //   // setModalVisible(false);
  //   navigation.navigate('promotionNotification')
  // };
  const handleOptionSelect = () => {
    // console.log("Đã chọn:", option);
    setModalSettingNoti(false);
  };


  return (
    <View style={styles.header}>
      <Icon
        name="arrow-left"
        size={24}
        color="#ff3366"
        onPress={() => {
          _id === undefined
            ? navigation.navigate('home')
            : navigation.navigate('notiType');
        }}
      />
      <Text style={styles.headerTitle}>
        {_id === undefined ? `Thông báo (${sum})` : `${name} (${itemCount})`}
      </Text>
      {/* <Icon name="bell" size={24} color="#ff3366" /> */}
      {_id === undefined ? (
        <>
          <TouchableWithoutFeedback onPress={() => setModalSettingNoti(true)}>
            <Image
              source={
                isActiveNoti
                  ? require('../../assets/images/icon_bell.png')
                  : require('../../assets/images/icon_bell_off.png')
              }
            />
          </TouchableWithoutFeedback>

          {isActiveNoti && (
            <SettingModal
              visible={modalSettingNoti}
              onClose={() => setModalSettingNoti(false)}
              onSelect={handleOptionSelect}
            />
          )}
        </>
      ) : (
        <View>
          {onOpenMarkAllModal && (
            <TouchableWithoutFeedback onPress={onOpenMarkAllModal}>
              <Image source={require('../../assets/images/all_read.png')} />
            </TouchableWithoutFeedback>
          )}
        </View>
      )}

    </View>
  );
};
export default HeaderNotification;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff3366',
  },
});
