import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const OutOfStockModal: React.FC<Props> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Image
              source={require('../assets/warning.png')} // 🟠 icon cảnh báo bạn cần thêm trong assets
              style={styles.icon}
            />
            <Text style={styles.title}>Cảnh Báo</Text>
          </View>
          <Text style={styles.message}>Số lượng sản phẩm trong kho hàng không đủ!</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.confirmBtn}>
              <Text style={styles.confirmText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OutOfStockModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '85%',
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FF9800',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    alignItems: 'flex-end',
  },
  confirmBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FF9800',
    borderRadius: 6,
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
