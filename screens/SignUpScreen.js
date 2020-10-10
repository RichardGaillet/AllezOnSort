import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SignInScreen() {

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

    const submitLogin = () => {
        setConfirmPassword('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoCatchPhrase}>
                <Image
                    accessibilityLabel={'Logo AOS'}
                    source={require('../assets/logo_aos.png')}
                />
                <Text>Allez, On Sort !</Text>
            </View>
            <View>
                <View style={styles.textInputBox}>
                    <Text>Adresse email</Text>
                    <View style={styles.textInputField}>
                        <TextInput
                            autoCapitalize={'none'}
                            autoCompleteType={'email'}
                            autoFocus
                            blurOnSubmit
                            color={'#fff'}
                            keyboardType={'email-address'}
                            maxLength={64}
                            onChangeText={email => setEmail(email)}
                            placeholder={'exemple.adresse@email.com'}
                            placeholderTextColor={'#dfdfdf'}
                            returnKeyType="next"
                            selectionColor={'#fff'}
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
                            color={'#fff'}
                            maxLength={32}
                            onChangeText={password => setPassword(password)}
                            placeholder={'●●●●●●●●●●'}
                            placeholderTextColor={'#dfdfdf'}
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
                            color={'#fff'}
                            maxLength={32}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            placeholder={'●●●●●●●●●●'}
                            placeholderTextColor={'#dfdfdf'}
                            returnKeyType="next"
                            secureTextEntry
                            spellCheck={false}
                            value={confirmPassword} />
                    </View>
                    <Text style={{ color: 'red' }}>{confirmPassword !== password && 'Mots de passe différents'}</Text>
                </View>
                <View style={styles.button}>
                    <Button
                        accessibilityLabel="Bouton S'inscrire"
                        color='#fb483e'
                        disabled={signInDisabled}
                        onPress={() => { submitLogin() }}
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
    logoCatchPhrase: {
        alignItems: 'center',
    },
    textInputField: {
        backgroundColor: '#9000ae',
        borderBottomWidth: 2,
        borderRadius: 2,
        borderColor: '#fb483e',
        color: '#fff',
        padding: 8,
    },
    textInputBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        padding: 8,
    },
})