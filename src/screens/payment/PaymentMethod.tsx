import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/data';
import { API_BASE_URL } from '../../utils/const';

type PaymentMethodRouteProp = RouteProp<RootStackParamList, 'paymentMethod'>; 

const PaymentMethod = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute<PaymentMethodRouteProp>();
  const { product } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/payment-method`);
        setPaymentMethods(res.data.data || []);
      } catch (err) {
        console.error('Error fetching payment methods:', err);
        Alert.alert('Lỗi', 'Không lấy được danh sách phương thức thanh toán');
      } finally {
        setLoading(false);
      }
    };

    fetchMethods();
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (!selectedId) {
      Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán');
      return;
    }

    navigation.navigate('payment', { paymentMethodId: selectedId, product });
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 12 }}>
      <Text style={styles.groupTitle}>Chọn phương thức thanh toán</Text>

      {paymentMethods.map((item) => (
        <TouchableOpacity
          key={item._id}
          style={styles.radioRow}
          onPress={() => handleSelect(item._id)}
        >
          <Text style={{
            fontWeight: 'bold',
            marginBottom: 15,
            fontSize: 15,
          }}>{item.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.label}>{item.name}</Text>
          <View style={[styles.circle, selectedId === item._id && styles.circleSelected]}>
            {selectedId === item._id && <View style={styles.innerCircle} />}
          </View>

          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  groupTitle: {
    fontWeight: 'bold',
    marginVertical: 12,
    fontSize: 16,
  },
  radioRow: {
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSelected: {
    borderColor: '#F1215A',
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F1215A',
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#F1215A',
    marginTop: 30,
    borderRadius: 5,
  },
  confirmText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default PaymentMethod;
