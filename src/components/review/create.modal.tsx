import { Alert, Button, Modal, StyleSheet, Text, View } from "react-native";
// import { AntDesign } from '@expo/vector-icons';
import Icon from '@react-native-vector-icons/ant-design';
// import { Icon } from "react-native-elements";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        // flex: 1,
        // padding: 10,
        backgroundColor: "#fff",
        height: 500,
        borderWidth: 1, 
        borderColor: "red",
        // alignItems: "center"
        // justifyContent: "center"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical: 10,
        marginBottom: 20
    },

    groupInput: {
        marginBottom: 15
    },

    text: {
        fontSize: 20,
        fontWeight: "400"
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    }

})

interface IProps {
    modalVisible: boolean;
    setModalVisible: (v: boolean) => void;
    addNew: any;
}
const CreateModal = (props: IProps) => {
    const { modalVisible, setModalVisible, addNew } = props;
    const [title, setTitle] = useState("");
    const [star, setStar] = useState("");

    function randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const handleSubmit = () => {
        if (!title) {
            Alert.alert("Thông tin không hợp lệ", "Nội dung không được để trống")
            return;
        }

        if (!star) {
            Alert.alert("Thông tin không hợp lệ", "Rating không được để trống")
            return;
        }

        addNew({
            id: randomInteger(2, 2000000),
            title,
            star
        })

        setModalVisible(false);
        setStar("");
        setTitle("")

    }
    return (
        <GestureHandlerRootView style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                
            >
                <View style={styles.container}>
                    {/* header */}
                    <View style={styles.header}>
                        <Text style={{ fontSize: 25 }}>Create a review</Text>
                        <Icon
                            onPress={() => {
                                setModalVisible(false);
                                setTitle("");
                                setStar("");
                            }}
                            name="close" size={24} color="black" />
                    </View>

                    {/* body */}
                    <View>
                        <View style={styles.groupInput}>
                            <Text style={styles.text}>Nội dung</Text>
                            <TextInput
                                value={title}
                                style={styles.input}
                                onChangeText={(v) => setTitle(v)}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Rating</Text>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.input}
                                value={star}
                                onChangeText={(v) => setStar(v)}
                            />
                        </View>

                    </View>
                    {/* footer */}
                    <View style={{ marginTop: 20 }}>
                        <Button title="Add"
                            onPress={() => handleSubmit()}
                        />
                    </View>
                </View>
            </Modal>

        </GestureHandlerRootView>
    )
}

export default CreateModal;