import { useRef } from 'react';
import { Text, View, DrawerLayoutAndroid, StyleSheet } from 'react-native';
import RouterMain from '../RouterMain';

const AppNavigation = () => {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => (
    <View>
      <Text style={styles.paragraph}>Home</Text>
      <Text style={styles.paragraph}>About</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <RouterMain />
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default AppNavigation;
