import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import colors from '../config/colors';

import * as firebase from 'firebase';

export default function SignUpScreen({ navigation }) {

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
                alert(errorMessage);
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
                alert(errorMessage);
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
            .required("Champ obligatoire"),
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
                                        onBlur={handleBlur('email')}
                                        onChangeText={handleChange('email')}
                                        placeholder={'exemple.adresse@email.com'}
                                        placeholderTextColor={colors.placeholder}
                                        returnKeyType="next"
                                        selectionColor={colors.light}
                                        spellCheck={false}
                                        textContentType={'emailAddress'}
                                        value={values.email} />
                                </View>
                                {errors.email && <HelperText type="error" visible={errors.email}>
                                    {errors.email}
                                </HelperText>}
                            </View>
                            <View style={styles.textInputBox}>
                                <Text>Mot de passe</Text>
                                <View style={styles.textInputField}>
                                    <TextInput
                                        clearButtonMode={'while-editing'}
                                        color={colors.light}
                                        maxLength={32}
                                        onBlur={handleBlur('password')}
                                        onChangeText={handleChange('password')}
                                        placeholder={'●●●●●●●●●●'}
                                        placeholderTextColor={colors.placeholder}
                                        returnKeyType="next"
                                        secureTextEntry
                                        spellCheck={false}
                                        value={values.password} />
                                </View>
                                {errors.password && <HelperText type="error" visible={errors.password}>
                                    {errors.password}
                                </HelperText>}
                            </View>
                            <View style={styles.textInputBox}>
                                <Text>Confirmer le mot de passe</Text>
                                <View style={styles.textInputField}>
                                    <TextInput
                                        color={colors.light}
                                        maxLength={32}
                                        onBlur={handleBlur('confirmPassword')}
                                        onChangeText={handleChange('confirmPassword')}
                                        placeholder={'●●●●●●●●●●'}
                                        placeholderTextColor={colors.placeholder}
                                        returnKeyType="next"
                                        secureTextEntry
                                        spellCheck={false}
                                        value={values.confirmPassword} />
                                </View>
                                {errors.confirmPassword && <HelperText type="error" visible={errors.confirmPassword}>
                                    {errors.confirmPassword}
                                </HelperText>}
                            </View>
                            <View style={styles.button}>
                                <Button
                                    accessibilityLabel="Bouton S'inscrire"
                                    color={colors.secondary}
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    onPress={handleSubmit}
                                    title={'S\'inscrire'}
                                />
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
});