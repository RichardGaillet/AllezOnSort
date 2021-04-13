import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, Snackbar, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../config/colors';

import * as firebase from 'firebase';

export default function SignInScreen({ navigation }) {

    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    const signIn = (values) => {
        const { email, password } = values;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("signIn -> Logged in !")
                navigation.navigate('Home', { 'loggedIn': true })
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        alert("L'adresse e-mail n'est pas valide.");
                        break;
                    case 'auth/wrong-password':
                        alert("Le mot de passe est incorrect.");
                        break;
                    case 'auth/user-disabled':
                        alert("L'utilisateur correspondant à l'email donné a été désactivé.");
                        break;
                    case 'auth/user-not-found':
                        alert("Il n'y a aucun utilisateur correspondant à l'email donné.");
                        break;
                    default: alert("Un erreur est survenue, veuillez réessayer un peu plus tard.");
                        break;
                }

                console.log("signIn -> errorCode", errorCode, errorMessage);
            });
    };

    const initialValues = {
        email: '',
        password: '',
    };

    const signInSchema = yup.object().shape({
        email: yup.string().email("L'email doit être valide")
            .required("Email obligatoire"),
        password: yup.string()
            .min(6, "Minimum 6 caractères")
            .max(16, "Maximum 16 caractères")
            .trim().required('Mot de passe obligatoire'),
    });

    const sendPasswordResetEmailSchema = yup.object().shape({
        email: yup.string().email("L'email doit être valide")
            .required("Email obligatoire"),
    });

    const [isForgottenPassword, setIsForgottenPassword] = useState(false);

    const sendPasswordResetEmail = (email) => {
        firebase.auth().sendPasswordResetEmail(
            email)
            .then(() => {
                setSnackbarMessage(`Vérifier la boîte email ${email} !`)
                onToggleSnackBar()
                setIsForgottenPassword(!isForgottenPassword)
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/invalid-email':
                        alert("L'adresse e-mail n'est pas valide.");
                        break;
                    case 'auth/user-not-found':
                        alert("Il n'y a aucun utilisateur correspondant à l'adresse e-mail.");
                        break;
                    case 'auth/invalid-sender':
                        alert("Expéditeur non valide.");
                        break;
                    case 'auth/too-many-requests':
                        alert("Nous avons bloqué toutes les demandes de cet appareil en raison d'une activité inhabituelle. Réessayez plus tard.");
                        break;
                    default: alert("Un erreur est survenue, veuillez réessayer un peu plus tard.");
                        break;
                }

                console.log("sendPasswordResetEmail -> errorCode", errorCode, errorMessage);
            });
    };

    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const onToggleSnackBar = () => setSnackbarVisible(!snackbarVisible);
    const onDismissSnackBar = () => setSnackbarVisible(false);

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => { isForgottenPassword ? sendPasswordResetEmail(values.email) : signIn(values) }}
            validateOnChange={false}
            validationSchema={isForgottenPassword ? sendPasswordResetEmailSchema : signInSchema}
        >
            {({ handleBlur, handleChange, handleSubmit, dirty, errors, isSubmitting, isValid, values }) => (
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <View style={styles.textInputField}>
                                <TextInput
                                    autoCapitalize={'none'}
                                    autoCompleteType={'email'}
                                    blurOnSubmit
                                    dense
                                    keyboardType={'email-address'}
                                    label="Adresse email"
                                    maxLength={64}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder={'exemple.adresse@email.com'}
                                    returnKeyType="next"
                                    spellCheck={false}
                                    textContentType={'emailAddress'}
                                    value={values.email} />
                                {errors.email && <HelperText type="error" visible={errors.email}>
                                    {errors.email}
                                </HelperText>}
                            </View>
                            {isForgottenPassword ? null : <View style={styles.textInputField}>
                                <TextInput
                                    clearButtonMode={'while-editing'}
                                    color={colors.light}
                                    dense
                                    label="Mot de passe"
                                    maxLength={16}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                    placeholder={'●●●●●●●●●●'}
                                    returnKeyType="next"
                                    right={
                                        !isVisiblePassword ?
                                            <TextInput.Icon name='eye-off-outline' onPress={() => setIsVisiblePassword(!isVisiblePassword)} /> :
                                            <TextInput.Icon name='eye-outline' onPress={() => setIsVisiblePassword(!isVisiblePassword)} />
                                    }
                                    secureTextEntry={!isVisiblePassword}
                                    spellCheck={false}
                                    value={values.password} />
                                {errors.password && <HelperText type="error" visible={errors.password}>
                                    {errors.password}
                                </HelperText>}
                            </View>}
                            <View style={styles.button}>
                                <Button
                                    color={colors.secondary}
                                    compact
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={{ elevation: 4 }}
                                >
                                    {isForgottenPassword ? "Réinitialiser le mot de passe" : "Se connecter"}
                                </Button>
                            </View>
                            <Text
                                style={styles.resetPasswordText}
                                onPress={() => setIsForgottenPassword(!isForgottenPassword)}>
                                {isForgottenPassword ? "Se connecter" : "Mot de passe oublié"}
                            </Text>
                        </View>
                        <View>
                            <Snackbar
                                duration={5000}
                                onDismiss={onDismissSnackBar}
                                visible={snackbarVisible}
                                wrapperStyle={{ backgroundColor: colors.light }}
                            >
                                {snackbarMessage}
                            </Snackbar>
                        </View>
                    </ScrollView>
                </View>
            )}
        </Formik >
    )
}

const styles = StyleSheet.create({
    button: {
        color: colors.light,
        padding: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    resetPasswordText: {
        padding: 8,
        textAlign: 'right',
    },
    textInputField: {
        padding: 8,
    },
});