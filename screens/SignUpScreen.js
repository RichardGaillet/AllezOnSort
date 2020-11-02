import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../config/colors'

import * as firebase from 'firebase';

export default function SignUpScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [signInDisabled, setSignInDisabled] = useState(true);

    useEffect(() => {
        if (
            email.trim().length > 0 &&
            password.trim().length > 0 &&
            confirmPassword.trim().length > 0 &&
            confirmPassword === password) {
            setSignInDisabled(false)
        } else {
            setSignInDisabled(true)
        }
    }, [email, password, confirmPassword])

    const signUp = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                sendEmailVerification();
                setTimeout(navigation.navigate('SignIn'), 3000);
                console.log("signUp -> Account created!")
            })
            .catch(error => {
                setPassword("");
                setConfirmPassword("");
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log("signUp -> Error", errorCode, errorMessage)
            });
    };

    const sendEmailVerification = () => {
        firebase.auth().currentUser
            .sendEmailVerification()
            .then(() => { console.log("sendEmailVerification -> Email sent!") })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
                console.log("sendEmailVerification -> Error", errorCode, errorMessage)
            });
    }

    return (
        <View style={styles.container}>
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
                            clearButtonMode={'while-editing'}
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
                <View style={styles.textInputBox}>
                    <Text>Confirmer le mot de passe</Text>
                    <View style={styles.textInputField}>
                        <TextInput
                            color={colors.light}
                            maxLength={32}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            placeholder={'●●●●●●●●●●'}
                            placeholderTextColor={colors.placeholder}
                            returnKeyType="next"
                            secureTextEntry
                            spellCheck={false}
                            value={confirmPassword} />
                    </View>
                    <Text style={{ color: colors.secondary }}>{confirmPassword !== password && 'Mots de passe différents'}</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        accessibilityLabel="Bouton S'inscrire"
                        color={colors.secondary}
                        disabled={signInDisabled}
                        onPress={signUp}
                        title={'S\'inscrire'}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
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