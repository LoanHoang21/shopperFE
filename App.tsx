// // import { useFonts } from 'expo-font';
// // import * as SplashScreen from 'expo-splash-screen';
// // import { useEffect } from 'react';
// // import { OPENSANS_REGULAR } from "./src/utils/const";

import {SafeAreaView, StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/components/navigation/app.navigation';
import Loading from './src/screens/Loading';
import { useEffect, useState } from 'react';

// // import { Text } from 'react-native-elements';

// SplashScreen.preventAutoHideAsync();
const App = () => {
  // const [loaded, error] = useFonts({
  //     [OPENSANS_REGULAR]: require('./assets/fonts/OpenSans-Regular.ttf'),
  // });

  // useEffect(() => {
  //     if (loaded || error) {
  //         SplashScreen.hideAsync();
  //     }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //     return null;
  // }
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Đợi 2 giây

    return () => clearTimeout(timer); // Clear timer nếu component unmount
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1}}>
      {/* <StatusBar animated={true}
            backgroundColor="white"
            barStyle="dark-content"
        //   barStyle={statusBarStyle}
        //   showHideTransition={statusBarTransition}
        //   hidden={hidden}
          /> */}
      <NavigationContainer>
        {/* <AppNavigation/>               */}
        {isLoading ? <Loading /> : <AppNavigation />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

// const App = () => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <AppNavigation/>
//     </SafeAreaView>
//   );
// }

// export default App;
