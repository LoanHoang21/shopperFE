import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { RootStackParamList } from "../routers/AppNavigator";
// import { Icon } from "@react-navigation/elements";
// import { StyleSheet } from "react-native";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
              <Text style={styles.text}>🛒 Đây là trang Giỏ hàng</Text>
              <Button title="Quay về Home" onPress={() => navigation.goBack()} />
            </View>
    );
}

const styles = StyleSheet.create({
	container: {
        borderWidth: 1,
        borderColor: "red",
    },
    text: {
        
    }
});

export default Login;