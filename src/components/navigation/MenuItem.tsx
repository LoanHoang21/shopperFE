import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  icon: string;
  label: string;
}

const MenuItem: React.FC<Props> = ({ icon, label }) => {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
});
