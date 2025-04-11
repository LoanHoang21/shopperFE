import { StyleSheet, Text, View } from "react-native"
import { globalStyles } from "../../utils/const";

const styles = StyleSheet.create({
    about: {
        fontSize: 30,
        padding: 15
    },
    about1: {
        fontSize: 20,
        padding: 15
    }
})
const AboutScreen = () => {
    return (
        <View>
            <Text style={[styles.about, globalStyles.globalFont]}>
                About Review App
            </Text>
            <Text style={[styles.about1, globalStyles.globalFont]}>
                Made by Hỏi Dân IT
            </Text>
        </View>
    )
}


export default AboutScreen;