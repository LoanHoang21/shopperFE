import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

interface INotiType {
  _id?: string;
  image: string;
  name: string;
  description: string;
  status: number;
  quantity: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: (data: INotiType) => void;
  initialData?: INotiType | null;
}

// 👉 Thay YOUR_CLOUD_NAME và YOUR_UPLOAD_PRESET bằng giá trị từ Cloudinary
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dr0ncakbs/image/upload';
const UPLOAD_PRESET = 'mobile';

const DEFAULT_IMAGE = 'https://via.placeholder.com/150'; // ảnh mặc định

const NotiTypeModel: React.FC<Props> = ({
  visible,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [form, setForm] = useState<INotiType>({
    image: '',
    name: '',
    description: '',
    status: 1,
    quantity: 0,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        image: '',
        name: '',
        description: '',
        status: 1,
        quantity: 0,
      });
    }
  }, [initialData]);

  const handleChange = (field: keyof INotiType, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.didCancel) return;
    const image = result.assets?.[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
      const res = await axios.post(CLOUDINARY_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = res.data.secure_url;
      handleChange('image', imageUrl);
    } catch (error) {
      Alert.alert('Upload thất bại', 'Vui lòng thử lại sau.');
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.description || !form.image) return;
    onSuccess(form);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {initialData ? 'Chỉnh sửa loại thông báo' : 'Thêm loại thông báo'}
          </Text>

          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Tên loại thông báo"
              value={form.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Mô tả"
              value={form.description}
              onChangeText={(text) => handleChange('description', text)}
            />

            {/* Hiển thị ảnh */}
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <Image
                source={{ uri: form.image || DEFAULT_IMAGE }}
                style={{ width: 150, height: 150, borderRadius: 10 }}
              />
              <TouchableOpacity style={styles.uploadBtn} onPress={handleImageUpload}>
                <Text style={{ color: '#fff' }}>Tải ảnh lên</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Số lượng"
              keyboardType="numeric"
              value={form.quantity.toString()}
              onChangeText={(text) => handleChange('quantity', parseInt(text) || 0)}
            />
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Trạng thái:</Text>
              <TouchableOpacity
                style={[styles.statusBtn, form.status === 1 && styles.statusActive]}
                onPress={() => handleChange('status', 1)}
              >
                <Text>Hiện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.statusBtn, form.status === 0 && styles.statusInactive]}
                onPress={() => handleChange('status', 0)}
              >
                <Text>Ẩn</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
              <Text style={{ color: '#fff' }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NotiTypeModel;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000066',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  uploadBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    marginRight: 10,
    fontWeight: '500',
  },
  statusBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
  },
  statusActive: {
    backgroundColor: '#d4edda',
  },
  statusInactive: {
    backgroundColor: '#e2e3e5',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 10,
  },
  confirmBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
});
