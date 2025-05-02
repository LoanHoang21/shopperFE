import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentMethod = () => {
  const [selectedId, setSelectedId] = useState<string>('cod');
  const navigation = useNavigation();

  const handleSelect = (id: string) => {
    setSelectedId(id);
    console.log('Selected:', id);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 12 }}>
      {paymentData.map((group, gIndex) => (
        <View key={gIndex} style={styles.groupContainer}>
          <Text style={styles.groupTitle}>{group.title}</Text>

          {group.methods.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.radioRow}
              onPress={() => handleSelect(item.id)}
            >
              <Text style={styles.label}>{item.name}</Text>

              <View
                style={[
                  styles.circle,
                  selectedId === item.id && styles.circleSelected,
                ]}
              >
                {selectedId === item.id && <View style={styles.innerCircle} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity style={{ width: '100%', paddingVertical: 15, backgroundColor: '#F1215A', marginTop: 30 }} onPress={() => navigation.navigate('payment')}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const paymentData = [
  {
    title: 'Ví điện tử',
    methods: [
      { id: 'paypal', name: 'Paypal' }
    ],
  },
  {
    title: 'Thanh toán khi nhận hàng',
    methods: [{ id: 'cod', name: 'Thanh toán khi nhận hàng' }],
  },
  {
    title: 'Thẻ ATM (Internet Banking)',
    methods: [{ id: 'atm', name: 'Thẻ ATM (Internet Banking)' }],
  },
];

const styles = StyleSheet.create({
  groupContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 5,
  },
  groupTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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
});

export default PaymentMethod;
