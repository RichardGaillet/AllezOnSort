import React from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import colors from '../config/colors'

export default function HomeScreen({ navigation }) {
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
                        icon='account-arrow-right'
                        mode="contained"
                        onPress={() => navigation.push('SignIn')}
                        style={{ elevation: 4 }}
                    >
                        Se connecter
                    </Button>
                </View>
                <View style={styles.button}>
                    <Button
                        color={colors.secondary}
                        compact
                        disabled={false}
                        icon='account-plus'
                        mode="contained"
                        onPress={() => navigation.push('SignUp')}
                        style={{ elevation: 4 }}
                    >
                        S'inscrire
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