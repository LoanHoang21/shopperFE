import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { getAllSettingNoti } from '../apis/SettingNoti';
import { useNotification } from '../context/NotiContext';
import { updateSettingNoti } from '../apis/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (settingId: string) => void;
  selectedSettingId: string | null;
  status: string | null;
};

const SettingModal = ({ visible, onClose, onSelect, selectedSettingId, status }: Props) => {
  const [options, setOptions] = useState<any[]>([]);
  const { setStatusNoti } = useNotification();

  useEffect(() => {
    const fetchOptions = async () => {
      const res = await getAllSettingNoti();
      setOptions(res.data.DT || []);
    };
    if (visible) {
      fetchOptions();
    }
  }, [visible, status]);

  // Gọi API để cập nhật trạng thái thông báo
  const handleOptionAction = async (option: any) => {
    console.log(option);
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);

    // Gửi request cập nhật trạng thái thông báo
    const response = await updateSettingNoti(user._id, option._id);
    if (response.data.EC === 0) {
      setStatusNoti(response.data.DT.setting_noti_id.status);  // Cập nhật trạng thái trong context
      onSelect(option._id);
    } else {
      console.error('Failed to update notification setting');
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Cài đặt thông báo cho ứng dụng</Text>

              {options.map((option) => (
                <TouchableOpacity
                  key={option._id}
                  style={styles.optionButton}
                  onPress={() => handleOptionAction(option)}
                >
                  <Text style={styles.optionText}>{option.name}</Text>
                  <FontAwesome
                    name={option._id === selectedSettingId ? 'dot-circle-o' : 'circle-o'}
                    size={18}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettingModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ff3366',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 6,
    marginBottom: 10,
  },
  optionText: {
    color: 'black',
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
  },
});
