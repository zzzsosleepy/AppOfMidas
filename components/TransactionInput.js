import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const TransactionInput = () => {
    return (
        <View style={styles.item}>
            <TextInput
                style={styles.input}
                placeholder="Enter transaction here"
                keyboardType="default"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 15,
        width: '90%',
    },
    input: {
        textAlign: 'center',
        maxWidth: '90%',
    }
});

export default TransactionInput