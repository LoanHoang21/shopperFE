import { StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/data';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const HeaderUpdateOrder = () => {
    const navigation = useNavigation<NavigationType>();

    return (
        <View style={styles.header}>
            <Icon
                name="arrow-left"
                size={24}
                color="#ff3366"
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerTitle}>Cập nhật đơn hàng</Text>
        </View>
    );
};
export default HeaderUpdateOrder;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    backIcon: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ff3366',
    },
});
