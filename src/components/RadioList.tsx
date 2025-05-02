import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Item = {
    id: string;
    name: string;
};

type RadioListProps = {
    data: Item[];
    onChange: (id: string) => void;
};

const RadioList = ({ data, onChange }: RadioListProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        onChange(id);
    };

    return (
        <View>
            {data.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelect(item.id)}
                    style={styles.itemRow}
                >
                    <View style={[styles.circle, selectedId === item.id && styles.circleSelected]}>
                        {selectedId === item.id && <Text style={styles.check}>✔</Text>}
                    </View>


                    <Text style={styles.label}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default RadioList;

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleSelected: {
        backgroundColor: '#F1215A',
        borderColor: '#F1215A',
    },
    check: {
        color: '#fff',
        fontSize: 12,
    },
    label: {
        fontSize: 14,
    },
});
