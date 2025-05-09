// import React, { useEffect, useState } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import { Dropdown } from 'react-native-element-dropdown';
// import { getAllUser } from '../../apis/User';

// interface IUser {
//   _id: string;
//   username: string;
//   email: string;
//   phone: string;
// }

// interface INoti {
//   _id?: string;
//   name: string;
//   image: string;
//   image_sub?: string[];
//   description: string;
//   notitype_id?: string;
//   order_id?: string;
//   receiver_id: string;
//   sender_id?: string;
//   is_read?: boolean;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface Props {
//   visible: boolean;
//   onClose: () => void;
//   onSuccess: (data: INoti) => void;
//   initialData?: INoti | null;
// }

// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dr0ncakbs/image/upload';
// const UPLOAD_PRESET = 'mobile';
// const DEFAULT_IMAGE = 'https://via.placeholder.com/150';

// const UpdateNotiModel: React.FC<Props> = ({ visible, onClose, onSuccess, initialData }) => {
//   const [form, setForm] = useState<INoti>({
//     image: '',
//     name: '',
//     description: '',
//     receiver_id: '',
//   });
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       setForm(initialData);
//     } else {
//       setForm({
//         image: '',
//         name: '',
//         description: '',
//         receiver_id: '',
//       });
//     }
//   }, [initialData]);

//   useEffect(() => {
//     if (visible) {
//       fetchUsers();
//     }
//   }, [visible]);

//   const fetchUsers = async () => {
//     try {
//       setLoadingUsers(true);
//       const res = await getAllUser();
//       setUsers(res.data.DT);
//     } catch (err) {
//       Alert.alert('Lỗi', 'Không thể lấy danh sách người dùng.');
//     } finally {
//       setLoadingUsers(false);
//     }
//   };

//   const handleChange = (field: keyof INoti, value: any) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleImageUpload = async () => {
//     const result = await launchImageLibrary({ mediaType: 'photo' });
//     if (result.didCancel) return;
//     const image = result.assets?.[0];
//     if (!image) return;

//     const formData = new FormData();
//     formData.append('file', {
//       uri: image.uri,
//       type: image.type,
//       name: image.fileName,
//     });
//     formData.append('upload_preset', UPLOAD_PRESET);

//     try {
//       const res = await axios.post(CLOUDINARY_URL, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       const imageUrl = res.data.secure_url;
//       handleChange('image', imageUrl);
//     } catch (error) {
//       Alert.alert('Upload thất bại', 'Vui lòng thử lại sau.');
//     }
//   };

//   const handleSubmit = () => {
//     if (!form.name || !form.description || !form.image || !form.receiver_id) {
//       Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ thông tin.');
//       return;
//     }
//     onSuccess(form);
//     onClose();
    
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.overlay}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.title}>
//             {initialData ? 'Chỉnh sửa thông báo' : 'Thêm thông báo'}
//           </Text>

//           <ScrollView>
//             <Text style={styles.titleText}>Tiêu đề</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Tiêu đề thông báo"
//               value={form.name}
//               onChangeText={(text) => handleChange('name', text)}
//             />
//             <Text style={styles.titleText}>Nội dung</Text>
//             {/* <TextInput
//               style={styles.input}
//               placeholder="Mô tả"
//               value={form.description}
//               onChangeText={(text) => handleChange('description', text)}
//             /> */}
//             <TextInput
//               style={[styles.input, { height: 100 }]}
//               placeholder="Mô tả"
//               value={form.description}
//               onChangeText={(text) => handleChange('description', text)}
//               multiline={true}
//               textAlignVertical="top"
//             />
//             <Text style={styles.titleText}>Người nhận</Text>
//             {/* Dropdown chọn người nhận */}
//             {loadingUsers ? (
//               <ActivityIndicator size="small" color="#007bff" />
//             ) : (
//               <Dropdown
//                 data={users.map((u) => ({ label: u.username || u.email || u.phone , value: u._id }))}
//                 labelField="label"
//                 valueField="value"
//                 placeholder="Chọn người nhận"
//                 value={form.receiver_id}
//                 onChange={(item) => handleChange('receiver_id', item.value)}
//                 style={styles.input}
//               />
//             )}

//             {/* Hiển thị ảnh */}
//             <View style={{ alignItems: 'center', marginBottom: 12 }}>
//               <Image
//                 source={{ uri: form.image || DEFAULT_IMAGE }}
//                 style={{ width: 150, height: 150, borderRadius: 10 }}
//               />
//               <TouchableOpacity style={styles.uploadBtn} onPress={handleImageUpload}>
//                 <Text style={{ color: '#fff' }}>Tải ảnh lên</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>

//           <View style={styles.actions}>
//             <TouchableOpacity style={styles.confirmBtn} onPress={handleSubmit}>
//               <Text style={{ color: '#fff' }}>Xác nhận</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
//               <Text>Hủy</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Modal>
//   );
// };

// export default UpdateNotiModel;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#00000066',
//     padding: 20,
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     elevation: 4,
//     maxHeight: '90%',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 12,
//   },
//   uploadBtn: {
//     marginTop: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 8,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     marginTop: 10,
//   },
//   cancelBtn: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#eee',
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   confirmBtn: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 8,
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: "500",
//     // paddingVertical: 8,
//   }
// });
