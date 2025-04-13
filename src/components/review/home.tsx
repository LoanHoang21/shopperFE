import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

const mockProducts = Array(6).fill({
  title: 'Bộ ga gối và vỏ chăn',
  price: '169.000',
  oldPrice: '205.000',
  tag: 'Chăn ga Pre',
  rating: '4.5',
  image: 'https://via.placeholder.com/150', // thay bằng link thật
});

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          placeholder="Happy Bedding"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.iconBtn}>
          <Image source={require('../../assets/camera.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Image source={require('../../assets/cart.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Quick Access Tabs */}
      <View style={styles.quickMenu}>
        {['Thanh toán', 'Đồ ăn', 'Mã giảm giá', 'Top mua hàng', 'Đơn hàng'].map((item, i) => (
          <View key={i} style={styles.quickItem}>
            <View style={styles.circleIcon} />
            <Text style={styles.quickText}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Ưu đãi & Flash sale */}
      <View style={styles.promoRow}>
        <Text style={styles.promoText}>Ưu Đãi Đặc Biệt</Text>
        <Text style={styles.flashText}>⚡FLASH SALE</Text>
      </View>

      <View style={styles.promoItems}>
        {[1, 2].map((_, i) => (
          <View key={i} style={styles.promoBox}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.promoImage}
            />
            <Text style={styles.priceText}>100.000đ</Text>
          </View>
        ))}
      </View>

      {/* Product Grid */}
      <FlatList
        data={mockProducts}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>
              đ{item.price}{' '}
              <Text style={styles.oldPrice}>đ{item.oldPrice}</Text>
            </Text>
            <Text style={styles.productMeta}>
              {item.tag} ⭐ {item.rating}/5
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  iconBtn: {
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  quickMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  quickItem: {
    alignItems: 'center',
  },
  circleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffc0cb',
    marginBottom: 4,
  },
  quickText: {
    fontSize: 12,
    textAlign: 'center',
  },
  promoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  promoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  flashText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3d00',
  },
  promoItems: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  promoBox: {
    backgroundColor: '#fff',
    elevation: 2,
    padding: 8,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: 80,
    borderRadius: 6,
  },
  priceText: {
    marginTop: 4,
    fontSize: 12,
  },
  productList: {
    marginTop: 24,
    paddingBottom: 24,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 8,
    marginBottom: 16,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 6,
  },
  productTitle: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 13,
  },
  productPrice: {
    color: '#d50000',
    marginTop: 4,
    fontWeight: 'bold',
  },
  oldPrice: {
    color: '#aaa',
    textDecorationLine: 'line-through',
    fontSize: 12,
  },
  productMeta: {
    fontSize: 12,
    marginTop: 4,
    color: '#333',
  },
});
