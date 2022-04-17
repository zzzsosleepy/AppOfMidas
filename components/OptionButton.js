import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const OptionButton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.circular}></View>
            <View style={styles.circular}></View>
            <View style={styles.circular}></View>
        </View>
    )
}

export default OptionButton

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circular: {
        width: 5,
        height: 5,
        backgroundColor: '#aaa',
        borderRadius: 30,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 2,
    },
});