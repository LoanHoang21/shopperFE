import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
  import FontAwesome from '@react-native-vector-icons/fontawesome';
type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
};

const options = [
  'Trong 30 phút',
  'Trong 1 giờ',
  'Trong 12 giờ',
  'Trong 24 giờ',
  'Cho đến khi tôi bật lại',
];

const SettingModal = ({ visible, onClose, onSelect }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Tắt thông báo cho ứng dụng</Text>

              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => {
                    onSelect(option);
                  }}
                >
                  {/* <View style={{}}> */}
                    <Text style={styles.optionText}>{option}</Text>
                    <FontAwesome name='circle-o' size={18}/>
                  {/* </View> */}
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
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent:"flex-end"
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
    // borderWidth: 1,
    // borderColor: 'green',
  },
  optionText: {
    color: 'black',
    width: '90%',
    fontSize: 16,
    fontWeight: '500',
    // borderWidth: 1,
    // borderColor: 'green',
  },
});
