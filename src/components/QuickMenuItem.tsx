import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Props {
  icon: any;
  label: string;
  borderColor: string;
}

const QuickMenuItem: React.FC<Props> = ({ icon, label, borderColor }) => {
  return (
    <View style={styles.item}>
      <View style={[styles.iconBox, { borderColor }]}>
        <Image source={icon} style={{ width: 24, height: 24 }} resizeMode="contain" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default QuickMenuItem;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    width: 78,
  },
  iconBox: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginBottom: 6,
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
    fontWeight:'600'
  },
});
