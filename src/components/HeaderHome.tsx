import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScanAndTrackBar from './ScanAndTrackBar';

import { useNavigation } from '@react-navigation/native';

const HeaderHome: React.FC = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={[
        'rgba(244, 35, 132, 1)',
        'rgba(241, 33, 90, 1)',
        'rgba(245, 85, 57, 1)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <View style={styles.contentRow}>
        {/* Search Input - chiếm toàn bộ còn lại */}
        <TouchableOpacity
          style={styles.searchWrapper}
          onPress={() => navigation.navigate('search')}
          activeOpacity={0.8}
        >
          <Image source={require('../assets/search.png')} style={styles.iconLeft} />
          <Text style={styles.input}>Happy Bedding</Text>
          <Image source={require('../assets/camera.png')} style={styles.iconRight} />
        </TouchableOpacity>


        {/* 2 icon bên ngoài */}
        <View style={styles.rightIcons}>
          <TouchableOpacity >
            <Image source={require('../assets/cart.png')} style={styles.outIconImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.outIcon}>
            <Image source={require('../assets/icon_bell_on.png')} style={styles.outIconImg} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.scanOverlay}>
        <ScanAndTrackBar />
      </View>
    </LinearGradient>


  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  header: {
    height: 150,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    borderBottomWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  iconWrapper: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#333', // tùy chỉnh màu icon
  },
  iconLeft: {
    width: 18,
    height: 18,
    tintColor: '#F42384',
    marginRight: 8,
  },
  iconRight: {
    width: 20,
    height: 20,
    tintColor: '#F42384',
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  outIcon: {
    marginLeft: 12,
  },
  outIconImg: {
    tintColor: '#fff',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  searchWrapper: {
    flex: 1, // ⬅️ thêm dòng này để input tự mở rộng
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  scanOverlay: {
    position: 'absolute',
    bottom: -20, // đẩy ra khỏi header khoảng 20px
    left: 10,
    right: 10,
    zIndex: 10,
  },
});
