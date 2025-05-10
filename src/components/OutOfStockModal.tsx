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
  stock: any;
  existingCartItemQty?: number
}

const OutOfStockModal: React.FC<Props> = ({ visible, onClose, stock, existingCartItemQty }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Image
              source={require('../assets/images/warning.png')} // 🟠 icon cảnh báo bạn cần thêm trong assets
              style={styles.icon}
            />
            <Text style={styles.title}>Cảnh Báo</Text>
          </View>
          {existingCartItemQty ? (
              <Text style={styles.message}>
              Bạn đã có <Text style={{ fontWeight: 'bold' }}>{existingCartItemQty}</Text> sản phẩm này trong giỏ. Chỉ còn 
              <Text style={{ fontWeight: 'bold' }}> {stock-existingCartItemQty}</Text> sản phẩm có thể thêm.
            </Text>
          ):
          (
              <Text style={styles.message}>
                  Số lượng sản phẩm trong kho không đủ. Chỉ còn lại 
                  <Text style={{ fontWeight: 'bold' }}> {stock}</Text> sản phẩm!
                </Text>
          )
          }
          

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
    marginBottom: 8,
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
  subNote: {
    fontSize: 13,
    color: '#333',
    marginBottom: 16,
  }
  
});
