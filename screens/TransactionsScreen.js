import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert, Modal, Pressable, Picker } from 'react-native'
import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, getDoc, setDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot, where, arrayUnion } from 'firebase/firestore';
import Task from '../components/Task'
import { db, authentication } from '../firebase';



const TransactionsScreen = ({ route, navigation }) => {


    // Get current date and format it
    const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];

    // STATE MANAGEMENT
    const [userBudget, setUserBudget] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [transactionCache, setTransactionCache] = useState([]);
    const [name, setName] = useState('');
    const [totalSpent, setTotalSpent] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0);

    let cancel = false;

    useEffect(() => {
        if (!cancel) {
            getUserInfo();
        }
        return () => {
            // cleanup
            cancel = true;
        }
    }, []);

    // Update the user's remaining balance
    const updateBalance = (trans, budget) => {
        let total = 0;
        trans.forEach(transaction => {
            if (transaction.type === "purchase") {
                total += parseFloat(transaction.cost);
            } else if (transaction.type === "income") {
                total -= parseFloat(transaction.cost);
            }
        });
        setTotalSpent(total);
        setRemainingBalance(budget - (total * 1));
    }

    // Get the user's budget and transactions and name
    const getUserInfo = () => {
        const docSnap = route.params.userDoc;
        setUserBudget(docSnap.budget);
        setName(docSnap.name);
        setTransactions(docSnap.transactions);
        setTransactionCache(docSnap.transactions)
        updateBalance(docSnap.transactions, docSnap.budget);
    }

    // Sign out user
    const handleSignOut = () => {
        authentication
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const searchForTransactions = (transactionName) => {
        if (transactionName === "" && transactionCache.length > 0) {
            setTransactions(transactionCache);
        } else {
            let filteredTransactions = transactions.filter(transaction => {
                return transaction.name.toLowerCase().includes(transactionName.toLowerCase());
            });
            setTransactions(filteredTransactions);
        }
    }

    const setModalSquareColor = (catColor) => {
        var selectedColor = '#fff';
        switch (catColor) {
            case 1:
                selectedColor = styles.redBG.backgroundColor;
                break;
            case 2:
                selectedColor = styles.blueBG.backgroundColor;
                break;
            case 3:
                selectedColor = styles.greenBG.backgroundColor;
                break;
            case 4:
                selectedColor = styles.yellowBG.backgroundColor;
                break;
            case 5:
                selectedColor = styles.purpleBG.backgroundColor;
                break;
            case 6:
                break;
        }
        return {
            backgroundColor: selectedColor,
        }
    }

    // Delete a transaction
    const deleteTransaction = async (transaction) => {
        console.log("Deleting transaction");
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const newTransactions = transactions.filter(
            (item) => item != transaction
        );
        setTransactions(newTransactions);
        updateBalance(newTransactions, userBudget);
        await updateDoc(docRef, {
            transactions: newTransactions
        })
        route.params.setTransactionList(newTransactions);
    }

    return (
        <View style={styles.mainView}>
            {/* Status bar coloring */}
            <StatusBar
                backgroundColor="#171717"
                barStyle="light-content"
            />

            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.body}>

                        {/* HEADER / SIGN OUT */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                                <Text style={styles.buttonText}>Sign out</Text>
                            </TouchableOpacity>
                        </View>
                        {/*------------*/}

                        {/* HEADER / SIGN OUT */}
                        <View style={styles.header}>
                            <Text style={styles.sectionTitle}>Hello, {name}!</Text>
                        </View>
                        <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, paddingVertical: 5, width: '100%', }}></View>
                        {/*------------*/}

                        {/* Remaining Balance */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Remaining Balance</Text>
                            <Text>Based on a bi-weekly budget of: ${userBudget} </Text>
                            <Text style={styles.sectionTitle}>${remainingBalance.toFixed(2)}</Text>
                        </View>
                        {/*------------*/}

                        {/* Search Transactions */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle}>Search Transactions</Text>
                            <Text>Enter a query below to search by transaction name</Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search"
                                onChangeText={(text) => {
                                    searchForTransactions(text);
                                }}
                            />
                        </View>
                        {/*------------*/}

                        {/* All Transactions */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >All Transactions</Text>
                            <Text>{currentDay}</Text>
                        </View>

                        <View style={styles.items}>
                            {/* This is where the transactions will go! */}
                            {transactions.map((transaction, index) => {
                                return (
                                    <View key={index} style={{ borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, paddingVertical: 5, }}>
                                        <Text style={styles.transactionDateText}>{transaction.date}</Text>
                                        <Task text={transaction.name} cost={transaction.cost} key={index} color={transaction.color} type={transaction.type} time={transaction.time} showTooltip={true} deleteTransaction={() => deleteTransaction(transaction)} />
                                    </View>
                                );
                            })}
                        </View>
                        {/*------------*/}
                    </View>
                </View >
            </ScrollView >
        </View>
    )
}

export default TransactionsScreen

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: '#ffd000',
    },
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
    budgetInputView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#171717',
        width: '30%',
        padding: 8,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    searchInput: {
        borderColor: '#171717',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        marginBottom: 10,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonText: {
        color: '#e3e3e3',
        fontWeight: '700',
        fontSize: 16,
    },
    body: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    square: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 64,
        opacity: 1,
        borderRadius: 10,
        borderColor: '#171717',
        borderWidth: 2,
        marginBottom: 15,
    },
    tempTransInfoText: {
        backgroundColor: '#171717',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontSize: 18,
        color: '#fff',
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
    transactionDateText: {
        fontSize: 16,
        color: '#171717',
        paddingHorizontal: 35,
        textAlign: 'right',
        fontWeight: 'bold',
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