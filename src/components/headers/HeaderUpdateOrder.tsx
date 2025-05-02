import { Image, StyleSheet, Text, View } from "react-native";
import Icon from '@react-native-vector-icons/ant-design';
import { useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/data";

// type NotiRouteProp = RouteProp<RootStackParamList, 'promotionNotification'>;
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const HeaderUpdateOrder = () => {
    const navigation = useNavigation<NavigationType>();
    // const route = useRoute<NotiRouteProp>();
    // const id = route.params?.id;
    // const type = route.params?.type;
    // const quantity = route.params?.quantity;
    // const [isActiveNoti, setIsActiveNoti] = useState(true);
        
    return (
        <View style={styles.header}>
            <Icon
                name="arrow-left"
                size={24}
                color="#ff3366"
                style={styles.backIcon}
                onPress={() => navigation.navigate("updateOrder")}
            />
            <Text style={styles.headerTitle}>Cập nhật đơn hàng</Text>
        </View>
    );
};
export default HeaderUpdateOrder;

const styles = StyleSheet.create({
    header: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    backIcon: {
        position: 'absolute',
        left: 15,
        top: 50,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ff3366',
        textAlign: 'center',
    },
});
