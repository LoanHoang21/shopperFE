import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../review/home';
import DetailScreen from '../review/detail';
// import AboutScreen from '../review/about';
import AppHeader from './app.header';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from '../review/about';
import { useRef } from 'react';
import { Button, StyleSheet, Text, View, DrawerLayoutAndroid } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

const HomeLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
      // <NavigationContainer>
        <Stack.Navigator
        // screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="home"
                component={HomeScreen}
                options={{ header: () => <AppHeader /> }}
            />
            <Stack.Screen
                name="review-detail"
                component={DetailScreen}
                options={{ title: 'Chi tiết Review' }}
            />
        </Stack.Navigator>
      // </NavigationContainer>
    )
}
const AppNavigation = () => {
    // return (
    //     <HomeLayout/>
    // );
    // const Drawer = createDrawerNavigator();
    const drawer = useRef<DrawerLayoutAndroid>(null);

    // const navigationView = () => (
    //     <View style={[styles.container, styles.navigationContainer]}>
    //       <Text style={styles.paragraph}>I'm in the Drawer!</Text>
    //       <Button
    //         title="Close drawer"
    //         onPress={() => drawer.current?.closeDrawer()}
    //       />
    //     </View>
    //   );
    const navigationView = () => (
        // <View style={[styles.container, styles.navigationContainer]}>
        //   <Text style={styles.paragraph}>I'm in the Drawer!</Text>
        //   <Button
        //     title="Close drawer"
        //     onPress={() => drawer.current?.closeDrawer()}
        //   />
        // </View>
        <View>
            <Text style={styles.paragraph}> home</Text>
            <Text style={styles.paragraph}> About</Text>
        </View>
      );
    return (
        // <Drawer.Navigator
        // >
        //     <Drawer.Screen name="home"
        //         options={{ title: 'Trang chủ', header: () => <></> }}
        //         component={HomeLayout} />
        //     <Drawer.Screen
        //         name="about" component={AboutScreen}
        //         options={{
        //             title: 'Thông tin',
        //             header: () => <AppHeader />
        //         }}
        //     />
        // </Drawer.Navigator>
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition="left"
            renderNavigationView={navigationView}
        >
            <HomeLayout/>
      {/* <View style={styles.container}>
        <Text style={styles.paragraph}>Drawer on the left!</Text>
        <Button
          title="Change Drawer Position"
          onPress={() => <></>}
        />
        <Text style={styles.paragraph}>
          Swipe from the side or press button below to see it!
        </Text>
        <Button
          title="Open drawer"
          onPress={() => drawer.current?.openDrawer()}
        />
      </View> */}
    </DrawerLayoutAndroid>
    )
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
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