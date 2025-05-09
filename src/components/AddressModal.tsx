import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export interface AddressData {
    _id: string;
    receiver: string;
    phone: string;
    country: string;
    city: string;
    primary: string;
    street: string;
    isDefault: boolean;
}

interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (data: AddressData) => void;
    defaultValue?: AddressData | null;
}

const AddressModal = ({ visible, onClose, onSave, defaultValue }: AddressModalProps) => {
    const [form, setForm] = useState<AddressData>({
        receiver: '',
        phone: '',
        country: '',
        city: '',
        primary: '',
        street: '',
        isDefault: false,
    });

    useEffect(() => {
        if (defaultValue) {
            setForm(defaultValue);
        } else {
            setForm({
                receiver: '',
                phone: '',
                country: '',
                city: '',
                primary: '',
                street: '',
                isDefault: false,
            });
        }
    }, [visible, defaultValue]);

    const handleChange = (key: keyof AddressData, value: any) => {
        setForm({ ...form, [key]: value });
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <ScrollView>
                        <Text style={styles.title}>Địa chỉ của bạn</Text>

                        {[
                            { key: 'receiver', label: 'Người nhận' },
                            { key: 'phone', label: 'Số điện thoại' },
                            { key: 'country', label: 'Quốc gia' },
                            { key: 'city', label: 'Thành phố' },
                            { key: 'primary', label: 'Phường/Xã' },
                            { key: 'street', label: 'Số nhà, đường' },
                        ].map(({ key, label }) => (
                            <TextInput
                                key={key}
                                placeholder={label}
                                style={styles.input}
                                value={form[key as keyof AddressData]}
                                onChangeText={(text) => handleChange(key as keyof AddressData, text)}
                            />
                        ))}

                        <View style={styles.checkboxContainer}>
                            <TouchableOpacity onPress={() => handleChange('isDefault', !form.isDefault)}>
                                <View style={[styles.checkbox, form.isDefault && styles.checkboxChecked]} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 10 }}>Đặt làm địa chỉ mặc định</Text>
                        </View>

                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.cancel} onPress={onClose}>
                                <Text>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.save} onPress={() => onSave(form)}>
                                <Text style={{ color: 'white' }}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default AddressModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    modal: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        maxHeight: '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',
    },
    checkbox: {
        width: 20, height: 20, borderWidth: 1, borderColor: '#333', borderRadius: 3,
    },
    checkboxChecked: {
        backgroundColor: '#F1215A',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    cancel: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    save: {
        padding: 10,
        backgroundColor: '#F1215A',
        borderRadius: 5,
    },
});
