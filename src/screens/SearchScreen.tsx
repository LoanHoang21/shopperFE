import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const keywordSuggestions = ['Chăn ga gối đệm', 'Chăn ga', 'Chăn', 'Chăn ấm'];
const productSuggestions = [
  { title: 'Chăn ga', image: 'https://i.imgur.com/kGkSg1v.png' },
  { title: 'Sáp thơm', image: 'https://i.imgur.com/OoE2t9g.png' },
  { title: 'Quà tặng', image: 'https://i.imgur.com/b8dKxHZ.png' },
  { title: 'Valentine', image: 'https://i.imgur.com/tRg5lIN.png' },
];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Tìm:', query);
    // navigation.navigate('SearchResult', { query });
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#f50057" style={{ marginRight: 10 }} />
        </TouchableOpacity>

        <View style={styles.searchBox}>
          <Icon name="search" size={16} color="#999" style={{ marginHorizontal: 6 }} />
          <TextInput
            style={styles.input}
            placeholder="Happy Bedding"
            value={query}
            onChangeText={setQuery}
          />
          <Icon name="camera" size={16} color="#f50057" style={{ marginHorizontal: 6 }} />
        </View>

        <TouchableOpacity onPress={handleSearch} style={styles.searchBtn}>
          <Icon name="search" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* Gợi ý từ khóa */}
      <View style={{ marginTop: 16 }}>
        {keywordSuggestions.map((item, idx) => (
          <TouchableOpacity key={idx}>
            <Text style={styles.keyword}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity>
          <Text style={styles.seeMore}>Xem thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Gợi ý tìm kiếm */}
      <Text style={styles.sectionTitle}>Gợi ý tìm kiếm</Text>
      <View style={styles.grid}>
        {productSuggestions.map((item, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 8,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  searchBtn: {
    backgroundColor: '#f50057',
    borderRadius: 20,
    padding: 10,
  },
  keyword: {
    paddingVertical: 8,
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    color: '#333',
  },
  seeMore: {
    color: '#f50057',
    marginTop: 6,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    padding: 8,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 80,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
});
