import React from 'react'
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native'

const TransactionInput = (props) => {
    return (
        <View style={styles.item}>
            <Pressable
                style={styles.button}
                onPress={() => props.onPress(1)}
            >
                <View style={[styles.square, styles.redBG]}></View>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => props.onPress(2)}
            >
                <View style={[styles.square, styles.blueBG]}></View>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => props.onPress(3)}
            >
                <View style={[styles.square, styles.greenBG]}></View>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => props.onPress(4)}
            >
                <View style={[styles.square, styles.yellowBG]}></View>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => props.onPress(5)}
            >
                <View style={[styles.square, styles.purpleBG]}></View>
            </Pressable>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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