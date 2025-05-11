import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import IconAntDesign from '@react-native-vector-icons/ant-design';
import IconFontAwesome from '@react-native-vector-icons/fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../../types/data';
import { useNotification } from '../../../context/NotiContext';
import { getDetailUser, updateSettingNoti } from '../../../apis/User';
import { getAllNotiByReceiveId } from '../../../apis/Noti';
import SettingModal from '../../../components/SettingNotiModal';

type NotiRouteProp = RouteProp<RootStackParamList, 'notiTypeDetailsOfShop'>;
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

interface HeaderNotificationProps {
  onOpenMarkAllModal?: () => void;
  itemCount?: number;
}

const HeaderNotificationOfShop: React.FC<HeaderNotificationProps> = ({ onOpenMarkAllModal, itemCount }) => {
  const navigation = useNavigation<NavigationType>();
  const route = useRoute<NotiRouteProp>();
  const [modalSettingNoti, setModalSettingNoti] = useState(false);
  const [settingNotiId, setSettingNotiId] = useState<string | null>(null);

  const { sum, setSum, statusNoti, setStatusNoti } = useNotification();
  const _id = route.params?._id;
  const name = route.params?.name;

  const getUserFromStorage = async () => {
    const userStr = await AsyncStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const fetchAndSyncUserData = async () => {
    const user = await getUserFromStorage();
    if (!user) {return;}

    try {
      const response = await getDetailUser(user._id);
      if (response.data?.DT) {
        const updatedUser = response.data.DT;
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setStatusNoti(updatedUser.setting_noti_id.status);
        setSettingNotiId(updatedUser.setting_noti_id._id);

        const notiResponse = await getAllNotiByReceiveId(updatedUser._id);
        setSum(notiResponse.data.DT);
      }
    } catch (error) {
      console.error('Lỗi khi fetch dữ liệu người dùng:', error);
    }
  };

  useEffect(() => {
    fetchAndSyncUserData();
    const interval = setInterval(fetchAndSyncUserData, 1000); // Every 5s
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAndSyncUserData();
    }, [])
  );

  const handleOptionSelect = async (selectedSettingId: string) => {
    const user = await getUserFromStorage();
    if (!user) {return;}
    try {
      const response = await updateSettingNoti(user._id, selectedSettingId);
      if (response.data.EC === 0) {
        setStatusNoti(response.data.DT.setting_noti_id.status);
        await fetchAndSyncUserData(); // Refresh state
        setModalSettingNoti(false);
      } else {
        console.error('Cập nhật setting thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật setting:', error);
    }
  };

  return (
    <View style={styles.header}>
      <IconAntDesign
        name="arrow-left"
        size={24}
        color="#ff3366"
        onPress={() => {
          _id === undefined ? navigation.navigate('homeShop') : navigation.navigate('notiTypeOfShop');
        }}
      />
      <Text style={styles.headerTitle}>
        {_id === undefined ? `Thông báo (${sum})` : `${name} (${itemCount})`}
      </Text>

      {_id === undefined ? (
        <>
          <TouchableOpacity onPress={() => {
            setModalSettingNoti(true);
          }}
          >
            <IconFontAwesome
              name={statusNoti === 'Bật' ? 'bell-o' : 'bell-slash-o'}
              size={24}
              color="#ff3366"
            />
          </TouchableOpacity>

          <SettingModal
            visible={modalSettingNoti}
            onSelect={handleOptionSelect}
            onClose={() => setModalSettingNoti(false)}
            selectedSettingId={settingNotiId}
            status={statusNoti}
          />
        </>
      ) : (
        onOpenMarkAllModal && (
          <TouchableWithoutFeedback onPress={onOpenMarkAllModal}>
            <IconAntDesign name="file-text" size={24} color="#ff3366" />
          </TouchableWithoutFeedback>
        )
      )}
    </View>
  );
};
export default HeaderNotificationOfShop;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  backIcon: {
      marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff3366',
    paddingHorizontal: 10,
    flex: 1,
  },
});