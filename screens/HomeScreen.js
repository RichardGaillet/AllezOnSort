import React, { useEffect, useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import colors from '../config/colors'

import * as firebase from 'firebase'

export default function HomeScreen({ navigation }) {

    const [refresh, setRefresh] = useState(false)
    const user = firebase.auth().currentUser

    useEffect(() => {
        if (user != null) {
            const { createdAt, lastLoginAt, displayName, email, emailVerified, phoneNumber, photoURL } = user.toJSON()
            firebase
                .database()
                .ref("members")
                .orderByKey()
                .equalTo(user.uid)
                .once("value")
                .then(snapshot => {
                    if (snapshot.val() === null) {
                        firebase.database()
                            .ref('members/' + user.uid)
                            .set({
                                createdAt: parseInt(createdAt, 10),
                                lastLoginAt: parseInt(lastLoginAt, 10),
                                displayName: displayName,
                                email: email,
                                emailVerified: emailVerified,
                                personalInformations: {
                                    phoneNumber: phoneNumber,
                                    photoURL: photoURL
                                },
                                uid: user.uid
                            }, error => {
                                if (error) {
                                    alert(`Une erreur est survenue ! ❌\n${error}`)
                                } else {
                                    alert("Votre profil a bien été créé !\n🎉 Bienvenue ! 🎊")
                                    setRefresh(!refresh)
                                }
                            });
                    } else {
                        firebase.database()
                            .ref(`members/${user.uid}`)
                            .update({
                                emailVerified: emailVerified,
                                lastLoginAt: Date.now()
                            }, error => {
                                if (error) { alert(`Une erreur est survenue ! ❌\n${error}`) }
                            });
                    }
                })
                .catch(error =>
                    alert(`Une erreur est survenue ! ❌\n${error}`)
                )
        }
    }), [refresh]

    return (

        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.logoCatchPhrase}>
                <Image
                    accessibilityLabel={'Logo AOS'}
                    source={require('../assets/logo_aos.png')}
                />
                <Text>Allez, On Sort !</Text>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon='run-fast' //near-me sleep-off compass earth
                        mode="contained"
                        onPress={() => navigation.push('Activities')}
                        style={{ elevation: 4 }}
                    >
                        Activités
                        </Button>
                </View>
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon='account-group'
                        loading={false}
                        mode="contained"
                        onPress={() => navigation.push('Members')}
                        style={{ elevation: 4 }}
                    >
                        Membres
                    </Button>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon={
                            user != null ?
                                'account' :
                                'account-plus'
                        }
                        mode="contained"
                        onPress={
                            user != null ?
                                () => navigation.push('Profile') :
                                () => navigation.push('SignUp')}
                        style={{ elevation: 4 }}
                    >
                        {user != null ? "Profil" : "S'inscrire"}
                    </Button>
                </View>
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon={
                            user != null ?
                                'account-arrow-right' :
                                'account-arrow-left'
                        }
                        mode="contained"
                        onPress={
                            user != null ?
                                () => { firebase.auth().signOut().then(() => setRefresh(!refresh)) } :
                                () => navigation.push('SignIn')
                        }
                        style={{ elevation: 4 }}
                    >
                        {user != null ? "Se déconnecter" : "Se connecter"}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        elevation: 4,
        padding: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        padding: 8,
    },
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly',
        width: '100 %',
    },
    logoCatchPhrase: {
        alignItems: 'center',
    }
})