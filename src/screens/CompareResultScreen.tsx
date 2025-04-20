import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/data';
import ProductCardCompare from '../components/ProductCardCompare';
import { Product } from '../components/ProductCard';

const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 8;


type ResultRouteProp = RouteProp<RootStackParamList, 'compareResult'>;

const CompareResultScreen = () => {
    const route = useRoute<ResultRouteProp>();
    const { products } = route.params;

    const sorted = [...products].sort((a, b) => a.price - b.price);

    const CARD_WIDTH = sorted.length <= 2
        ? (screenWidth - CARD_MARGIN * (sorted.length + 1)) / sorted.length
        : (screenWidth - CARD_MARGIN * 2) / 2;
    const cheapestProduct = sorted[0];
    const columnWidth = 120; // hoặc tuỳ bạn muốn rộng bao nhiêu mỗi cột
    const tableWidth = 100 + sorted.length * columnWidth;

    const [selectedShop, setSelectedShop] = React.useState<string>(
        sorted[0]?.short_description || ''
      );
      

    return (
        <ScrollView style={styles.container}>

            <FlatList
                data={sorted}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingLeft: CARD_MARGIN,
                    paddingRight: CARD_MARGIN,
                    justifyContent: sorted.length <= 2 ? 'center' : 'flex-start',
                }}
                renderItem={({ item }) => (
                    <View style={{ width: CARD_WIDTH, marginRight: CARD_MARGIN }}>
                        <ProductCardCompare
                            item={item}
                            isCheapest={item._id === cheapestProduct._id
                            }
                        />
                    </View>
                )}
            />

            <View style={styles.separator} />

            {/* Khuyến mãi giả lập */}
            <View style={styles.promotionSection}>
                <Text style={styles.subTitle}>Khuyến mãi từ Shop</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>

                    <View style={styles.shopTabs}>
                        {sorted.map((item, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => setSelectedShop(item.short_description)}
                                style={[
                                    styles.shopTag,
                                    selectedShop === item.tag && {
                                        backgroundColor: '#f50057',
                                        borderColor: '#f50057',
                                    },
                                ]}

                            >
                                <Text style={{
                                    color: selectedShop === item.tag ? 'white' : '#f50057',
                                    fontWeight: '500'
                                }}>
                                    {item.tag}
                                </Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.promoBox}>
                    <Text style={{ marginBottom: 4 }}>
                        🔹 Ưu đãi của <Text style={{ fontWeight: 'bold' }}>{selectedShop}</Text>:
                    </Text>
                    <Text>🔹 Giảm 30k cho đơn hàng từ 500k</Text>
                    <Text>🔹 Giảm 100k cho đơn hàng từ 1 triệu</Text>
                    <Text>🔹 Giảm 150k cho đơn hàng từ 2 triệu</Text>
                </View>

            </View>

            {/* Bảng so sánh thông tin */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
                <View style={[styles.compareTable, { width: tableWidth }]}>
                    <View style={styles.tableRow}>
                        <Text style={styles.cellHeader}>Cửa hàng</Text>
                        {sorted.map((item, idx) => (
                            <Text key={idx} style={styles.cell}>
                                {item.tag}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.cellHeader}>Chất liệu</Text>
                        {sorted.map((_, idx) => (
                            <Text key={idx} style={styles.cell}>
                                Cotton 100%
                            </Text>
                        ))}
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.cellHeader}>Kích thước</Text>
                        {sorted.map((_, idx) => (
                            <Text key={idx} style={styles.cell}>
                                160 x 200 cm
                            </Text>
                        ))}
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.cellHeader}>Màu sắc</Text>
                        {sorted.map((_, idx) => (
                            <Text key={idx} style={styles.cell}>
                                Xanh, trắng, kem
                            </Text>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default CompareResultScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: 'white', padding: 16 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    promotionSection: {
        marginTop: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        backgroundColor: '#fffafc',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    }
    ,
    subTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
    shopTabs: { flexDirection: 'row', gap: 8, marginBottom: 8 },
    shopTag: {
        backgroundColor: '#fff0f6',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#f50057',
        marginRight: 8,
    },

    separator: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 16,
    },
    promoList: { gap: 4 },
    compareTable: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        overflow: 'hidden',
        backgroundColor: 'white',
        padding: 12,
    },
    tableRow: { flexDirection: 'row', padding: 8, backgroundColor: '#fff' },
    cellHeader: { width: 100, fontWeight: 'bold' },
    cell: {
    minWidth: 100,  // 👈 thêm để đảm bảo đủ khoảng trống
    fontSize: 13,
    paddingHorizontal: 4,
},
    buyRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
},
    promoBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 4,
    marginTop: 12,
},

    buyBtn: {
    backgroundColor: '#f50057',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
},
});
