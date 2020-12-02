import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../config/colors';

import * as firebase from 'firebase';

export default function SignUpScreen({ navigation }) {

    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    const signUp = (values) => {
        firebase.auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                sendEmailVerification(values);
                setTimeout(() => navigation.navigate('SignIn'), 3000);
                console.log("signUp -> Account created!")
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        alert("Il existe déjà un compte avec l'adresse e-mail donnée.");
                        break;
                    case 'auth/invalid-email':
                        alert("L'adresse e-mail n'est pas valide.");
                        break;
                    case 'auth/operation-not-allowed':
                        alert("Les comptes email / mot de passe ne sont pas activés.");
                        break;
                    case 'auth/weak-password':
                        alert("Le mot de passe n'est pas assez fort.");
                        break;
                    default: alert("Un erreur est survenue, veuillez réessayer un peu plus tard.");
                        break;
                }

                console.log("signUp -> Error", errorCode, errorMessage);
            });
    };

    const sendEmailVerification = () => {
        firebase.auth().currentUser
            .sendEmailVerification()
            .then(() => { console.log("sendEmailVerification -> Email sent!") })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                switch (errorCode) {
                    case 'auth/missing-android-pkg-name':
                        alert("Un nom de package Android doit être fourni si l'application Android doit être installée.");
                        break;
                    case 'auth/missing-continue-uri':
                        alert("Une URL de poursuite doit être fournie dans la demande.");
                        break;
                    case 'auth/missing-ios-bundle-id':
                        alert("Un ID de bundle iOS doit être fourni si un ID App Store est fourni.");
                        break;
                    case 'auth/invalid-continue-uri':
                        alert("L'URL de poursuite fournie dans la demande n'est pas valide.");
                        break;
                    case 'auth/unauthorized-continue-uri':
                        alert("L'URL de poursuite fournie dans la demande n'est pas valide.");
                        break;
                    default: alert("Le domaine de l'URL de poursuite ne figure pas sur la liste blanche. Ajoutez le domaine à la liste blanche dans la console Firebase.");
                        break;
                }

                console.log("sendEmailVerification -> Error", errorCode, errorMessage);
            });
    };

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const addActivitySchema = yup.object().shape({
        email: yup.string().email("L'email doit être valide")
            .required("Email obligatoire"),
        password: yup.string()
            .min(6, "Minimum 6 caractères")
            .max(16, "Maximum 16 caractères")
            .trim().required('Mot de passe obligatoire'),
        confirmPassword: yup.string()
            .min(1, "Minimum 1 caractère")
            .max(16, "Maximum 16 caractères")
            .oneOf([yup.ref('password'), null], 'Les mots de passe doivent être identiques !')
            .trim().required("Confirmation du mot de passe obligatoire"),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => { signUp(values) }}
            validateOnChange={false}
            validationSchema={addActivitySchema}
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
                                    // color={colors.light}
                                    dense
                                    keyboardType={'email-address'}
                                    label="Adresse email"
                                    maxLength={64}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder={'exemple.adresse@email.com'}
                                    // placeholderTextColor={colors.placeholder}
                                    returnKeyType="next"
                                    // selectionColor={colors.light}
                                    spellCheck={false}
                                    textContentType={'emailAddress'}
                                    value={values.email} />
                                {errors.email && <HelperText type="error" visible={errors.email}>
                                    {errors.email}
                                </HelperText>}
                            </View>
                            <View style={styles.textInputField}>
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
                            </View>
                            <View style={styles.textInputField}>
                                <TextInput
                                    color={colors.light}
                                    dense
                                    label="Confirmer le mot de passe"
                                    maxLength={16}
                                    onBlur={handleBlur('confirmPassword')}
                                    onChangeText={handleChange('confirmPassword')}
                                    placeholder={'●●●●●●●●●●'}
                                    returnKeyType="next"
                                    right={
                                        !isVisiblePassword ?
                                            <TextInput.Icon name='eye-off-outline' onPress={() => setIsVisibleConfirmPassword(!isVisiblePassword)} /> :
                                            <TextInput.Icon name='eye-outline' onPress={() => setIsVisibleConfirmPassword(!isVisiblePassword)} />
                                    }
                                    secureTextEntry={!isVisiblePassword}
                                    spellCheck={false}
                                    value={values.confirmPassword} />
                                {errors.confirmPassword && <HelperText type="error" visible={errors.confirmPassword}>
                                    {errors.confirmPassword}
                                </HelperText>}
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color={colors.secondary}
                                    compact
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={{ elevation: 4 }}
                                >
                                    S'inscrire
                            </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )}
        </Formik>
    )
};

const styles = StyleSheet.create({
    button: {
        color: colors.light,
        padding: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    textInputField: {
        padding: 8,
    },
});