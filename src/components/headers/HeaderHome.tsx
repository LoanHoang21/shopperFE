import React from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScanAndTrackBar from '../navigation/ScanAndTrackBar';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ant-design';

const HeaderHome: React.FC = () => {

  const navigation : any = useNavigation();

  return (
    <LinearGradient 
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#F55539', '#F1215A', '#F42384']}
      style={styles.header}
    >
      <View style={styles.contentRow}>
        {/* Search Input - chiếm toàn bộ còn lại */}
        <View style={styles.searchWrapper}>
          <Image source={require('../../assets/images/search.png')} style={styles.iconLeft} />
          <TextInput
            placeholder="Happy Bedding"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity>
            <Image source={require('../../assets/images/camera.png')} style={styles.iconRight} />
          </TouchableOpacity>
        </View>

        {/* 2 icon bên ngoài */}
        <View style={styles.rightIcons}>
          <TouchableOpacity  onPress={() => navigation.navigate('cart')} >
            <Image source={require('../../assets/images/cart.png')} style={styles.outIconImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.outIcon} onPress={() => navigation.navigate('notification')}>
            <Image source={require('../../assets/images/icon_bell_on.png')} style={styles.outIconImg} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.outIcon} onPress={() => navigation.navigate('profile')}>
            <Icon name='user' size={24} color={'white'}/>
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
        height:150,
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
