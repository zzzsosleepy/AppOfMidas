import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, StatusBar, ScrollView } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, authentication } from '../firebase';
import { useNavigation } from '@react-navigation/core';

const RegisterScreen = () => {
    // State management
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Set up navigation
    const navigation = useNavigation();

    // If the user is signed in, navigate to the HomeScreen
    useEffect(() => {
        const unsubscribe = authentication.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const addUserToDB = async () => {
        const user = authentication.currentUser;
        const userDoc = doc(db, 'users', user.uid);
        const userObject = {
            name: name,
            email: email,
            password: password,
            budget: 0,
            transactionIDs: [],
            createdAt: serverTimestamp()
        };
        const docRef = await setDoc(userDoc, userObject)
        console.log(`Registering user ${name} with email ${email}`);
    }

    // Register the user and sign them in
    const handleSignUp = () => {
        createUserWithEmailAndPassword(authentication, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                addUserToDB();
                console.log('Registered with:', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView contentContainerStyle={styles.mainView}>
            {/* Status bar coloring */}
            <StatusBar
                backgroundColor="#171717"
                barStyle="light-content"
            />
            {/* Landing page */}
            <KeyboardAvoidingView style={styles.container} behavior={'height'} enabled={false}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.header}>APP OF MIDAS</Text>
                        <Image
                            style={styles.heroImage}
                            source={require('../assets/coin.png')}
                        />
                        {/* User Registration */}
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                        {/*------------*/}
                    </View>
                </TouchableWithoutFeedback>

                {/* Register Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
                {/*------------*/}

                {/* Footer */}
                <Text>Created by Jeffrey Chipman 2022</Text>
                {/*------------*/}
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#ffd000',
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    heroImage: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#171717',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#ffd000',
        marginTop: 5,
        borderColor: '#171717',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#171717',
        fontWeight: '700',
        fontSize: 16,
    },
})