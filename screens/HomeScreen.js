import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, TextInput, Alert, Modal, Pressable, Picker } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import Task from '../components/Task'
import TransactionInput from '../components/TransactionInput'
import { collection, getDocs, addDoc, getDoc, setDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp, query, onSnapshot, where, arrayUnion } from 'firebase/firestore';
import { db, authentication } from '../firebase';

const HomeScreen = () => {

    // Set up navigation
    const navigation = useNavigation();

    // Get current date and format it
    const currentDate = new Date();
    const currentDay = currentDate.toISOString().split('T')[0];

    // STATE MANAGEMENT
    const [userBudget, setUserBudget] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [categorySelection, setCategorySelection] = useState(0);
    const [transactionName, setTransactionName] = useState('');
    const [transactionCost, setTransactionCost] = useState('');
    const [transactionType, setTransactionType] = useState('purchase');
    const [totalSpent, setTotalSpent] = useState(0);

    const [name, setName] = useState('');

    const buttonCooldown = false;
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

    const updateBalance = (trans) => {
        let total = 0;
        trans.forEach(transaction => {
            if (transaction.type === "purchase") {
                total += parseFloat(transaction.cost);
                console.log("Transaction cost: " + transaction.cost);
                console.log(total);
            } else if (transaction.type === "income") {
                total -= parseFloat(transaction.cost);
                console.log("Transaction income: " + transaction.cost);
                console.log(total);
            }
        });
        setTotalSpent(total);
    }

    const getUserInfo = async () => {
        const docRef = doc(db, "users", authentication.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUserBudget(docSnap.data().budget);
            setName(docSnap.data().name);
            setTransactions(docSnap.data().transactions);
            updateBalance(docSnap.data().transactions);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    // Sign out user
    const handleSignOut = () => {
        authentication
            .signOut()
            .then(() => {
                navigation.replace("Landing")
            })
            .catch(error => alert(error.message))
    }

    // Set the selected category's state
    const handleCategorySelection = (cat) => {
        setCategorySelection(cat);
        setCreateModalVisible(true);
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

    const prepareTransaction = async (parentButton, docRef, transType) => {
        const addedTransaction = {
            name: transactionName,
            cost: transactionCost,
            category: categorySelection,
            date: currentDay,
            color: categorySelection,
            type: transType,
        }
        setTransactions([...transactions, addedTransaction]);
        updateBalance([...transactions, addedTransaction]);
        await updateDoc(docRef, {
            transactions: arrayUnion(addedTransaction)
        })
        setCreateModalVisible(false);
        setTransactionName('');
        setTransactionCost('');
        setTimeout(() => {
            parentButton.disabled = false;
        }, 1000);
    }

    // Add transaction
    const addTransaction = async (parentButton) => {
        parentButton.disabled = true;
        const docRef = doc(db, "users", authentication.currentUser.uid);
        if (transactionName === '' || transactionCost === '' || transactionType === '') {
            Alert.alert('Please enter a transaction name, cost and category.');
        } else {
            if (transactionName.toLowerCase().includes('sold') && transactionType === 'purchase') {
                Alert.alert("Your transaction name includes the word 'sold'.", 'Would you like to set the type to income?',
                    [
                        {
                            text: 'Yes', onPress: () => {
                                setTransactionType('income');
                                prepareTransaction(parentButton, docRef, 'income');
                            }
                        },
                        {
                            text: 'No', onPress: () => {
                                setTransactionType('purchase');
                                prepareTransaction(parentButton, docRef, 'purchase');
                            }, style: "cancel"
                        },
                    ]);

            } else {
                prepareTransaction(parentButton, docRef, transactionType);
            };

        }
    }

    const updateBudget = async () => {
        const user = authentication.currentUser;
        const userDoc = doc(db, 'users', user.uid);
        const userObject = {
            budget: userBudget,
        };
        try {
            const docRef = await updateDoc(userDoc, userObject);
        }
        catch (error) {
            console.log(error);
        }
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
                            {/* <Text>Signed in as: {auth.currentUser?.email}</Text> */}
                            <Text style={styles.sectionTitle}>Hello, {name}!</Text>
                            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                                <Text style={styles.buttonText}>Sign out</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderBottomColor: 'rgba(0, 0, 0, 0.2)', borderBottomWidth: 1, paddingVertical: 5, width: '100%', }}></View>
                        {/*------------*/}

                        {/* Budget */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Budget</Text>
                            <Text>Enter your bi-weekly budget below:</Text>
                            <View style={styles.budgetInputView}>
                                <Text style={styles.currencySign}>$</Text>
                                <TextInput style={styles.budgetInput} keyboardType={'numeric'} placeholder="$$$" maxLength={10} value={userBudget.toString()} onChange={(text) => {
                                    setUserBudget(text.nativeEvent.text);
                                }} />
                                <TouchableOpacity style={styles.sectionButton} onPress={updateBudget}>
                                    <Text style={styles.buttonText}>Apply</Text></TouchableOpacity>

                            </View>
                        </View>
                        {/*------------*/}

                        {/* Remaining Balance */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Remaining Balance</Text>
                            <Text>Based on a bi-weekly budget of: ${userBudget} </Text>
                            <Text style={styles.sectionTitle}>${userBudget - totalSpent}</Text>
                        </View>
                        {/*------------*/}

                        {/* View all transactions */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >View All Transactions</Text>
                            <Text>View all transactions by clicking below:</Text>
                            <TouchableOpacity style={styles.sectionButton} onPress={() => navigation.navigate('Transactions', { transactions: transactions, userBudget: userBudget, name: name })}>
                                <Text style={styles.buttonText}>View all</Text></TouchableOpacity>
                        </View>
                        {/*------------*/}

                        {/* Create a Transaction */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Create a Transaction</Text>
                            <Text>Select a category below:</Text>
                        </View>
                        <View style={styles.createTransaction}>
                            <TransactionInput onPress={(cat) => handleCategorySelection(cat)} />
                        </View>

                        {/* Create Transaction Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={createModalVisible}
                            onRequestClose={() => {
                                setModalVisible(!createModalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={[styles.square, setModalSquareColor(categorySelection)]}>{transactionName !== '' ? <Text style={styles.tempTransInfoText}>{transactionName} {transactionCost}</Text> : null}</View>
                                    {/* Transaction name input */}
                                    <Text style={styles.modalText}>Transaction name: </Text>
                                    <TextInput style={styles.transactionInput} value={transactionName} onChange={(text) => setTransactionName(text.nativeEvent.text)}></TextInput>
                                    {/* Transaction cost input */}
                                    <Text style={styles.modalText}>Transaction cost: </Text>
                                    <TextInput style={styles.transactionInput} keyboardType={'numeric'} value={transactionCost} onChange={(text) => setTransactionCost(text.nativeEvent.text)}></TextInput>
                                    {/* Transaction type selector */}
                                    <Text style={styles.modalText}>Transaction type: </Text>
                                    <View style={styles.transactionTypeView}>
                                        <Picker
                                            selectedValue={transactionType}
                                            style={styles.selectTransactionType}
                                            onValueChange={(transType, itemIndex) => setTransactionType(transType)}
                                        >
                                            <Picker.Item label="Purchase" value="purchase" />
                                            <Picker.Item label="Income" value="income" />
                                        </Picker>
                                    </View>
                                    <View style={styles.modalButtons}>
                                        {/* Add Transaction Button */}
                                        <Pressable
                                            style={[styles.button, styles.addButton]}
                                            onPress={addTransaction}
                                        >
                                            <Text style={[styles.buttonText, styles.addButtonText]}>Add</Text>
                                        </Pressable>
                                        {/* Close Modal Button */}
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => { setCreateModalVisible(!createModalVisible); setTransactionName(''); setTransactionCost(''); }}
                                        >
                                            <Text style={styles.buttonText}>Close</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/*------------*/}

                        {/* Today's Transactions */}
                        <View style={styles.tasksWrapper}>
                            <Text style={styles.sectionTitle} >Today's Transactions</Text>
                            <Text>{currentDay}</Text>
                        </View>

                        <View style={styles.items}>
                            {/* This is where the transactions will go! */}
                            {transactions.map((transaction, index) => {
                                if (transaction.date === currentDay) {
                                    return (
                                        <Task text={transaction.name} cost={transaction.cost} key={index} color={transaction.color} type={transaction.type} />
                                    );
                                }
                            })}
                            {/* <Task text={'McDonalds'} cost={'8.21'} color={styles.redBG} type={'purchase'} />
                            <Task text={'Credit Card Payment'} cost={'55'} color={styles.greenBG} type={'purchase'} />
                            <Task text={'Amazon'} cost={'125.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Sobeys'} cost={'55.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Bitcoin'} cost={'60'} color={styles.yellowBG} type={'purchase'} />
                            <Task text={'McDonalds'} cost={'25.99'} color={styles.redBG} type={'purchase'} />
                            <Task text={'Bought a whole lotta stupid stuff online'} cost={'99.99'} color={styles.blueBG} type={'purchase'} />
                            <Task text={'Got Paid'} cost={'750.99'} color={styles.purpleBG} type={'income'} /> */}
                        </View>
                        {/*------------*/}
                    </View>
                </View >
            </ScrollView >
        </View >
    )
}

export default HomeScreen

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
    budgetInput: {
        backgroundColor: '#fff',
        padding: 5,
        paddingLeft: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginRight: 5,
        textAlign: 'left',
        width: '30%',
        borderColor: 'rgba(0,0,0,1)',
        borderBottomWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        fontSize: 18,
    },
    currencySign: {
        marginTop: 12,
        paddingRight: 5,
        fontSize: 24,
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
    sectionButton: {
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
        marginTop: 15,
    },
    addButton: {
        backgroundColor: '#ffd000',
    },
    buttonText: {
        color: '#e3e3e3',
        fontWeight: '700',
        fontSize: 16,
    },
    addButtonText: {
        color: '#171717',
    },
    body: {
        flex: 1,
    },
    transactionInput: {
        width: '75%',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    transactionTypeView: {
        width: '75%',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.1)s',
        marginBottom: 55,
    },
    selectTransactionType: {
        width: '75%',
        height: 50,
        backgroundColor: 'black',
    },
    createTransaction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        borderWidth: 10,
        borderColor: '#171717',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 30,
        paddingHorizontal: 35,
        paddingVertical: 25,
        alignItems: "center",
        shadowColor: "#000",
        width: '90%',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    modalText: {
        marginBottom: 4,
        fontSize: 18,
        textAlign: "center"
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