import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'

const TransactionInput = () => {
    return (
        <View style={styles.item}>
            <View style={[styles.square, styles.redBG]}></View>
            <View style={[styles.square, styles.blueBG]}></View>
            <View style={[styles.square, styles.greenBG]}></View>
            <View style={[styles.square, styles.yellowBG]}></View>
            <View style={[styles.square, styles.purpleBG]}></View>
            <View style={[styles.square, styles.emptyBG]}><Text style={styles.addCategoryText}>+</Text></View>
            {/* <TextInput
                style={styles.input}
                placeholder="Enter transaction here"
                keyboardType="default"
            /> */}
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
        justifyContent: 'flex-start',
        marginBottom: 15,
        width: '90%',
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 15,
    },
    input: {
        textAlign: 'center',
        maxWidth: '90%',
    },
    square: {
        width: 32,
        height: 32,
        opacity: 1,
        borderRadius: 10,
        marginRight: 15,
        borderColor: '#171717',
        borderWidth: 2,
    },
    addCategoryText: {
        fontSize: 24,
        color: '#171717',
        textAlign: 'center',
        textAlignVertical: 'center',
        lineHeight: 28,
    },
    redBG: {
        backgroundColor: '#FF5A5F',
    },
    blueBG: {
        backgroundColor: '#55BCF6',
    },
    greenBG: {
        backgroundColor: '#32a852',
    },
    yellowBG: {
        backgroundColor: '#fcba03',
    },
    purpleBG: {
        backgroundColor: '#9c27b0',
    },
    emptyBG: {
        backgroundColor: 'rgba(0,0,0,0)',
    }

});

export default TransactionInput