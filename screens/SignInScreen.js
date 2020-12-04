import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
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
                alert(errorMessage);
                console.log("signIn -> errorCode", errorCode, errorMessage);
            });
    };

    const initialValues = {
        email: '',
        password: '',
    };

    const addActivitySchema = yup.object().shape({
        email: yup.string().email("L'email doit être valide")
            .required("Email obligatoire"),
        password: yup.string()
            .min(6, "Minimum 6 caractères")
            .max(16, "Maximum 16 caractères")
            .trim().required('Mot de passe obligatoire'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => { signIn(values) }}
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
                            <View style={styles.button}>
                                <Button
                                    color={colors.secondary}
                                    compact
                                    disabled={!(isValid && dirty) || isSubmitting}
                                    mode="contained"
                                    onPress={handleSubmit}
                                    style={{ elevation: 4 }}
                                >
                                    Se connecter
                            </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
            }
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
    textInputField: {
        padding: 8,
    },
});