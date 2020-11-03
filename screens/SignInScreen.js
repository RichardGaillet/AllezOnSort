import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../config/colors'

import * as firebase from 'firebase';

export default function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInDisabled, setSignInDisabled] = useState(true);

    useEffect(() => {
        if (email.trim().length > 0 && password.trim().length > 0) {
            setSignInDisabled(false)
        } else {
            setSignInDisabled(true)
        }
    }, [email, password])

    const signIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("TCL: signIn -> Logged in !")
                navigation.navigate('Home', { 'loggedIn': true })
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log("TCL: signIn -> errorCode", errorCode, errorMessage)
                setPassword("")
            });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.textInputBox}>
                        <Text>Adresse email</Text>
                        <View style={styles.textInputField}>
                            <TextInput
                                autoCapitalize={'none'}
                                autoCompleteType={'email'}
                                blurOnSubmit
                                color={colors.light}
                                keyboardType={'email-address'}
                                maxLength={64}
                                onChangeText={email => setEmail(email)}
                                placeholder={'exemple.adresse@email.com'}
                                placeholderTextColor={colors.placeholder}
                                returnKeyType="next"
                                selectionColor={colors.light}
                                spellCheck={false}
                                textContentType={'emailAddress'}
                                value={email} />
                        </View>
                    </View>
                    <View style={styles.textInputBox}>
                        <Text>Mot de passe</Text>
                        <View style={styles.textInputField}>
                            <TextInput
                                color={colors.light}
                                maxLength={32}
                                onChangeText={password => setPassword(password)}
                                placeholder={'●●●●●●●●●●'}
                                placeholderTextColor={colors.placeholder}
                                returnKeyType="next"
                                secureTextEntry
                                spellCheck={false}
                                value={password} />
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Button
                            color={colors.secondary}
                            disabled={signInDisabled}
                            onPress={signIn}
                            title={'Se connecter'}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    textInputField: {
        backgroundColor: colors.secondary,
        borderBottomWidth: 2,
        borderRadius: 2,
        borderColor: colors.primary,
        color: colors.light,
        padding: 8,
    },
    textInputBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        padding: 8,
    },
})