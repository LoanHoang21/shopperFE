import { DrawerLayoutAndroid, StyleSheet, Text, View } from "react-native";
// import { MaterialIcons } from '@expo/vector-icons';
// import {MaterialIcons} from 'react-native-vector-icons/';
import Icon from '@react-native-vector-icons/ant-design';
// import { globalStyles } from "../../utils/const";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { useRef } from "react";
// import { NavigationProp, useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#ccc",
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: "center",
        // paddingTop: 40
    },
    headerText: {
        flex: 1,
        textAlign: "center",
        fontSize: 25,
    }
})
const AppHeader = (props: any) => {
    // const navigation: any = useNavigation();
    const drawer = useRef<DrawerLayoutAndroid>(props);
    return (
        <View style={styles.container}>
            {/* <MaterialIcons
                name="menu" size={40}
                color="black"
                onPress={() => { navigation.openDrawer() }}
            /> */}
            <Icon name="menu" size={40}
                color="black"
                onPress={() => { drawer.current?.openDrawer()}}/>
            <Text style={[styles.headerText, 
                // globalStyles.globalFont
                ]}>Hoidanit App</Text>
        </View>
    )
}

export default AppHeader;