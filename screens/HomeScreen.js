import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core';
import Task from '../components/Task'
import TransactionInput from '../components/TransactionInput'

const HomeScreen = () => {


    const navigation = useNavigation();
    const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];


    const auth = getAuth();
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <StatusBar
                backgroundColor="#171717"
                barStyle="light-content"
            />

            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.body}>

                        <View style={styles.header}>
                            {/* <Text>Signed in as: {auth.currentUser?.email}</Text> */}
                            <Text style={styles.sectionTitle}>Hello, Jeffrey!</Text>
                            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                                <Text style={styles.buttonText}>Sign out</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Budget */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Budget</Text>
                        </View>

                        {/* Savings */}

                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Savings</Text>
                        </View>

                        {/* Create a Transaction */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Create a Transaction</Text>
                            <Text>Select a category below:</Text>
                        </View>
                        <View style={styles.createTransaction}>
                            <TransactionInput />
                        </View>

                        {/* Today's Transactions */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Today's Transactions</Text>
                            <Text>{currentDay}</Text>
                        </View>

                        <View style={styles.items}>
                            {/* This is where the transactions will go! */}
                            <Task text={'McDonalds'} cost={'8.21'} color={styles.redBG} type={'purchase'} />
                            <Task text={'Credit Card Payment'} cost={'55'} color={styles.greenBG} type={'purchase'} />
                            <Task text={'Amazon'} cost={'125.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Sobeys'} cost={'55.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Bitcoin'} cost={'60'} color={styles.yellowBG} type={'purchase'} />
                            <Task text={'McDonalds'} cost={'25.99'} color={styles.redBG} type={'purchase'} />
                            <Task text={'Bought a whole lotta stupid stuff online'} cost={'99.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Got Paid'} cost={'750.99'} color={styles.purpleBG} type={'income'} />
                        </View>
                    </View>
                </View >
            </ScrollView >
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#ffd000',
        justifyContent: 'flex-end',
        height: '100%',
    },
    button: {
        backgroundColor: '#171717',
        width: '30%',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#e3e3e3',
        fontWeight: '700',
        fontSize: 16,
    },
    body: {
        flex: 1,
    },
    createTransaction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tasksWrapper: {
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#171717',
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
    }
})